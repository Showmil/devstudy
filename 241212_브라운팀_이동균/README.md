# 241212 강의 요약

## piksum
- 개발자들이 프로젝트에서 이미지를 테스트하거나 샘플링할 때 사용하는 무료 이미지 제공 서비스

## 오늘 설계한 API
### 카테고리 별 도서 조회 API
```
const allBooks = (req, res) => {
    let { category_id } = req.query;

    if (category_id) {
        let sql = "SELECT * FROM books WHERE category_id = ?";
        conn.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            if (results.length)
                return res.status(StatusCodes.CREATED).json(results);
            else
                return res.status(StatusCode.NOT_FOUND).end();
        });
    } else {
        let sql = "SELECT * FROM books";
        conn.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.CREATED).json(results);
        });
    }
};
```
### 전체 카테고리 조회 API
```
const allCategory = (res, req) => {
    let sql = "SELECT * FROM category";
    conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.CREATED).json(results);
    });
}
```
### 개별 도서 조회 API
```
const bookDetail = (req, res) => {
  let { id } = parseInt(req.params);

  let sql = "SELECT * FROM books WHERE id=?";
  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results[0]) {
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};
```

