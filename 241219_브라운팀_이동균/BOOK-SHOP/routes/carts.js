const express = require("express");
const { addToCart, removeCartItem, getCartItems } = require("../controller/CartController");
const router = express.Router();
router.use(express.json());

// 장바구니 조회
router.get('/', addToCart)
// 장바구니 도서 삭제
router.delete('/:id', removeCartItem)
// 장바구니에서 선택한 주문 예상 상품 목록 조회
router.get('/', getCartItems)

module.exports = router