import mysql from "mysql2/promise.js"
import fs from "fs"
import { fileURLToPath } from "url";
import path from "path"
// Creating mysql connection


export default async function db_connection() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const certification = path.join(__dirname, "./cer.pem");
    try {
        const certification_file = await fs.promises.readFile(certification, "utf-8");
        const connection = await mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            ssl: {
                ca: certification_file,
                rejectUnauthorized: false
            },
            waitForConnections: true,
        })
        return connection;
    }
    catch (error) {
        console.log(error)
    }
}