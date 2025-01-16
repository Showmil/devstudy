# 250115 강의 요약

## 클래스형 컴포넌트
- React의 Component 클래스를 상속받아 사용한다.
- State와 라이프사이클 메서드를 사용한다.

## 함수형 컴포넌트
- props를 매개변수로 받아 JSX를 반환한다.
- 클래스형 컴포넌트보다 간결하고 직관적이다.

## 구조 분해 할당
- 배열이나 객체의 값을 쉽게 추출하여 변수에 할당하는 문법
```
const [a, b] = [1, 2];
const [a, , c] = [1, 2, 3];

const obj = { name: "Alice", age: 25 };
const { name, age } = obj;
```