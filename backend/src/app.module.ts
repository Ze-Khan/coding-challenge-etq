import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [dbConfig] }),
    TypeOrmModule.forRoot(dbConfig()),
    UserModule,
  ],
})
export class AppModule {}
