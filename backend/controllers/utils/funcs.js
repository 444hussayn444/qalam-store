import nodemailer from "nodemailer"


// Generate random number for otp .***.***.
export async function random_num(count, min, max) {
    let numbers = "";
    for (let i = 0; i < count; i++) {
        numbers += Math.floor(Math.random() * (max - min + 1) + min) // Return a single one digit .***.***.
    }
    return numbers // return the full digits OTP .***.***.
}
// Send otp code to the user with email .***.***.
export async function otp_sender(email, otp) {
    console.log(otp) // Checking the otp on the system .***.***.
    const transporter = await nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
            user: "hussayn369@gmail.com",
            pass: process.env.APPASS,
        }
    })
    const info = await transporter.sendMail({
        from: 'FUCKER',
        to: email,
        subject: "Hello",
        text: "Hello Friend", // plain‑text body .***.***.
        html: `<h1>Hello Frined The OTP is <p>${otp}</p></h1>`, // HTML body .***.***.
    })

    return info
}