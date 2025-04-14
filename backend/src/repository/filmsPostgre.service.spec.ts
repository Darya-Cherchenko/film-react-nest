import { Test, TestingModule } from '@nestjs/testing';
import { FilmsPostgreService } from './filmsPostgre.service';

describe('FilmsPostgreService', () => {
  let service: FilmsPostgreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsPostgreService],
    }).compile();

    service = module.get<FilmsPostgreService>(FilmsPostgreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
