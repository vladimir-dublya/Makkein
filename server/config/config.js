import mysql from "mysql2";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'makein_library',
    port: 3306
});
console.log('DB connect')

export default db;
