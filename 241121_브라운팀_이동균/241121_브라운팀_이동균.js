const express = require('express');
const app = express();
app.listen(3000);

let food1 = {
    name: "불고기",
    ingredients: "소고기, 간장, 설탕, 마늘",
    calories: 450
};

let food2 = {
    name: "된장찌개",
    ingredients: "된장, 두부, 감자, 고추",
    calories: 300
};

let db = new Map();
let id = 1;
db.set(id++, food1);
db.set(id++, food2);

app.use(express.json());

app.get('/', function (req, res) {
    res.send("음식 백과사전");
});

// 전체 음식 조회
app.get('/foods', function (req, res) {
    res.json(Object.fromEntries(db));
});

// 개별 음식 등록
app.post('/food', function (req, res) {

    db.set(id++, req.body);
    res.json({
        message: `${req.body.name}을 음식 백과 사전에 추가했습니다!`
    });
});

// 개별 음식 조회
app.get('/food/:id', function (req, res) {
    const id = Number(req.params.id);

    if (db.get(id)) {
        res.json(db.get(id));
    } else {
        res.json({
            message: "해당 음식을 찾을 수 없습니다."
        });
    }
});