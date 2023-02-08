import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { addAbortSignal } from 'stream';
import { DataSource, Entity, EntityNotFoundError } from 'typeorm';
import Alkalmazott from './alkalmazott.entity';
import { AppService } from './app.service';
import NewAlkalmazottDto from './NewAlklalmazott.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Post('alkalmazott')
  async newAlkalmazott(@Body() alkalmazott: NewAlkalmazottDto) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    if (!alkalmazott.kezdoDatum) {
      alkalmazott.kezdoDatum = new Date().toISOString();
    }
    alkalmazottRepo.save(alkalmazott);
    return alkalmazott;
  }

  @Get('alkalmazott/search')
  async searchAlkalmazott(@Query('email') email: string) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    alkalmazottRepo;
    const [adat, darab] = await alkalmazottRepo
      .createQueryBuilder()
      .where('hivatalosEmail LIKE : email', { email: '%' + email + '%' })
      .getManyAndCount();
    return {
      alkalmazottak: adat,
      count: darab,
    };

    return await alkalmazottRepo.findOneByOrFail({ hivatalosEmail: email });
  }

  @Get('/alkalmazott/:id')
  async getAlkalmazott(@Param('id') id: number) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    return await alkalmazottRepo.findOneByOrFail({ id: id });
  }
  catch(e) {
    if (e instanceof EntityNotFoundError) {
      throw new NotFoundException('Az alkalmazott nem létezik');
    } else {
      throw e;
    }
  }
}
