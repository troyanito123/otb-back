import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordEncrypter } from 'src/utils/password-encrypter';
import { Like, Not, Repository } from 'typeorm';
import { RoleCode, RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatus } from './entities/user.entity';
import { AttendencesService } from '../attendences/attendences.service';
import { FinesService } from '../fines/fines.service';
import { MonthlyPaymentsMadeService } from '../monthly-payment-mades/monthly-payments-made.service';
import { ExtraContributionsService } from '../extra-contributions/extra-contributions.service';
import { ContributionsPaidService } from '../contributions-paid/contributions-paid.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RoleService,
    private attendenceService: AttendencesService,
    private fineService: FinesService,
    private monthlyPaymentsMadeService: MonthlyPaymentsMadeService,
    private extraContributionService: ExtraContributionsService,
    private contributionPaidService: ContributionsPaidService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    if (createUserDto.roleId) {
      newUser.role = await this.roleService.findOne(createUserDto.roleId);
    }
    newUser.role = await this.roleService.findByCode(RoleCode.USER);
    if (createUserDto.password) {
      newUser.password = PasswordEncrypter.encrypt(createUserDto.password);
    }

    const { password, ...data } = await this.userRepository.save(newUser);
    return { ...data, role: data.role.code };
  }

  async findAll(query: FindAllUsersDto) {
    const page = query.page || 0;
    const keyword = query.keyword || '';
    const take = query.take || 10;
    const skip = page * take;
    const sort = query.sort || 'ASC';

    const [users, count] = await this.userRepository.findAndCount({
      select: [
        'id',
        'name',
        'identification_number',
        'email',
        'status',
        'address_number',
        'block_number',
        'subscription_at',
      ],
      where: { name: Like('%' + keyword.toUpperCase() + '%'), status: Not(UserStatus.DELETE) },
      relations: ['role'],
      order: { name: sort },
      take,
      skip,
    });

    return { users: users.map((u) => ({ ...u, role: u.role.code })), count };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, status: Not(UserStatus.DELETE) },
      select: [
        'id',
        'name',
        'identification_number',
        'email',
        'status',
        'address_number',
        'block_number',
        'subscription_at',
      ],
      relations: ['role'],
    });

    const { role, ...rest } = user;

    const obj = rest as any;
    obj.role = user.role.code;
    return obj;
  }

  async findByBlock(block: string) {
    const users = await this.userRepository.find({
      where: { block_number: block.toUpperCase(), status: Not(UserStatus.DELETE) },
      select: [
        'id',
        'name',
        'identification_number',
        'email',
        'status',
        'address_number',
        'block_number',
        'subscription_at',
      ],
      relations: ['role'],
      order: { address_number: 'ASC' },
    });

    return users.map((u) => ({ ...u, role: u.role.code }));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail(id);
    this.userRepository.merge(user, updateUserDto);
    if (updateUserDto.password) {
      user.password = PasswordEncrypter.encrypt(updateUserDto.password);
    }
    user.role = await this.roleService.findOne(updateUserDto.roleId);
    try {
      const newUser = await this.userRepository.save(user);
      return { ...newUser, role: newUser.role.code, password: undefined };
    } catch (error) {
      return null;
    }
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id, { relations: ['role'] });
    user.status = UserStatus.DELETE;
    const { password, ...rest } = await this.userRepository.save(user);
    return { ...rest, role: user.role.code };
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email, status: UserStatus.ACTIVE },
      relations: ['role'],
    });
  }

  findUserById(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  async getUserWithDetail(id: number) {
    const data = await this.userRepository.findOne(id, {
      relations: ['certifications', 'incomes'],
    });
    const certifications = data.certifications.map((d) => ({
      id: d.id,
      amount: d.amount,
      date: d.date,
      description: d.description,
      type: d.type,
    }));
    const incomes = data.incomes.map((d) => ({
      id: d.id,
      amount: d.amount,
      date: d.date,
      description: d.description,
    }));

    const attendences = await this.attendenceService.findAllMeetingsByUser(id);
    const finnes = await this.fineService.getCompleteFinesByUser(id);
    const monthlyPayments = await this.monthlyPaymentsMadeService.reportByUser(id);
    const extraContributions = await this.extraContributionService.findByUser(id);
    const contributions = await this.contributionPaidService.getAllForUser(id);

    return {
      id: data.id,
      name: data.name,
      blockNumber: data.block_number,
      addressNumber: data.address_number,
      subscriptionAt: data.subscription_at,
      incomes,
      contributions,
      extraContributions,
      certifications,
      attendences,
      finnes,
      monthlyPayments,
    };
  }
}
