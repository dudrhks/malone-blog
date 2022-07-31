---
slug:  modern-javascript-4-6
title: (모던 자바스크립트) 4-6 옵셔널 채아낭 '?.'
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, optional chaining, 옵셔널 체이닝, 모던 자바스크립트]
---
<br/>

> 옵셔널 체이닝(optional chaning) `?.` 을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다
> 

## 옵셔널 체이닝 필요한 이유

```tsx
let user = {}; // 주소 정보가 없는 사용자

alert(user.address.street); // TypeError: Cannot read property 'street' of undefined
```

다른 사례론 브라우저에서 동작하는 코들르 개발할 떄 발생할 수 있는 문제가 있는데. 자바스크립트를 사용해 페이지에 존재 하지 않는 요소에 접근해 요소의 정보를 가져오려 할때 문제가 발생한다

```tsx
// querySelector(...) 호출 결과가 null인 경우 에러 발생
let html = document.querySelector('.my-element').innerHTML;
```

명세서에 `?.`이 추가되기 전엔 이런 문제들을 해결하기 위해 `&&` 연산자를 사용하곤 했다

```tsx
let user = {}; // 주소 정보가 없는 사용자

alert( user && user.address && user.address.street ); // undefined, 에러가 발생하지 않습니다.
```

중접 객체의 특정 프로퍼티에 접근하기 위해 거쳐야 할 구성요소들을 AND로 연결해 실제 해당 객체나 프로퍼티가 있는지 확인하는 방법을 사용한다. 그런데 이렇게 AND를 연결해서 사용하면 코드가 아주 길어진다는 단점이 있다

## 옵셔널 체이닝의 등장

`?.` 은 `?.` ‘앞’의 평가 대상이 `undefined`나 `null` 이면 평가를 멈추고 `undefined`를 반환한다

**설명이 장황해지지 않도록 지금부턴 평가후 결과가 `null`이나 `undefined`가 아닌 경우엔 값이 ‘있다'혹은 ‘존재한다'라고 표현한다**

```tsx
let user = {}; // 주소 정보가 없는 사용자

alert( user?.address?.street ); // undefined, 에러가 발생하지 않습니다.

// 객체가 존재하지 않더라도 에러가 발생하지 안흔ㄴ다
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

`?.`은 `?.` ‘앞'평가 대상에만 동작되고, 확장은 되지않는다. 참고로 위 예시에서 사용된 `user?.`는 `user`가 `null`이나 `undefined`인 경우만 처리할 수 있다

<aside>
⚠️ `**?.`는 존재하지 않아도 괜찮은 대상에만 사용해야 합니다. 남용하게 된다면 에러를 조기에 발견하지 못하고 디버깅이 어려워진다**

</aside>

<aside>
⚠️ `**?.`는 존재하지 않아도 괜찮은 대상에만 사용해야 합니다.**

</aside>

## 단락 평가

`?.` 는 왼쪽 평가대상에 값이 없으면 즉시 평가를 멈춘다. 참고로 이런평가 방법을 단락 평가라고 부른다. 그렇기 때문에 함수 호출을 비롯한`?.`오른쪽에 있는 부가 동작은 `?.`의 평가가 멈췄을 때 더는 일어나지 않는다

## `?.()`와 `?.[]`

`?.` 연산자가 아니다 `?.`은 함수나 대괄호와 함께 동작하는 특별한 문법 구조체이다

함수 관련 예시와 존재 여부가 확실치 않는 함수를 호출할 때 `?.()`를 어떻게 쓸 수 있을까?

```tsx
let user1 = {
  admin() {
    alert("관리자 계정입니다.");
  }
}

let user2 = {};

user1.admin?.(); // 관리자 계정입니다.
user2.admin?.();
```

`?.()`를 사용해 `admin`의 존재 여부를 확인했습니다. `user1`엔 `admin`이 정의되어 있기 때문에 메서드가 제대로 호출되었습니다. 반면 `user2`엔 `admin`이 정의되어 있지 않았음에도 불구하고 메서드를 호출하면 에러 없이 그냥 평가가 멈추는 것을 확인할 수 있습니다.

`.`대신 대괄호 `[]`를 사용해 객체 프로퍼티에 접근하는 경우엔 `?.[]`를 사용할 수도 있습니다. 위 예시와 마찬가지로 `?.[]`를 사용하면 객체 존재 여부가 확실치 않은 경우에도 안전하게 프로퍼티를 읽을 수 있습니다.

```tsx
let user1 = {
  firstName: "Violet"
};

let user2 = null; // user2는 권한이 없는 사용자라고 가정해봅시다.

let key = "firstName";

alert( user1?.[key] ); // Violet
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

`?.`은 `delete`와 조합해 사용할 수도 있습니다.

```tsx
delete user?.name; // user가 존재하면 user.name을 삭제합니다.
```

<aside>
⚠️ **`?.`은 읽기나 삭제하기에는 사용할 수 있지만 쓰기에는 사용할 수 앖디**

</aside>

