---
slug:  modern-javascript-7-2
title: (모던 자바스크립트) 7-2 프로퍼티 getter와 setter
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, getter, setter, 자바스크립트]
---
<br/>
> 접근자 프로퍼티는 본질은 함수인데, 이 함수는 값을 획득(get)하고 설정(set)하는 역할을 담당한다. 그런데 외부 코드에서는 함수가 아닌 일반적인 프로퍼티처럼 보인다
> 

## getter와 setter

접근자 프로퍼티는 getter(획득자)와 setter(설정자)메서드로 표현된다. 객체 리터럴 안에서 getter와 setter 메서드는 `get`과 `set` 으로 나타낼 수 있다

```jsx
let obj = {
  get propName() {
    // getter, obj.propName을 실행할 때 실행되는 코드
  },

  set propName(value) {
    // setter, obj.propName = value를 실행할 때 실행되는 코드
  }
};
```

getter 메서드는 `obj.propName`을 사용해 프로퍼티를 읽으려고 할 때 실행되고, `setter` 메서드는 `obj.propName = value`으로 프로퍼티에 값을 할당하려 할 때 실행 된다

```jsx
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// 주어진 값을 사용해 set fullName이 실행됩니다.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

## 접근자 프로퍼티 설명자

데이터 프로퍼티의 설명자와 접근자 프로퍼티의 설명자는 다르다

접근자 프로퍼티엔 설명자 `value`와 `writable`가 없는 대신에 `get`과 `set`이라는 함수가 있다

- **`get`** – 인수가 없는 함수로, 프로퍼티를 읽을 때 동작함
- **`set`** – 인수가 하나인 함수로, 프로퍼티에 값을 쓸 때 호출됨
- **`enumerable`** – 데이터 프로퍼티와 동일함
- **`configurable`** – 데이터 프로퍼티와 동일함

## getter와 setter 똑똑하게 활용하기

getter와 setter를 실체 프로퍼티 값을 감싸는 래퍼(wrapper)처럼 사용하면, 프로퍼티 값을 원하는 대로 통제할 수 있다.

```jsx
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("입력하신 값이 너무 짧습니다. 네 글자 이상으로 구성된 이름을 입력하세요.");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // 너무 짧은 이름을 할당하려 함
```

`user`의 이름은 `_name`에 저장되고, 프로퍼티에 접근하는 것은 getter와 setter를 통해 이뤄집니다.

기술적으론 외부 코드에서 `user._name`을 사용해 이름에 바로 접근할 수 있습니다. 그러나 밑줄 `"_"` 로 시작하는 프로퍼티는 객체 내부에서만 활용하고, 외부에서는 건드리지 않는 것이 관습입니다.