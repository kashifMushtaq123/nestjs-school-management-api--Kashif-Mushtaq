import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { School } from './entities/school.entity';
import { Address } from './entities/address.entity';
import { Organization } from './entities/organization.entity';
import { typeOrmConfig } from '../typeorm.config';
import { SchoolRepository } from './repositories/school.repository';
import { AddressRepository } from './repositories/address.repository';
import { OrganizationRepository } from './repositories/organization.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([School, Address, Organization]), 
  ],
  controllers: [AppController, SchoolController],
  providers: [
    AppService,
    SchoolService,
    SchoolRepository, 
    AddressRepository, 
    OrganizationRepository, 
  ],
})
export class AppModule {}