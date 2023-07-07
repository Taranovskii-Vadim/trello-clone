import { Pool } from 'pg';

export const database = new Pool({
  user: 'vadim',
  password: 'vadim',
  host: 'localhost',
  port: 5432,
  database: 'trello_clone',
});
