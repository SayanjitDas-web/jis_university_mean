require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const connectDB = require("./config/db")
const cookieParser = require("cookie-parser")

const userRouter = require("./routes/user.route")

const port = process.env.PORT || 3000

connectDB()

app.use(cookieParser())
app.use(cors({
    origin:"*",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/auth", userRouter)

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})