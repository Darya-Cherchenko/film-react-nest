import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmsEntity } from '../films/entities/films.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsPostgreService {
  constructor(
    @InjectRepository(FilmsEntity)
    private filmRepository: Repository<FilmsEntity>,
  ) {}

  async findAllFilms(): Promise<{ total: number; items: FilmsEntity[] }> {
    const [total, items] = await Promise.all([
      this.filmRepository.count(),
      this.filmRepository.find({ relations: { schedule: true } }),
    ]);
    return { total, items };
  }

  async findFilmById(id: string): Promise<FilmsEntity> {
    try {
      return this.filmRepository.findOne({
        where: { id },
        relations: { schedule: true },
      });
    } catch {
      throw new NotFoundException(`Фильм не найден`);
    }
  }

  async findFilmSchedule(filmId: string, session: string) {
    const film = await this.findFilmById(filmId);
    const scheduleIndex = film.schedule.findIndex((s) => s.id === session);
    return scheduleIndex;
  }

  async updateFilm(film: FilmsEntity): Promise<void> {
    try {
      await this.filmRepository.save(film);
    } catch {
      new BadRequestException(`Не удалось обновить фильм`);
    }
  }
}
