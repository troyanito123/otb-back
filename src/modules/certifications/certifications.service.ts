import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateCertificationDto } from './dto/create-certification.dto';
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

  async findAll() {
    const certifications = await this.certificationRepository.find({
      relations: ['user'],
    });

    return certifications.map((c) => ({
      ...c,
      user: { id: c.user.id, name: c.user.name, email: c.user.email },
    }));
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
}
