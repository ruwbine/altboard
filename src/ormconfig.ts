import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
  logging: true,
};

export const dataSource = new DataSource(databaseConfig);
