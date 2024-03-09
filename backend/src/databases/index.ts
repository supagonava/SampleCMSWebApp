import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export const dbConnection: DataSourceOptions = {
  type: 'postgres',
  host: process.env?.DB_HOST || "localhost",
  port: Number(process.env?.DB_PORT || "5432"),
  username: process.env?.DB_USER || "postgres",
  password: process.env?.DB_PASSWORD || "",
  database: process.env?.DB_DATABASE || "skinx",
  synchronize: true,
  logging: false,
  ssl: false,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
  subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
};
