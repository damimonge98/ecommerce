const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoriesRouter = require('./routesAddCategories');


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/categories', categoriesRouter);

module.exports = router;
