const express = require("express");
const router = express.Router();

// 전체 도서 조회
router.get('/', (req, res) => {
    
})
// 개별 도서 조회
router.get('/books/:id', (req, res) => {

})
// 카테고리별 도서 목록 조회
router.get('/books', (req, res) => {

})

module.exports = router