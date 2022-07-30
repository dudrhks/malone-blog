---
slug:  modern-javascript-4-4
title: (모던 자바스크립트) 4-4 메서드와 this
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, method, this, 메서드, 모던 자바스크립트]
---
<br/>

# (모던 자바스크립트) 4-5 new 연산자와 생성자 함수

> `new` 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 잇다
> 

## 생성자 함수

생성자 함수 와 일반 함수에 기술적인 차이는 없습니다. 다만 생성자 함수는 아래 두 관례를 따른다

1. 함수 이름의 첫 글자는 대문자로 시작한다
2. 반드시 `new` 연산자를 붙여 실행한다

```tsx
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("보라");

alert(user.name); // 보라
alert(user.isAdmin); // false
```

`new User(…)`를 써서 함수를 실행하면 아래와 같은 알고리즘이 동작한다

1. 빈 객체를 만들어 `this`에 할당한다
2. 함수 본문을 실행한다. `this`에 새로운 프로퍼티를 추가해 `this`를 수정한다
3. `this`를 반환한다

```tsx
function User(name) {
  // this = {};  (빈 객체가 암시적으로 만들어짐)

  // 새로운 프로퍼티를 this에 추가함
  this.name = name;
  this.isAdmin = false;

  // return this;  (this가 암시적으로 반환됨)
}

// 이제 let user = new User("보라")는 아래 코드를 입력한 것과 동일하게 동작합니다.
let user = {
  name: "보라",
  isAdmin: false
};
```

객체 리터럴 문법으로 일일이 객체를 만드는 방법보다 훨씬 간단하고 읽기 쉽게 객체를 만들 수 있다

생성자의 의의는 여기에 있는데, 재 사용할 수 있는 객체 생성 코드를 구현하는 것 이다

모든 함수는 생성자 함수가 될 수 있다 new를 붙여 실행한다면 어떤 함수라도 위에 언급된 알고리즘이 실행된다. 이름의 ‘첫 글자가 대문자'인 함수는 `new`를 붙여 실행해야 한다

<aside>
💡 **new function() {…}**

</aside>

재사용할 필요가 없는 복잡한 객체를 만들어야 한다고 할때 많은 양의 코드가 필요할 것이다. 이럴 땐 아래와 같이 코드를 익명 생성자 함수로 감싸주는 방식을 사용할 수 잇다

```tsx
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // 사용자 객체를 만들기 위한 여러 코드.
  // 지역 변수, 복잡한 로직, 구문 등의
  // 다양한 코드가 여기에 들어갑니다.
};
```

위 생성자 함수는 익명 함수이기 때문에 어디에도 저장되지 않는다. 처음 만들 때부터 단 한 번만 호출할 복적으로 만들었기 때문에 재사용이 불가능하다. 이렇게 익명 생성자 함수를 이용하면 재사용은 막으면서 코드를 캡슐화 할 수 있다

## new.target과 생성자 함수

`new.target`프로퍼티를 사용하면 함수가 `new`와 함께 호출되었는지 아닌지를 알 수 있다

일반적인 방법으로 함수를 호출했다면 `new.target`은 `undefined`를 반환한다. 반면 `new`와 함께 호출한 경우엔 `new.target`은 함수 자체를 반환해준다

```tsx
function User() {
  alert(new.target);
}

// 'new' 없이 호출함
User(); // undefined

// 'new'를 붙여 호출함
new User(); // function User { ... }
```

함수 본문에서 `new.targe` 을  사용하면 해당 함수가 `new`와 함께 호출되었는지 아닌지를 확인할 수 있다

```tsx
function User(name) {
  if (!new.target) { // new 없이 호출해도
    return new User(name); // new를 붙여줍니다.
  }

  this.name = name;
}

let bora = User("보라"); // 'new User'를 쓴 것처럼 바꿔줍니다.
alert(bora.name); // 보라
```

## 생성자와 return문

생성자 함수엔 보통 `return`문이 없다. 반환해야할 할 것들은 모두 `this`에 저장되고, `this`는 자동으로 반환되기 때문에 반환문을 명시적으로 써 줄 수 필요가 없다

그런데 만약 `return` 문이 있다면 어떻게 될까?

- 객체 `return`한다면 `this`대신 객체가 반환된다
    
```tsx
function BigUser() {

this.name = "원숭이";

return { name: "고릴라" };  // <-- this가 아닌 새로운 객체를 반환함
}

alert( new BigUser().name );  // 고릴라
```

- 원시형을 `return`한다면 `return`문이 무시된다

```tsx
function SmallUser() {

this.name = "원숭이";

return; // <-- this를 반환함
}

alert( new SmallUser().name );  // 원숭이
```

<aside>
💡 인수가 없는 생성자 함수는 괄호를 생략해 호출 할 수 있다

</aside>

## 생성자 내 메서드

생성자 함수를 사용하면 매게변수를 이용해 객체 내부를 자유롭게 구성할 수 있다. `this`에 메서드를 더해주는 것도 가능하다
```tsx
function User(name){
this.name = name;

this.sayHi = function(){
alert( "제 이름은 " + this.name + "입니다.");
}
}

let bora = new User("한영관");

bora.sayHi(); // 제 이름은 이보라입니다.

/*
bora = {
name: "이보라",
sayHi: function() { ... }
}
*/
```