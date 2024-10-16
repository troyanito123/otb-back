import { join } from 'path';

export enum ConfigOptions {
  port = 'port',
  jwtSecret = 'jwtSecret',
  jwtExp = 'jwtExp',
  database = 'database',
  defaultUserName = 'defaultUserName',
  defaultUserEmail = 'defaultUserEmail',
  defaultUserPassword = 'defaultUserPassword',
}

export const config = () => ({
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXP,
  defaultUserName: process.env.DEFAULT_USER_NAME,
  defaultUserEmail: process.env.DEFAULT_USER_EMAIL,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
  database: {
    type: 'postgres',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : true,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [join(__dirname, '../**/**/*.entity{.ts,.js}')],
    autoLoadEntities: true,

    migrationsRun: process.env.NODE_ENV === 'production',
    migrations: [join(__dirname, '../database/migrations/**/*{.ts,.js}')],
    migrationsTableName: 'custom_migration_table',
    cli: {
      // migrationsDir: 'src/database/migrations',
      migrationsDir: [join(__dirname, '../database/migrations')],
    },

    // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
    synchronize: false,
  },
});
