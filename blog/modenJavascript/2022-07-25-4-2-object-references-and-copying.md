---
slug:  modern-javascript-4-2
title: (모던 자바스크립트) 4-2 참조에 의한 객체 복사
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, object, 참조, 객체 복사, 모던 자바스크립트]
---
<br/>

> 객체와 원시 타입이 근복적인 차이 중 하나는 객체는 **참조의 의해(by reference)** 저장되고 복사된다는 것이다. 그에 반변 원시값(문자열, 숫자, 불린 값)은 값 그래도 저장,할당 되고 복사된다
> 

```jsx
let message = "Hello!";
let phrase = message;
```

두 개의 독립된 변수에 각각 문자열 `“Hello!”` 가 저장된다

객체의 동작방식은 이와 다른데 **변수엔 객체가 그래도 저장되는 것이 아니라, 개체가 저장되어있는 ‘메모리 주소'인 객체에 대한 ‘참조 값'이 자정 된다**

```jsx
let user = {
  name: "John"
};
```

객체는 메모리 내 어딘가에 저장되고, 변수 `user` 앤 객체를 ‘참조'할 수 있는 값이 저장 된다. 

따라서 **객체가 할당된 변수를 복사할 땐 객체의 참조 값이 복사되고 객체는 복사되지 않습니다**

```tsx
let user = { name: "John" };

let admin = user; // 참조값을 복사함
```

변수는 두 개이지만 각 변수엔 동일 객체에 대한 참조 값이 저장된다. 객체에 접근하거나 객체를 조작할 땐 여러 변수를 사용할 수 있다

```tsx
let user = { name: 'John' };

let admin = user;

admin.name = 'Pete'; // 'admin' 참조 값에 의해 변경됨

alert(user.name); // 'Pete'가 출력됨. 'user' 참조 값을 이용해 변경사항을 확인함
```

### 참조에 의한 비교

객체 비교 시 동등 연산자 `==`와 일치 연산자 `===`는 동일하게 동작한다

**비교 시 피연산자인 두 객체가 동일한 객체인 경우에 참을 반환한다**

```tsx
let a = {};
let b = a; // 참조에 의한 복사

alert( a == b ); // true, 두 변수는 같은 객체를 참조합니다.
alert( a === b ); // true
```

아래 예시는 두 객체 모두 비어있다는 점에서 같아 보이지만, 독립된 객체이기 때문에 일치·동등 비교하면 거짓이 반환됩니다.

```tsx
let a = {};
let b = {}; // 독립된 두 객체

alert( a == b ); // false
```

## 객체 복사, 병합과 Object.assign

객체를 복제하고 싶다면 어떻게 해야 할까? 자바스크립트는 객체 복제 내장 메서드를 지원하지 않는다.

그럼에도 객체를 복제하고 싶다면 기존 객체의 프로퍼티들을 순회해 원시 수준까지 프로퍼트를 복사한다

```tsx
let user = {
  name: "John",
  age: 30
};

let clone = {}; // 새로운 빈 객체

// 빈 객체에 user 프로퍼티 전부를 복사해 넣습니다.
for (let key in user) {
  clone[key] = user[key];
}

// 이제 clone은 완전히 독립적인 복제본이 되었습니다.
clone.name = "Pete"; // clone의 데이터를 변경합니다.

alert( user.name ); // 기존 객체에는 여전히 John이 있습니다.
```

`Object.assign`을 사용하는 방법도 있다

```tsx
Object.assign(dest, [src1, src2, src3...])

//
let user = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user);
```

- 첫 번째 인수 `dest`는 목표로 하는 객체이다
- 이어지는 인수 `src1, …` 는 복사하고 하는 객체이다.
- 객체 `src1, …` 의 프로퍼티를 `dest`에 복사한다. `dest`를 제외한 인수(객체)의 프로퍼트 전부가 첫 번째 인수(객체)를 복사한다
- 마지막으로 `dest`를 반환한다

`assign` 메서드를 사용해 여러 객체를 하나로 병합하는 예시이다

```tsx
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// permissions1과 permissions2의 프로퍼티를 user로 복사합니다.
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
```

목표 객체(`user`)에 동일한 이름을 가진 프로퍼티가 있는 경우엔 기존 값이 덮어씌워 집니다.

```tsx
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // user = { name: "Pete" }
```

## 중첩 객체 복사

프로퍼티가 다른 객체에 대한 참조 값일 경우는 어떻게 복사가 될까?

```tsx
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, 같은 객체입니다.

// user와 clone는 sizes를 공유합니다.
user.sizes.width++;       // 한 객체에서 프로퍼티를 변경합니다.
alert(clone.sizes.width); // 51, 다른 객체에서 변경 사항을 확인할 수 있습니다.
```

값이 객체인 경우 객체의 구조도 복사해주는 것을 **깊은 복사** 라고 한다

자바스크립트 라이브러리 `lodash`의 메서드인 `_.cloneDeep(obj)`를 사용하면 깊은 복사를 처리할 수 있다