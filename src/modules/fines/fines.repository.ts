import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Fine } from './entities/fine.entity';

@EntityRepository(Fine)
export class FinesRepository extends Repository<Fine> {
  async findByUser(user: User) {
    const fines = await this.find({
      where: { user },
      relations: ['user', 'meeting'],
    });
    return fines.map((f) => ({
      ...f,
      user: { id: f.user.id, name: f.user.name, email: f.user.email },
      meeting: {
        id: f.meeting.id,
        name: f.meeting.name,
        fine_amount: f.meeting.fine_amount,
        date: f.meeting.date,
      },
    }));
  }
}
