require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const connectDB = require("./config/db")
const cookieParser = require("cookie-parser")

const userRouter = require("./routes/user.route")
const aiRouter = require("./routes/ai.route")

const port = process.env.PORT || 3000

connectDB()

app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:4200",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/auth", userRouter)
app.use("/api/ai", aiRouter)

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})