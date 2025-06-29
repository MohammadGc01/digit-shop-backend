const { add_cart, update_quantity, delete_item } = require('../controller/cart_controller')
const { authentication } = require('../middleware/auth')

const router = require('express').Router()

// router.post("/add", authentication, add_cart)

router.post("/add", authentication, (req , res) => {
    add_cart(req , res)
})

router.post('/update/quantity/:cart_item_id', authentication , (req , res) => {
     update_quantity(req , res)
})

router.delete('/delete/item/:cart_item_id', authentication , (req , res) => {
      delete_item(req , res)
})



module.exports = router