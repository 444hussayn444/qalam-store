import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { s_router } from "./routes/store_routes.js"
import { a_router } from "./routes/auth_routes.js"
dotenv.config({
    path: "./.env"
})

// to create the __dirname property .***.***.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// starting and initialising the server .***.***.
const app = express()
const port = 5000


app.use(cors({
    origin: "*" // accept all for now .***.***.
}))

app.use(express.json()) // for sending json and receiving .***.***.
app.use("/assets", express.static(path.join(__dirname, "assets"))) // to accept all folders and have access form assets .***.***.


// .***.***. APIS_MANAGER .***.***. //
app.use("/api/v1", s_router); // for the store .***.***.
app.use("/api/v1/", a_router); // for authantication .***.***.




app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`); 
})