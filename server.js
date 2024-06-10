require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const errorMiddleware = require("./middleware/errorMiddleware")

const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT
const FRONT_END = process.env.FRONT_END

var corsOptions = {
    origin: FRONT_END,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
app.use(express.json());
app.use(cors())

app.set('view engine', 'ejs');



const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const productRouter = require('./routes/product')

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/products", productRouter)
app.use(errorMiddleware)


mongoose.
connect(MONGO_URL)
.then(() => {
    app.listen(PORT, ()=> {
    console.log(`Node.js running on port ${PORT}`);
})

    console.log("connected to MongoDB");
}).catch(() => {
    console.error("Error message:", error);
})