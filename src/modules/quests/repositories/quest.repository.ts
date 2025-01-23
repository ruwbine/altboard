import { TypeormRepository } from 'src/common/interfaces/typeorm-repository.interface';

import { QuestEntity } from '../entities/quest.entity';

export class QuestRepository extends TypeormRepository<QuestEntity> {
  constructor() {
    super(QuestEntity);
  }
}
