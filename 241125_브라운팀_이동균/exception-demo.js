const express = require('express');
const app = express();

app.listen(1234);

const fruits = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'orange' },
    { id: 3, name: 'strawberry' },
    { id : 4, name : 'blueberry' }
]

app.get('/fruits', function (req, res) {
    res.json(fruits)
})

app.get('/fruits/:id', (res, req) => {
    let id = req.params.id
    // let fruit = fruits[id]
    var findFruit = fruits.find(f => (f.id == id))
    // fruits 배열 안에 있는 객체 중, id 값이 params.id랑 같은 객체를 찾기

    if (findFruit)
        res.json(findFruit)
    else
        res.status(404).send("전달주신 id로 저장된 과일이 없습니다.")
})