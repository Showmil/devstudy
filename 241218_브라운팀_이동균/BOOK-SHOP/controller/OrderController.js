const conn = require('../mariadb');
const { statusCodes } = require('http-status-codes')

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


module.exports = { order, getOrders, getOrderDetail }