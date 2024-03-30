import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.PG_CONNECTION_STRING);
const db = drizzle(sql);

export default db;
