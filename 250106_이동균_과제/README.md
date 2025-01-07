# 250106 과제

## Flow Control
- 프로그램의 실행 흐름을 제어하는 방식.
- 조건문, 반복문, 예외 처리문 등이 포함

## 표현식과 문의 이해
- 표현식: 값을 생성하는 코드 단위
- 문 : 특정 작업을 수행하는 코드 단위

## 조건문
- 프로그램이 특정 조건에 따라 작업을 수행하도록 한다.
- if, else if, else, switch 가 있다.

## Conditional Loop
- 조건을 만족할 때까지 코드 반복실행
- while, do-while문이 있다.

## For Loop
- 고정된 횟수만큼 반복 실행한다.
- for (let i = 0; i < 10; i++) // i=0~9까지 총 10번 실행

## Break, Continue문
- break : 루프를 완전히 종료
- continue : 현재 반복을 건너 뛰고 다음 반복 실행

## 예외 상황 종류
- Runtime Errors : 실행 중 발생하는 에러
- Syntax Errors : 문법적으로 잘못된 코드
- Logical Errors : 논리적 문제로 예상과 다른 결과

## Throw와 Error 객체
- 예외 상황에서 throw로 에러를 발생시킬 수 있다.
- Error 객체를 이용해 에러 메세지 등 정보를 제공할수 있다.

## Try Catch문
- 예외 처리용 구문이다.
```
try {
    // 에러 발생하는 코드
} catch (err) {
    console.error(err.message) // 에러 메세지 출력
}
```

## 객체란?
- 속성과 메소드의 집합
- 예 : 
```
{
    name : "이동균",
    age : "23",
    greet: function({
        console.log("Hello!");
    })
}
```

## 객체 속성 Control
- 객체의 속성을 추가, 수정, 삭제한다.
- 예 :
```
const obj = { name : "donggyun" };
obj.age = 25; // 속성 추가
delete obj.name; // 속성 삭제
```

## Number, Math
- Number을 이용해 문자열을 숫자로 바꾸는 등 숫자와 관련된 연산이 가능하다.
- Math : Math.sqrt()나 Math.random() 등 수학과 관련된 연산을 제공한다.

## Date
- 날짜와 시간을 처리하는 객체로 new Date() , date.getFullYear() 등의 메소드가 존재한다.

## 문자열
- 문자열 조작을위한 메소드가 존재하는데, 모두 대문자로 만드는 .toUpperCase(), 문자열을 문자 단위로 나누는 .slice() 등이 존재한다.

## 정규 표현식
- 문자열에서 특정 패턴을 찾거나, 일치 여부를 확인하거나, 텍스트를 수정하는 데 사용되는 강력한 도구.
- /pattern/plag 방식으로 사용
- 예 :
```
const regex = /hello/gi // 'hello'를 대소문자 구분 없이 전역 검색

// 이메일 검증
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test("example@gmail.com")); // true

// URL 확인
const urlRegex = /^(https?):\/\/[^\s$.?#].[^\s]*$/;
console.log(urlRegex.test("https://example.com")); // true
```

## 배열
- 순서가 있는 데이터의 집합. 각 데이터는 인덱스를 통해 접근 가능하다.
- .push(), .map(), .filter() 등의 메소드가 있다.

## Map, WeakMap
### Map
- 키-값 쌍으로 데이터를 저장
- 키는 객체, 문자열, 숫자 등 모든 데이터 타입이 가능
- 삽입 순서가 유지된다.

### WeakMap
- 키는 객체만 가능하다.
- 일반적으로 메모리 관리를 목적으로사용한다.

## Set, WeakSet
### Set
- 고유한 값만 저장(중복 불가), 순서가 없으며 값만 저장

### WeakSet
- 객체 참조만 저장 가능
- 객체가 더 이상 참조되지 않으면 자동 삭제

## JSON 객체
- 데이터를 직렬화하거나, 역직렬화 할 때 사용
- 주로 서버-클라이언트 간 데이터 전송에 사용

## 스코프
- 변수의 유효 범위로 코드가 변수에 접근할 수 있는지를 결정
- 전역 스코프 : 프로그램 어디서든 접근 가능
- 함수 스코프 : 함수 내부에서 선언된 변수는 함수 내부에서만 접근 가능
- 블록 스코프 : 블록 내부에서 선언된 변수는 블록 안에서만 유효

## 클로저
- 외부 함수의변수에 접근 가능한 내부 함수
- 함수가 실행된 이후에도 외부 함수의 변수와 스코프를 유지

