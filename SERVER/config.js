import dotenv from 'dotenv';

dotenv.config();

const config = {
  PGUSER: process.env.PGUSER,
  PGPORT: process.env.PGPORT,
  PGDATABASE: process.env.PGDATABASE,
  PGHOST: process.env.PGHOST,
  PGPASSWORD: process.env.PGPASSWORD,
};

export default config;