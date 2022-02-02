const Shop = require('../../models/Shop');

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findById(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    return res.json(shops);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.shopCreate = async (req, res) => {
  try {
    // if (req.file) {
    //   req.body.image = `/${req.file.path}`;
    //   req.body.image = req.body.image.replace('\\', '/');
    // }
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.shopDelete = async (req, res, next) => {
  try {
    await req.shop.remove();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.shopUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace('\\', '/');
    }
    const shop = await Shop.findByIdAndUpdate(
      { _id: req.shop.id },
      req.body,
      { new: true, runValidators: true } // returns the updated shop
    );
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
