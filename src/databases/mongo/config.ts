import 'dotenv/config';

import { green } from 'colorette';
import { mongoMigrateCli } from 'mongo-migrate-ts';
import * as path from 'path';

// eslint-disable-next-line no-console
console.log(
  green(`ENV: ${process.env['NODE_ENV']} mongo migration running.\n`),
);

mongoMigrateCli({
  uri: process.env['MONGO_URL'],
  database: process.env['MONGO_DATABASE'],
  migrationsDir: path.join(__dirname, 'databases/mongo/migrations'),
  migrationsCollection: 'migrations',
});
