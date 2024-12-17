const express = require("express");
const router = express.Router();
router.use(express.json());

// 주문 하기
router.post('/orders', (req, res) => {
    
})
// 주문 목록 조회
router.get('/orders', (req, res) => {

})
// 주무나 상세 상품 조회
router.get('/orders/:id', (req, res) => {

})

module.exports = router