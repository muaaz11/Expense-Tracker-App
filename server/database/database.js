import { Pool } from 'pg'

const pool = new Pool({
    user: "postgres",
    password: "asd123",
    host: "localhost",
    port: "5432",
    database: "expense_tracker"
});

export default pool;

