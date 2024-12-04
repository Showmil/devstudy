const express = require('express')
const router = express.Router()
const conn = require('../mariadb')
const { body, param, validationResult } = require('express-validator')
router.use(express.json())

const validate = (req, res, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json(err.array())
    } else {
        return next()
    }
}

router
    .route('/')
    .post(
        [body('userId').notEmpty().isInt().withMessage("숫자 입력 필요"),
        body('name').notEmpty().isString().withMessage('문자 입력 필요'), validate]
        , (req, res) => {
            const {name, userId} = req.body
            
            let sql = `INSERT INTO channels (name, user_id) VALUES ?, ?`
            let values = [name, userId]
            conn.query(sql, values, function (err, results) {
                if (err) {
                    console.log(err)
                    return res.status(400).end()
                }
                res.status(200).json(results)
            })
    }) // 채널 개별 생성
    .get([body('userId').notEmpty().isInt().withMessage("숫자 입력 필요"), validate], (req, res) => {
        var { userId } = req.body
        let sql = `SELECT * FROM channels user_id = ?`
        conn.query(sql, userId, function (err, results) {
            if (err) {
                console.log(err)
                return res.status(400).end()
            }

            if (results.length) {
                res.status(200).json(results)
            } else {
                notFoundChannel(res)
            }
        })
        res.status(400).end()
    }) // 채널 전체 조회

router
    .route('/:id')
    .put([param('id').notEmpty().withMessage('채널 아이디 필요'), validate], (req, res) => {
        let { id } = req.params
        id = parseInt(id)
        let { name } = req.body

        let sql = `UPDATE channels SET name = ? WHERE id = ?`
        let values = [name, id]
        conn.query(sql, values, function (err, results) {
            if (err) {
                console.log(err)
                return res.status(400).end()
            }
            res.status(200).json(results)
        })
    }) // 채널 개별 수정
    .delete([param('id').notEmpty().withMessage('채널 아이디 필요'), validate], (req, res) => {
        let sql = `DELETE FROM channels WHERE id = ?`
        conn.query(sql, id, function (err, results) {
            if (err) {
                console.log(err)
                return res.status(400).end()
            }
            res.status(200).json(results)
        })
    }) // 채널 개별 삭제
    .get([param('id').notEmpty().withMessage('채널 아이디 필요'), validate], (req, res) => {
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(400).json(err.array())
        }
        let { id } = req.params
        id = parsInt(id)

        let sql = `SELECT * FROM channels id = ?`
        conn.query(sql, id, function (err, results) {
            if (err) {
                console.log(err)
                return res.status(400).end()
            }

            if (results.length) {
                res.status(200).json(channel)
            }
            else {
                notFoundChannel(res)
            }
        })
    }) // 채널 개별 조회

function notFoundChannel(res) {
    res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다.`
    })
}
module.exports = router