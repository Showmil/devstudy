# 241218 강의 요약

## 방금 INSERT한 데이터 PK 갸져오는 방법
- PK에는 AUTO INCREASEMENT가 설정되어있으므로, 가장 최근에 INSERT한 데이터의 ID는 가장크다. 따라서 max(id)를 이용하면, 가장 최근에 INSERT한 데이터의 ID가 나오게 된다.

## 오늘 작성한 주문 API
1. 클라이언트로부터 주문 데이터를 받아온다.
2. 배송 정보를 delivery 테이블에 삽입한다.
3. 주문 데이터를 orders 테이블에 삽입한다.
4. 주문된 책 데이터를 orderedBook 테이블에 삽입한다.
5. 성공 또는 실패 결과에 따라 적절한 HTTP 응답을 반환한다.
```
const order = (req, res) => {
    const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;

    let delivery_id = 3;
    let order_id = 2;

    let sql = "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)";
    let values = [delivery.address, delivery.receiver, delivery.contact];
    
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
       VALUES (?, ?, ?, ?, ?)`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];

    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

    // items : 배열 - 요소들을 하나씩 꺼내서 (foreach문 돌려서)
    values = [];
    items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity]);
        console.log(values);
    });

    conn.query(sql, [values], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};
```