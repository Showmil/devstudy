const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);

const bookRouter = require('./routes/books');
const cartRouter = require('./routes/carts');
const likeRouter = require('./routes/likes');
const orderRouter = require('./routes/orders');
const userRouter = require('./routes/users');

app.use("/", cartRouter);
app.use("/", bookRouter);
app.use("/", likeRouter);
app.use("/", orderRouter);
app.use("/", userRouter);