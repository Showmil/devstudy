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
    res.send("음식 백과사전 API");
});

// 전체 음식 조회
app.get('/foods', function (req, res) {
    let foods = {};
    db.forEach((value, key) => {
        foods[key] = value;
    });
    res.json(foods);
});

// 개별 음식 등록
app.post('/foods', function (req, res) {
    let newFood = req.body;
    if (!newFood.name) {
        return res.status(400).json({
            message: "음식 이름이 필요합니다."
        });
    }
    db.set(id++, newFood);
    res.status(201).json({
        message: `${newFood.name}을 음식 백과 사전에 추가했습니다!`
    });
});

// 개별 음식 조회
app.get('/foods/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id);
    const food = db.get(id);
    if (!food) {
        res.status(404).json({
            message: "해당 음식을 찾을 수 없습니다."
        });
    } else {
        res.json(food);
    }
});

// 개별 음식 삭제
app.delete('/foods/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id);
    const food = db.get(id);
    if (!food) {
        res.status(404).json({
            message: `요청하신 ${id}번 음식은 존재하지 않습니다.`
        });
    } else {
        db.delete(id);
        res.json({
            message: `${food.name}이(가) 음식 목록에서 삭제되었습니다.`
        });
    }
});

// 전체 음식 삭제
app.delete('/foods', function (req, res) {
    if (db.size > 0) {
        db.clear();
        res.json({
            message: "전체 음식이 삭제되었습니다."
        });
    } else {
        res.status(404).json({
            message: "삭제할 음식이 없습니다."
        });
    }
});

// 개별 음식 정보 수정
app.put('/foods/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id);

    const food = db.get(id);
    if (!food) {
        res.status(404).json({
            message: `요청하신 ${id}번 음식은 존재하지 않습니다.`
        });
    } else {
        const oldName = food.name;
        food.name = req.body.name;
        food.ingredients = req.body.ingredients;
        food.calories = req.body.calories;
        db.set(id, food);
        res.json({
            message: `${oldName}의 정보가 수정되었습니다.`,
            updatedInfo: food
        });
    }
});
