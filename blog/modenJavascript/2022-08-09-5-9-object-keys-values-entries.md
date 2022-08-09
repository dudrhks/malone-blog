---
slug:  modern-javascript-5-9
title: (모던 자바스크립트) 5-9 Object.keys, values, entries
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, Object.keys, values, entries, 모던 자바스크립트]
---
<br/>

## Object.keys, values, entries

- `Object.keys(obj)` : 객체의 키만 담은 배열을 반환한다
- `Object.values(obj)` : 객체의 키만 담은 배열을 반환한다
- `Object.entries(obj)` : `[키, 값]` 쌍을 담은 배열을 반환한다

`Object.*` 을 호출하면 iterable 객체가 아닌 객체의 한 종류인 배열을 반환한다

```jsx
Object.keys(user) = ["name", "age"]
Object.values(user) = ["John", 30]
Object.entries(user) = [ ["name","John"], ["age",30] ]

//ex)
let user = {
  name: "Violet",
  age: 30
};

// 값을 순회합니다.
for (let value of Object.values(user)) {
  alert(value); // Violet과 30이 연속적으로 출력됨
}
```

**💡 Object.keys, values, entries는 심볼형 프로퍼티를 무시한다**

## 객체 변환하기

객체엔 map, filter 같은 전용 메서드를 사용할 수 없다

하지만 `Object.entries`와 `Objcet.fromEntries`를 순차적으로 적용하면 객체에도 배열 전용 메서드 사용 할 수 있다

1. `Object.entries(obj)`를 사용해 객체의 키-값 쌍이 요소인 배열을 얻는다
2. 1에서 만든 배열에 `map` 등의 배열 전용 메서드를 적용한다
3. 2에서 반환된 배열에 `Object.fromEntries(array)`를 적용해 배열을 다시 객체로 되돌린다
```jsx
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // 객체를 배열로 변환해서 배열 전용 메서드인 map을 적용하고 fromEntries를 사용해 배열을 다시 객체로 되돌립니다.
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8
```