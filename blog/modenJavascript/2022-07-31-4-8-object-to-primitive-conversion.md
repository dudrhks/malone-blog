---
slug:  modern-javascript-4-8
title: (모던 자바스크립트) 4-8 객체를 원시형으로 변환하기
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, 객체를 원시형으로 변환하기,object conversion, 모던 자바스크립트]
---
<br/>

1. 객체는 논리 평가 시 true를 반환한다. 따라서 객체는 숫자형이나 문자형으로만 형 변환이 일어난다
2. 숫자형으로의 변환은 객체끼리 빼는 연산을 할때나 수학 관련 함수를 적용할 때 일어난다. 객체 `Date` 끼리 차감하면(`date - date2` ) 두 날짜의 시간 차이가 반환된다.
3. 문자형으로의 형 변환은 대게 `alert(obj)` 같이 객체를 출력하려고 할 때 일어난다

## ToPrimitive

특수 객체 메서드를 사용하면 숫자형이나 문자형으로의 형 변환을 원하는 대로 조절할 수 있다

객체 형 변환은 세 종류로 구분 되는데, ‘hint’라 불리는 값이 구분 기준이 된다.

`“string”`

`alert` 함수같이 문자열을 기대하는 연산을 수행할 때는(객체-문자형 변환), hint가 `string`이 됩니다

```tsx
// 객체를 출력하려고 함
alert(obj);

// 객체를 프로퍼티 키로 사용하고 있음
anotherObj[obj] = 123;
```

`“number”`

수학 연산을 적용하려 할 떄(객체-숫자형 변환), hint는 `number`가 됩니다

```tsx
// 명시적 형 변환
let num = Number(obj);

// (이항 덧셈 연산을 제외한) 수학 연산
let n = +obj; // 단항 덧셈 연산
let delta = date1 - date2;

// 크고 작음 비교하기
let greater = user1 > user2;
```

`“default”`

연산자가 기대하는 자료형이 ‘확실치 않을 떄' hint는 `default`가 됩니다

이항 덧셈 연산자 `+`는 피연산자의 자료형에 따라 문자열을 합치는 연산을 할 수도 있고 숫자를 더해주는 연산을 할 수도 있다. 따라서 `+` 의 인수가 객체일때는 hint가 `default`가 된다

동등 연산자`==`를 사용해 객체-문자형, 객체-숫자형, 객체-심볼형끼리 비교할 때도, 객체를 어떤 자료형으로 바꿔야 할지 확신이 안서므로 hint는 default가 된다

```tsx
// 이항 덧셈 연산은 hint로 `default`를 사용합니다.
let total = obj1 + obj2;

// obj == number 연산은 hint로 `default`를 사용합니다.
if (user == 1) { ... };
```

크로 작음을 비교할 때 쓰이는 연선자 `<`,`>` 역시 피연산자에 문자형과 숫자형 둘 다를 허용하는데, 이 연산자들은 hint를 number로 고정한다

**자바스크립트는 형 변환이 필요할 때, 아래와 같은 알고리즘에 따라 원하는 메서드를 찾고 호출한다**

1. 객체에 `obj[Symbol.toPrimitive](hint)` 메서드가 있는지 찾고, 있다면 메서드를 호출한다. `Symbol.toPrimitive`는 시스템 심볼로, 심볼형 키로 사용
2. 1에 해당하지 않고 hint가 `string`이라면, 
    - obj.toString() 이나 obj.valueOf()를 호출합니다(존재하는 메서드만 실행됨)
3. 1과 2에 해당하지 않고, hint가 `"number"`나 `"default"`라면
    - `obj.valueOf()`나 `obj.toString()`을 호출합니다(존재하는 메서드만 실행됨).

## Symbol.toPrimitive

자바스크립트엔 Symbol.toPrimitive라는 내장 심볼이 존재하는데, 이 심볼은 아래와 같이 목표로 하는 자료형을 명명하는 데 사용된다

```tsx
obj[Symbol.toPrimitive] = function(hint) {
  // 반드시 원시값을 반환해야 합니다.
  // hint는 "string", "number", "default" 중 하나가 될 수 있습니다.
};

let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// 데모:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

## toString과 valueOf

`toString`과 `valueOf`는 심볼이 생기기 이전부터 존재해 왔던 평범한 메서드이다. 이 메서드를 이용하면 ‘구식’이긴 하지만 형 변환을 직접 구현할 수 잇따

객체에 `Symbol.toPrimitive`가 없으면 자바스크립트는 아래 규칙에 따라 `toString`이나 `valueOf`를 호출한다

- hint가 'string’인 경우: `toString -> valueOf` 순(`toString`이 있다면 `toString`을 호출, `toString`이 없다면 `valueOf`를 호출함)
- 그 외: `valueOf -> toString` 순

## 변환 타입

소개해드린 세 개의 메서드는 ‘hint’에 명시된 자료형으로의 형 변환을 보장해 주지 않는다`toString()`이 항상 문자열을 반환하리라는 보장이 없고, `Symbol.toPrimitive`의 hint가 `"number"`일 때 항상 숫자형 자료가 반환되리라는 보장이 없습니다.

확신할 수 있는 단 한 가지는 객체가 아닌 원시값을 반환해 준다는 것뿐입니다.

## 추가 형 변환

객체가 피연잔자일 떄는 다음과 같은 단계를 거쳐 형 변환이 일어난다

1. 객체는 원시형으로 변환된다.
2. 변환 후 원시값이 원하는 형이 아닌 경우엔 또다시 형 변환이 일어난다
```tsx
let obj = {
  // 다른 메서드가 없으면 toString에서 모든 형 변환을 처리합니다.
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, 객체가 문자열 "2"로 바뀌고, 곱셈 연산 과정에서 문자열 "2"는 숫자 2로 변경됩니다.
```