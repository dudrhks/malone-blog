---
slug:  modern-javascript-8-1
title: ((모던 자바스크립트) 8-1 프로토타입 상속
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, prototype, 자바스크립트]
---
<br/>

## [[Protype]]

자바스크립트의 객체는 명세서에서 명명한 `[[Prototype]]`이라는 숨김 프로퍼티를 갖는다. 이 숨김 프로퍼티 값은 `null`이거나 다른 객체에 대한 참조가 되는데, 다른 객체를 참조하는 경우 참조 대상을 **프로토타입**이라 한다

object에서 프로퍼티를 읽으려고 하는데 해당 프로퍼티가 없으면 자바스크립트는 자동으로 프로토타입에서 프로퍼티를 찾기 때문인데 프로그래밍에선 이런 동작 방식을 **프로토타입 상속**이라 부른다
`[[Prototype]]` 프로퍼티는 내부 프로퍼티이면서 숨김 프로퍼티이지만 다양한 방법을 사용해 개발자가 값을 설정 할 수있다

예를 들어 `__proto__` 을 사용하면 값을 설정할 수 있다

```jsx
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;
```

💡 `__proto__`는 `[[Prototype]]`용 getter·setter입니다.

`__proto__` 는 `[[Prototype]]` 가 다른데 `__proto__`는 `[[Prototype]]`의 getter(획득자)이자 setter(설정자) 이다

하위 호환성 때문에 여전히 `__proto__`를 사용할 순 있지만 비교적 근래에 작성된 스크립트에선 `__proto__`대신 함수 `Object.getPrototypeOf`나 `Object.setPrototypeOf`을 써서 프로토타입을 획득(get)하거나 설정(set)합니다. 근래엔 왜 `__proto__`를 쓰지 않는지와 두 함수의 자세한 설명에 대해선 이어지는 챕터에서 다룰 예정입니다.

객체 `rabbit`에서 프로퍼티를 얻고싶은데 해당 프로퍼티가 없다면, 자바스크립트는 자동으로 `animal`이라는 객체에서 프로퍼티를 얻는다

```jsx
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // (*)

// 프로퍼티 eats과 jumps를 rabbit에서도 사용할 수 있게 되었습니다.
alert( rabbit.eats ); // true (**)
alert( rabbit.jumps ); // true
```

프로토타입 체이닝엔 두 가지 제약사항이 있다

1. 순환 참조는 허용되지 않는다 __proto__ 를 이용해 닫힌 형태로 다른 객체를 참조하면 에러가 발생한다
2. `__proto__` 의 값은 객체나 `null`만 가능하다. 다른 자료형은 무시된다

여기에 더하여 객체엔 오직 하나의 `[[Prototype]]`만 있을 수 있다는 당연한 제약도 있다. 객체는 두 개의 객체를 상속받지 못한다

## 프토토타입은 읽기 전용이다

프로토타입은 프로퍼티를 읽을 때만 사용한다

프로퍼티를 추가, 수정하거나 지우는 연산은 객체에 직접 해야한다

```jsx
let animal = {
  eats: true,
  walk() {
    /* rabbit은 이제 이 메서드를 사용하지 않습니다. */
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.walk = function() {
  alert("토끼가 깡충깡충 뜁니다.");
};

rabbit.walk(); // 토끼가 깡충깡충 뜁니다.
```

## this가 나타내는 것

**메서드를 객체에서 호출했든 프로토타입에서 호출했든 상관없이 `this`는 언제나 `.` 앞에 있는 객체입니다.**

## for…in 반복문

`for…in`은 상속 프로퍼티도 순회 대상에 포함시킨다
```jsx
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// Object.keys는 객체 자신의 키만 반환합니다.
alert(Object.keys(rabbit)); // jumps

// for..in은 객체 자신의 키와 상속 프로퍼티의 키 모두를 순회합니다.
for(let prop in rabbit) alert(prop); // jumps, eats
```