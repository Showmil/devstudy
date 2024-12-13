# 241213 강의 요약

## LIMIT
- 조회할 결과의 최대 개수 제한
## OFFSET
- 결과에서 **스킵할 행의 개수**를 지정

## LIMIT와 OFFSET을 이용한 페이징
```
SELECT *
FROM table_name
LIMIT page_size OFFSET (page_number - 1) * page_size;
```
이때, page_size는 한 페이지에 들어갈 행의 개수이고 page_number는 페이지의 번호이다.
- EX
```
SELECT *
FROM employees
LIMIT 10 OFFSET 10; -- 10번째 행부터 10개
```

## 오늘 작성한 API
```
const allBooks = (req, res) => {
  let { category_id, news, limit, currentPage } = req.query;

  let offset = limit * (currentPage - 1);
  
  let sql = "SELECT * FROM books";
  let values = [];

  if (category_id && news) {
    sql += " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values.push(category_id);
  } else if (category_id) {
    sql += " WHERE category_id=?";
    values.push(category_id);
  } else if (news) {
    sql += " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  }

  sql += " LIMIT ? OFFSET ?";
  values.push(parseInt(limit), offset);

  conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results.length)
        return res.status(StatusCodes.CREATED).json(results);
      else
        return res.status(StatusCodes.NOT_FOUND).end();
    });
};
```