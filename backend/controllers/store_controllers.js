import db_connection from "../db/db.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { otp_sender, random_num } from "./utils/funcs.js";
import validator from "validator";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { create_jwt } from "./utils/jwt_handler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get request to preview the all products .***.***.
export async function get_products(req, res) {
    const pool = await db_connection();
    const connection = await pool.getConnection();

    const __jsonpath = path.join(__dirname, "./data.json");

    if (!connection) {
        console.log("Error No connection, or occur an issue to connection");
    }
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS products (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255),
                image TEXT ,
                category TEXT,
                price INT,
                created_at DATETIME
            )
        `);
        const data = await fs.promises.readFile(__jsonpath, "utf-8");
        const products = JSON.parse(data);
        for (const product of products) {
            await connection.query(
                `INSERT IGNORE INTO products (id, title, image, category, price, created_at)
                  VALUES (?, ?, ?, ?, ?, NOW())`,
                [
                    product.id,
                    product.title,
                    product.image,
                    product.category,
                    product.price,
                ]
            );
        }
        const [rows] = await connection.query("SELECT * FROM products");
        await connection.release();
        return res.status(200).json({
            success: true,
            data: rows,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "SERVER_ERROR" });
    }
}

// Get the otp from user and validate it .***.***.
export async function get_otp(req, res) {
    console.log("get_otp called");
    try {
        const { email } = req.body;
        const pool = await db_connection();
        const connection = await pool.getConnection();

        let numbers = await random_num(6, 1, 9);
        const info = await otp_sender(email, numbers);
        await connection.query("INSERT INTO OTP(id , otp ) VALUES(?,?)", [
            randomUUID(),
            numbers,
        ]);
        connection.release();
        return res.status(200).json({ message: "OTP sent!", numbers, info });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "SERVER_ERROR" });
    }
}

// Making register funcitnonality .***.***.
export async function register_controller(req, res) {
    const pool = await db_connection();
    const connection = await pool.getConnection();

    const { username, email, password, otp, id: userid } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            error: "Please Fill All the fields",
        });
    }
    try {
        ا
        const [isEmailExist] = await connection.query(
            "SELECT email FROM users WHERE email = ?",
            [email]
        );
        console.log(isEmailExist)

        if (username.length < 5) {
            return res.status(400).json({ message: "Please Enter a valid username" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please Enter a valid email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res
                .status(400)
                .json({ message: "Please Enter a valid credinitails" });
        }

        if (isEmailExist.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const [otp_q] = await connection.query(
            "SELECT otp FROM OTP WHERE id = ?",
            [userid]
        );
        console.log(otp_q, "Q")
        if (otp_q[0].otp.toString() !== otp.toString()) {
            return res.status(400).json({ message: "verfication faild" });
        }
        const token = await create_jwt(userid);
        const hashed_password = await bcrypt.hash(password, 10);
        const [new_user] = await connection.query(
            `
         INSERT IGNORE INTO users(id, username, email, password,created_at) VALUES(?,?,?,?,NOW())
                `,
            [userid, username, email, hashed_password]
        );


        await connection.release();

        return res.status(200).json({
            success: true,
            message: "Registered Success",
            new_user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "SERVER_ERROR" });
    }
}

// Login funcitonality .***.***.
export async function login_controller(req, res) {
    const pool = await db_connection();
    const connection = await pool.getConnection();
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please Fill All the fields",
            });
        }
        const [pass] = await connection.query(
            "SELECT password FROM users WHERE email = ?",
            [email]
        );
        if (!pass[0].password) {
            return res.status(404).json({ message: "NOT_FOUND" });
        }
        const compare_password = await bcrypt.compare(password, pass);
        if (!compare_password) {
            return res.status(404).json({ message: "Wrong Cridinitails" });
        }
        const token = await create_jwt(userid);
        await connection.release();
        return res.status(200).json({ success: true, message: "logged in", email, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "SERVER_ERROR" });
    }
}
