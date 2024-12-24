# 241223 강의 요약

## 토큰을 이용해 user_id 받아오는 API
```
function ensureAuthorization(req) {
  let receivedJwt = req.headers["authorization"];
  console.log("received jwt: ", receivedJwt);

  let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
  console.log(decodedJwt);

  return decodedJwt;
}
```

## try-catch
- 수많은 에러를 처리하는 문법이다.
```
try {
    // 정상적으로 돌아가는 코드 A
} catch (err) {
    // A에서 에러가 일어났을 때 실행행
}
```

## throw 구문
- 예외를 명시적으로 발생시키는 데 사용된다.
```
function validateAge(age) {
    if (age < 18) {
        throw new Error("나이는 18 이상이어야 합니다.");
    }
    console.log("입장 가능");
}

try {
    validateAge(15); // 예외 발생
} catch (e) {
    console.error("에러:", e.message);
}
```