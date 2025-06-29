const express = require('express')
const app = express()
const cors = require('cors')
const body_parser = require('body-parser')
const user_api = require("./routes/user")
const product_api = require('./routes/products')
const cart_api = require('./routes/cart')
const Permissions = require('./constants/Permissions')

app.use(cors())
app.use(body_parser.urlencoded())
app.use(body_parser.json())

app.use('/user',user_api)
app.use('/product',product_api)
app.use("/cart", cart_api)

app.use(() => {
    res.json(404)
})


app.listen("3000", () => {
    console.log("app start on port 3000");
})


