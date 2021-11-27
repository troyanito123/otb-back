import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Like, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { FindAllCertificationDto } from './dto/find-all-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { Certification } from './entities/certification.entity';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
  ) {}

  async create(createCertificationDto: CreateCertificationDto) {
    const user = await this.userRepository.findOne(
      createCertificationDto.userId,
      { select: ['id', 'name', 'email'] },
    );

    const certification = this.certificationRepository.create(
      createCertificationDto,
    );
    certification.user = user;
    return this.certificationRepository.save(certification);
  }

  async findAll(query: FindAllCertificationDto) {
    const page = query.page || 0;
    const keyword = query.keyword || '';
    const take = query.take || 10;
    const skip = page * take;
    const sort = query.sort || 'DESC';
    const column = query.column || 'date';
    let columnOrder = 'certification.date';
    if (column == 'name') {
      columnOrder = 'user.name';
    }
    const [certifications, count] = await getConnection()
      .createQueryBuilder(Certification, 'certification')
      .leftJoin('certification.user', 'user')
      .where('user.name ILIKE :name', { name: `%${keyword.toUpperCase()}%` })
      .addSelect('user.id')
      .addSelect('user.name')
      .addSelect('user.email')
      .limit(take)
      .offset(skip)
      .orderBy(columnOrder, sort)
      .getManyAndCount();
    return { certifications, count };
  }

  async findOne(id: number) {
    const certification = await this.certificationRepository.findOne(id, {
      relations: ['user'],
    });
    return {
      ...certification,
      user: {
        id: certification.user.id,
        name: certification.user.name,
        email: certification.user.email,
      },
    };
  }

  async findByUser(id: number) {
    const user = await this.userRepository.findOne(id);
    const certifications = await this.certificationRepository.find({
      where: { user },
      relations: ['user'],
    });
    return certifications.map((c) => ({
      ...c,
      user: { id: c.user.id, name: c.user.name, email: c.user.email },
    }));
  }

  async update(id: number, updateCertificationDto: UpdateCertificationDto) {
    const certification = await this.certificationRepository.findOne(id, {
      relations: ['user'],
    });
    this.certificationRepository.merge(certification, updateCertificationDto);
    const newCertification = await this.certificationRepository.save(
      certification,
    );
    return {
      ...newCertification,
      user: {
        id: newCertification.user.id,
        name: newCertification.user.name,
        email: newCertification.user.email,
      },
    };
  }

  async remove(id: number) {
    const certification = await this.certificationRepository.findOne(id, {
      relations: ['user'],
    });
    await this.certificationRepository.remove(certification);
    return {
      ...certification,
      user: {
        id: certification.user.id,
        name: certification.user.name,
        email: certification.user.email,
      },
    };
  }

  async getSumAmount() {
    return getManager()
      .createQueryBuilder(Certification, 'certification')
      .select('SUM(certification.amount)', 'total')
      .getRawOne();
  }
}
