const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express()
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const body_parser = require('body-parser')
const user_api = require("./routes/user")
const product_api = require('./routes/products')
const cart_api = require('./routes/cart')

app.use(cors())
app.use(body_parser.urlencoded())
app.use(body_parser.json())

app.get('/image/:name', async (req , res) => {
     const img_path = path.resolve(`./public/${req.params.name}`)
     res.sendFile(img_path)  
})

app.use('/user',user_api)
app.use('/product',product_api)
app.use("/cart", cart_api)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(() => {
    res.json(404)
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Swagger on http://localhost:3000/api-docs");
});
