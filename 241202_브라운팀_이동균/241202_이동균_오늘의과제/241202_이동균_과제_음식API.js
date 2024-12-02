const express = require('express');
const router = express.Router(); // app.js에서 사용할 수 있게 모듈화
const conn = require('./mariadb');

router.use(express.json());

// 음식 등록
router.post('/addFood', (req, res) => {
    const { name, type, price, description } = req.body;

    if (!name || !type || !price || !description) {
        return res.status(400).json({
            message: "모든 필드를 입력해주세요.",
        });
    }

    let sql = `INSERT INTO foods (name, type, price, description) VALUES (?, ?, ?, ?)`;
    let values = [name, type, price, description];
    conn.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "음식 등록 중 오류가 발생했습니다.",
                error: err,
            });
        }
        res.status(201).json({
            message: `${name} 음식이 등록되었습니다.`,
            data: results,
        });
    });
});

// 음식 개별 조회
router.get('/food', (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({
            message: "음식 이름을 입력해주세요.",
        });
    }

    let sql = `SELECT * FROM foods WHERE name = ?`;
    conn.query(sql, name, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "음식 조회 중 오류가 발생했습니다.",
                error: err,
            });
        }

        if (results.length) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({
                message: "해당 음식을 찾을 수 없습니다.",
            });
        }
    });
});

// 음식 삭제
router.delete('/deleteFood', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "삭제할 음식 이름을 입력해주세요.",
        });
    }

    let sql = `DELETE FROM foods WHERE name = ?`;
    conn.query(sql, name, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "음식 삭제 중 오류가 발생했습니다.",
                error: err,
            });
        }

        if (results.affectedRows) {
            res.status(200).json({
                message: `${name} 음식이 삭제되었습니다.`,
            });
        } else {
            res.status(404).json({
                message: "삭제할 음식을 찾을 수 없습니다.",
            });
        }
    });
});

module.exports = router;
