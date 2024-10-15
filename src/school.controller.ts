import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { SchoolService } from './school.service';
import { School } from './entities/school.entity';

@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  async createSchool(@Body() school: Partial<School>): Promise<School> {
    return this.schoolService.createSchool(school);
  }

  @Put(':id')
  async updateSchool(@Param('id') id: number, @Body() school: Partial<School>): Promise<School> {
    return this.schoolService.updateSchool(id, school);
  }

  @Get(':id')
  async getSchoolById(@Param('id') id: number): Promise<School> {
    return this.schoolService.getSchoolById(id);
  }

  @Get()
  async getAllSchools(): Promise<School[]> {
    return this.schoolService.getAllSchools();
  }

  @Delete(':id')
  async deleteSchool(@Param('id') id: number): Promise<void> {
    return this.schoolService.deleteSchool(id);
  }
}
