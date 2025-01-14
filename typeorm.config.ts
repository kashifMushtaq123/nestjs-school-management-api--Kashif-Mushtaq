import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'use_your',
  password: 'use_your',
  database: 'use_your',
  synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}']
};