# 241219 강의 요약

## Node.js 비동기
- Node.js는 기본적으로 비동기
- 비동기가 필요가 없을 때는 어떻게 해야할까? => 순서를 맞춰서 코드를 실행해 줄 필요가 생김!
1. 콜백함수 => 메소드 진행한 뒤에 호출되는 함수 (= 순서 맞춰서 그 뒤에 실행하는 함수)
2. promise
3. then & catch
**4. async & await**

## Promise 객체
- 비동기 작업에서 작업이 성공하거나 실패했을 때 이를 다룰 수 있도록 도와준다.
- Promise의 생성
```
const promise = new Promise((resolve, reject) => {
    const success = true;
    if (success) {
        resolve("작업이 성공했습니다!");
    } else {
        reject("작업이 실패했습니다.");
    }
});
```
-작업이 성공했을 때 then(), 실패했을 때 catch()를 이용하여 처리할 수 있다.
```
promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });
```

## Promise Chaining
- then을 여러번 묶어서 쓰는 방법
```
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        if (typeof a === "number" && typeof b === "number") {
            resolve(a + b);
        } else {
            reject("숫자가 아닙니다.");
        }
    });
};

add(3, 4)
    .then((sum) => {
        console.log("첫 번째 결과:", sum); // 7
        return add(sum, 5);
    })
    .then((sum) => {
        console.log("두 번째 결과:", sum); // 12
    })
    .catch((error) => {
        console.error(error);
    });
```

## async & await
- Promise 객체를 좀 더 쉽고 편하게 사용할 수 있는 문법
- 비동기 처리가 쉽다.

### async
- 함수 앞에 사용된다.
- **항상 Promise를 반환한다.**

### await
- async 함수 내부에서만 사용할 수 있다.
- await는 Promise가 해결될 때까지 기다린다. Promise가 성공하면 값을 반환하고, 실패하면 throw로 에러를 발생시킨다.
```
async function example() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("완료!"), 1000);
    });

    let result = await promise; // Promise가 해결될 때까지 대기
    console.log(result); // "완료!"
}

example();
```

## async와 await의 핵심
- async는 항상 Promise를 반환한다.
- await는 Promise 객체 오며, 해당 Promise 객체의 실행이 완료될 때까지 기다린다.
- await는 항상 async 함수 안에 온다.