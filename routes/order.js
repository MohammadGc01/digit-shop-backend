const { create_order } = require("../controller/order_contoller");
const { authentication } = require("../middleware/auth");
const router = require("express").Router();


router.post('/create', authentication, (req , res) => {
    create_order(req, res)
})


module.exports = router