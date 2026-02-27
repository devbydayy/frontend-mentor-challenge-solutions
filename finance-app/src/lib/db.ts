import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import Database from 'better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: 'file:./prisma/dev.db',
});

export const db = new PrismaClient({
  adapter,
});
