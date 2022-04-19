const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  addToCart,
  getCartItems,
  removeCartItems,
  checkAvailbility
} = require("../controller/CartController");

router.post(
  "/addtocart",
  addItemToCart
);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.post("/getCartItems",getCartItems);
//new update
router.post(
  "/removeItem",
  removeCartItems
);

router.post("/checkAvailbility",checkAvailbility);

module.exports = router;