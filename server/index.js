const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connection } = require("./db");
const userRouter = require("./routes/UserRoutes");
const postRouter = require("./routes/postRoutes");

require("dotenv").config();

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.get("/", (req, res) => {
    res.send("this is a home page")
})



app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log(`server is running on this port=> ${process.env.PORT} and db is also connected`)
    } catch (error) {
        console.log(error)
    }
})