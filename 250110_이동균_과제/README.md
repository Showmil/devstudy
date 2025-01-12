# 2501110 강의 요약

## 타입스크립트란?
- 자바스크립트 + 타입 체크
- 타입스크립트에서 자바스크립트를 코딩하면 동작하나 그 반대는 불가능

## 환경설정
- prettier : 코드를 읽기 쉽게 해주는 확장팩
- ESLint : 코드 검사 및 잠재적인 문제 판단
- Bracket : 코드의 색깔을 구분해준다

## 타입스크립트 실행 방법
- tsc app.js : app.ts => app.js로 변환
- tsc -w : w는 watch의 약자로 **TypeScript파일을 실시간 감시하며 파일이 수정될 때 마다 자동으로 재컴파일**한다.

## 타입 명시
- 변수, 함수, 매개변수, 반환값 등에 타입을 명시적으로 선언하는 기능
```
// 변수에 대한 타입 명시
let 변수명 : 타입 = 초기값;

// 함수에 대한 타입 명시
function 함수명(매개변수명 : 타입) : 반환 타입 {

}

// 배열의 타입 명시
let 변수명 : 타입[];
```

## 인터페이스
- 인터페이스는 타입스크립트에서 객체의 구조를 정의하는 데 사용된다.
```
interface 인터페이스명 {
  속성명: 타입;
  속성명: 타입;
}
```

## 선택적 프로퍼티
- 인터페이스를 정의할 때, 특정 속성을 선택적으로 만들 수 있다. 선택적 프로퍼티는 필수가 아니며 객체에 속성이 존재하지 않아도 오류가 발생하지 않는다.
```
interface 인터페이스명 {
  속성명?: 타입;
}

interface Person {
  name: string;
  age?: number;
}

const user1: Person = { name: "이동균" };
const user2: Person = { name: "이동균", age: 25 };
```

## 열거형
- 관련된 값들의 집합을 정의하고 이를 관리할 수 있도록 해주는 타입
```
enum Direction {
  North,
  East,
  South,
  West,
}

console.log(Direction.North); // 0
console.log(Direction.East);  // 1
console.log(Direction[0]);    // "North"
```