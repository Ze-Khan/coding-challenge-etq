import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';

export const dbConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, '/../**/*.entity.{ts,js}')],
    synchronize: true, // process.env.DB_SYNC ? true : false,
  };
};
