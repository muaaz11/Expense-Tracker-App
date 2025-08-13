import { Pool } from 'pg'

const pool = new Pool({
    user: "postgres",
    password: "asd@123",
    host: "localhost",
    port: "5432",
    database: "expense-tracker"
});

export default pool;

