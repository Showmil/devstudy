# 250113 강의 요약

## 유니온
- 유니온 타입은 하나 이상의 타입을 정의하는 방식이다. | 연산자를 이용해 사용할 수 있다.
```
type UnionType = string | number;

let value: UnionType;
value = "반갑습니다다"; // OK
value = 42;      // OK
value = true;    // Error
```

## 타입 별칭
- 타입에 이름을 붙여 재사용할 수 있도록 하는 기능
```
type Input = string | number;
type Output = string;

function transform(input: Input): Output {
  return input.toString();
}
```

## 타입 가드
- 특정 조건을 기반으로 타입을 좁혀주는 역할을 한다. typeof 연산자를 일반적으로 사용
```
function logValue(value: string | number) {
  if (typeof value === "string") {
    console.log(`문자열 : ${value}`);
  } else {
    console.log(`숫자: ${value}`);
  }
}
```

## Array와 Tuple
- Array : 동일한 타입의 요소를 순서대로 저장할 수 있는 데이터 구조
- Tuple : 고정된 개수와 요소를 가지며 각 요소의 타입이 고정된 배열
```
// Array
let numbers: number[] = [1, 2, 3, 4];

// Tuple
let tuple: [string, number];
tuple = ["age", 25];
```

## 생성자
- 클래스의 객체가 생성될 때 자동으로 호출되는 메소드
- 일반적으로 값을 초기화할 때 많이 사용
```
class Example {
  property: string;

  // 생성자
  constructor(property: string) {
    this.property = property;
  }
}

const obj = new Example("안녕");
console.log(obj.property); // "안녕" 출력
```

## 접근 지정자
- 클래스의 속성 및 메소드에 대한 접근 권한을 제어하는 키워드
- public : 어디서든 접근 가능 / private : 클래스 내부에서만 접근 가능 / protected : 클래스 내부 및 하위 클래스에서만 접근 가능

## Getter와 Setter
- Getter는 속성 값을 읽는 데 사용하는 메소드이다.
- Setter는 클래스의 속성 값을 설정하는 데 사용하는 메소드이다.
```
class Example {
  private _value: number;

  constructor(value: number) {
    this._value = value;
  }

  // Getter 메서드
  get value(): number {
    return this._value;
  }

  // Setter 메서드
  set value(newValue: number) {
    this._value = newValue;
  }
}
```