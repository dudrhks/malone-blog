---
slug:  modern-javascript-5-10
title: (모던 자바스크립트) 5-10 구조 분해 할당
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, 구조 분해 할당, 모던 자바스크립트]
---
<br/>

## 배열 분해하기

```jsx
// 이름과 성을 요소로 가진 배열
let arr = ["Bora", "Lee"]

// 구조 분해 할당을 이용해
// firstName엔 arr[0]을
// surname엔 arr[1]을 할당하였습니다.
let [firstName, surname] = arr;

alert(firstName); // Bora
alert(surname);  // Lee
```

이렇게 접근하면 인덱스를 이용하지 않아도 변수로 이름과 성을 사용할 수 잇게 된다

`split`같은 반환 값이 배열이 메서드를 써서 함께 할용할 수 있다

```jsx
let [firstName, surname] = "Bora Lee".split(' ');
```

**💡 분해(destructring)는 파괴(destructive)를 의미하지 않는다**

구조 분해 할당이란 명칭은 어떤 것을 복사한 이후에 변수로 분해 해준다는 의미 때문에 붙여졌다. 이 과정에서 분해 대상은 수정 또는 파괴되지않는다

```jsx
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```

**💡 쉼표를 사용하여 요소 무시하기**

쉼표를 사용하면 필효하지 않은 배열 요소를 버릴 수 있다

```jsx
// 두 번째 요소는 필요하지 않음
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert( title ); // Consul
```

**💡 할당 연산자 좌측엔 뭐든지 올 수 있다**

할당 연산자 좌측엔 할당할 수 있는 것이라면 어떤 것이든 올 수 있다. 객체 프로퍼티도 가능하다

```jsx
let user = {};
[user.name, user.surname] = "Bora Lee".split(' ');

alert(user.name); // Bora
```

**💡 변수 교환 트릭**

두 변수에 저장된 값을 교환할 때 구조 분해 할당을 사용할 수 있다

```jsx
let guest = "Jane";
let admin = "Pete";

// 변수 guest엔 Pete, 변수 admin엔 Jane이 저장되도록 값을 교환함
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // Pete Jane(값 교환이 성공적으로 이뤄졌습니다!)
```

### …로 나머지 요소 가져오기

배열 앞쪽에 위치한 값 몇 개만 필요하고 그 이후 이어지는 나머지 값들을 한데 모아서 자장하고 싶을 때가 있다. 이럴 때는 점 세개 `…` 를 붙인 매개면수 하나를 추가하면 나머지(rest) 요소를 가져올 수 있다

```jsx
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar

// `rest`는 배열입니다.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
```

`rest`는 나머지 배열 요소들이 저장된 새로운 배열이 된다 `rest`대신에 다른 이름을 사용해도 되는데, 변수 앞의 점 세 개(`…`)와 변수가 가장 마지막에 위치해야한다

### 기본값

할당하가조 하는 변수의 개수가 분해하고자 하는 배열의 길이보다 크더라도 에러가 발생하지 않는다. 할당할 값이 없으면 undefined로 취급된다

```jsx
let [firstName, surname] = [];

alert(firstName); // undefined
alert(surname); // undefined
```

`=` 을 이용하면 할당할 값이 없을 때 기본으로 할당해 줄 값인 기본값(default value)을 설정할 수 있다

```jsx
// 기본값
let [name = "Guest", surname = "Anonymous"] = ["Julius"];

alert(name);    // Julius (배열에서 받아온 값)
alert(surname); // Anonymous (기본값)
```

## 객체 분해하기

```jsx
let {var1, var2} = {var1:…, var2:…}
```

할당 연산자 우측엔 분해하고자 하는 객체를, 좌측엔 객체 프로퍼티의 패턴을 넣는다. 분해하려는 객체 프로퍼티의 키 목록을 패턴으로 사용한다

```jsx
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let {title, width, height} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200

// 콜론과 할당 연산자를 동시에 사용할 수도 있다
let options = {
  title: "Menu"
};

let {width: w = 100, height: h = 200, title} = options;

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

### 나머지 패턴 ‘…’

나머지 패턴을 사용하면 배열에서 했던 것처럼 나머지르포퍼티를 어딘가에 할당하는 게 가능하다

```jsx
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

// title = 이름이 title인 프로퍼티
// rest = 나머지 프로퍼티들
let {title, ...rest} = options;

// title엔 "Menu", rest엔 {height: 200, width: 100}이 할당됩니다.
alert(rest.height);  // 200
alert(rest.width);   // 100
```

## 중접 구조 분해

객체나 배열이 다른 객체나 배열을 포함하는 경우, 좀 더 복잡한 패턴을 사용하면 중첩 배열이나 객체의 정보를 추출 할 수 있다. 이를 중첩 구조 분해(nested destructuring)라고 부른다

```jsx
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// 코드를 여러 줄에 걸쳐 작성해 의도하는 바를 명확히 드러냄
let {
  size: { // size는 여기,
    width,
    height
  },
  items: [item1, item2], // items는 여기에 할당함
  title = "Menu" // 분해하려는 객체에 title 프로퍼티가 없으므로 기본값을 사용함
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

## 똑똑한 함수 매개변수

함수에 매개변수가 많은데 이중 상당수는 선택적으로 쓰인다. 사용자 인터페이스와 연관된 함수에서 이런 상황을 자주 볼 수 있다. 

```jsx
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}

// 리팩토링
// 함수에 전달할 객체
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// 똑똑한 함수는 전달받은 객체를 분해해 변수에 즉시 할당함
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
  // title, items – 객체 options에서 가져옴
  // width, height – 기본값
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

모든 인수에 기본 값을 할당해 주려면 빈 객체를 명시적으로 전달해야한다
```jsx
showMenu({}); // 모든 인수에 기본값이 할당됩니다.

showMenu(); // 에러가 발생할 수 있습니다.

// 이 문제를 예방하려면 빈 객체 {}를 인수 전체의 기본값으로 만들면 된다
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```