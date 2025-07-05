const { create_order , get_orders} = require("../controller/order_contoller");
const { authentication } = require("../middleware/auth");
const router = require("express").Router();


router.post('/create', authentication, (req , res) => {
    create_order(req, res)
})

router.get('/get', authentication, (req , res)=>{
    get_orders(req , res)
})
module.exports = router