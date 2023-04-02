const { Basket, BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async create(req, res, next) {
    try {
      const { userId } = req.body;
      const basket = await Basket.create({ userId });
      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async addToBasket(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;
      const basketDevice = await BasketDevice.create({ basketId, deviceId });
      return res.json(basketDevice);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeFromBasket(req, res, next) {
    try {
      const { basketDeviceId } = req.body;
      await BasketDevice.destroy({ where: { id: basketDeviceId } });
      return res.json({ message: 'Device has been removed from the basket' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getBasket(req, res, next) {
    try {
      const { userId } = req.params;
      const basket = await Basket.findOne({ where: { userId }, include: [Device] });
      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
