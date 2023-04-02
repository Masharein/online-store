const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const checkAuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/', basketController.create);
router.post('/add', basketController.addToBasket);
router.delete('/remove', basketController.removeFromBasket);
router.get('/:userId', checkAuthMiddleware, basketController.getBasket);

module.exports = router;
