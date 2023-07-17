import { Pool } from 'pg';

const database = new Pool({
  user: 'vadim',
  password: 'vadim',
  host: 'localhost',
  port: 5432,
  database: 'trello_clone',
});

export default database;
