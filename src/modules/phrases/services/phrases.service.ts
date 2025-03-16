import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhrasesService {
  constructor() // @InjectRepository(PhrasesEntity)
  // private readonly repo: Repository<PhrasesEntity>,
  {}

  addPhrase(text: string) {}

  getRandomPhrases() {}

  updatePhrase(id: string, text: string) {}

  removePhrase(id: string) {}
}
