import { Controller, Delete, Get, Post } from '@nestjs/common';
import { PhrasesService } from '../services/phrases.service';

@Controller('phrases')
export class PhrasesController {
  constructor(private phrasesService: PhrasesService) {}

  @Get('/random')
  getRandomPhrase() {}

  @Get()
  getAll() {}

  @Post()
  createPhrase() {}

  @Delete(':id')
  deletePhrase() {}
}
