const express = require("express");
const router = express.Router();
const {addLike, removeLike} = require('../controller/LikeController')

// 좋아요 추가
router.post('/likes/:id', addLike)
// 좋아요 삭제
router.post('/books/:id', removeLike)

module.exports = router