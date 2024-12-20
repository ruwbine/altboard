import {
  Repository,
  EntityTarget,
  ObjectLiteral,
  FindOptionsWhere,
  FindOneOptions,
  FindOptionsWhereProperty,
  DeepPartial,
} from 'typeorm';
import { dataSource } from '../../ormconfig';
import { IRepository } from './repository.interface';
import { NotFoundException } from '@nestjs/common';

type findOptions<T> =
  | FindOptionsWhere<T>
  | FindOneOptions<T>
  | FindOptionsWhereProperty<NonNullable<T[keyof T]>, NonNullable<T[keyof T]>>;

export class TypeormRepository<T extends ObjectLiteral> implements IRepository<T>{
  private ormRepository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.ormRepository = dataSource.getRepository(entity);
  }

  async findOne(id: string): Promise<T | null> {
    const entity = await this.ormRepository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
    return entity || null;
  }

  async findAll(): Promise<T[]> {
    return this.ormRepository.find();
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.ormRepository.create(entity);
    return this.ormRepository.save(newEntity);
  }

  async update(id: string, entity: Partial<T>): Promise<void> {
    await this.ormRepository.update(id, entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    if (!entity) {
      throw new NotFoundException(
        `Cannot find entity with id: ${id}. User not found`,
      );
    }
    await this.ormRepository.remove(entity);
  }

  async findOneByParams(params: Partial<T>): Promise<T | null> {
    console.log(params);
    return this.ormRepository.findOne({where: params});
  }
  async findByParams(params: Partial<T>): Promise<T[] | null> {
    return this.ormRepository.find({where: params});
  }
}
