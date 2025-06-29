const Permissions = require('../constants/Permissions')
const { add_product, add_variant } = require('../controller/products_controller')
const { authorization, authentication } = require('../middleware/auth')
const { checkPermission } = require('../middleware/checkPermission')

const router = require('express').Router()

router.post('/add', authentication, async (req , res) => {
    const user = await authorization(req)
    const canAccess  = await checkPermission(user.role , Permissions.CREATE_PRODUCTS)
    if(!canAccess) return res.status(403).json({ message: 'You do not have permission to perform this action' })
        add_product(req ,res)
    })


    router.post('/variant/add', authentication, async (req , res) => {
        const user = await authorization(req)
        const canAccess  = await checkPermission(user.role , Permissions.CREATE_VARIANT)
        if(!canAccess) return res.status(403).json({ message: 'You do not have permission to perform this action' })
        add_variant(req ,res)
    })



    module.exports = router