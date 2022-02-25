const express = require("express");
const verifyToken = require("../middleware/authJwt");
const User = require("../models/user");
const getProduct = require("../middleware/finder");
const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  return res.send(req.user.cart);
});

router.put("/:id", [verifyToken, getProduct], async (req, res) => {
  const user = await User.findById(req.user._id);
  const inCart = user.cart.some((prod) => prod._id == req.params._id);

  let updatedUser;
  if (inCart) {
    const product = user.cart.find((prod) => prod._id == req.params._id);
    product.qty += req.body.qty;
    updatedUser = await user.save();
  } else {
    user.cart.push({ ...res.product, qty: req.body.qty });
    updatedUser = await user.save;
  }
  try {
    const acces_token = jwt.sign(
      JSON.stringify(updatedUser),
      process.env.ACCESSTOKEN
    );
    res.status(201).json({ jwt: acces_token, cart: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
