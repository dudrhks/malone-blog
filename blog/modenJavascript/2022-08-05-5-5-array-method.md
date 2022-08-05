---
slug:  modern-javascript-5-5
title: (모던 자바스크립트) 5-5 배열과 메소드
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, array method, 배열, method, 모던 자바스크립트]
---
<br/>

## 요소 추가·제거 메서드

- `arr.push(...items)` – 맨 끝에 요소 추가
- `arr.pop()` – 맨 끝 요소 제거
- `arr.shift()` – 맨 앞 요소 제거
- `arr.unshift(...items)` – 맨 앞에 요소 추가

`splice`

배열에서 요소를 하나만 지우고 싶을때 사용한다

```jsx
arr.splice(index[, deleteCount, elem1, ..., elemN])

let arr = ["I", "study", "JavaScript"];

arr.splice(1, 1); // 인덱스 1부터 요소 한 개를 제거

alert( arr ); // ["I", "JavaScript"]
```

요소를 지우고 다른것으로 교체를 하는 방법

```jsx
let arr = ["I", "study", "JavaScript", "right", "now"];

// 처음(0) 세 개(3)의 요소를 지우고, 이 자리를 다른 요소로 대체합니다.
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // now ["Let's", "dance", "right", "now"]
```

`splice`는 삭제된 요소로 구성된 배열을 반환한다.

```jsx
let arr = ["I", "study", "JavaScript", "right", "now"];

// 처음 두 개의 요소를 삭제함
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- 삭제된 요소로 구성된 배열
```

`splice` 메서드의 `deleteCount`를 `0`으로 설정하면 요소를 제거하지 않으면서 새로운 요소를 추가할 수 있습니다.

```jsx
let arr = ["I", "study", "JavaScript"];

// 인덱스 2부터
// 0개의 요소를 삭제합니다.
// 그 후, "complex"와 "language"를 추가합니다.
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

**💡 음수 인덱스도 사용할 수 있다**

slice 메서드 뿐만 아니라 배열 관련 메서드엔 음수 인덱스를 사용할 수 있다. 이때 마이너스 부호 앞의 숫자는 배열 끝에서부터 센 쇼호 위치를 나타낸다

```jsx
let arr = [1, 2, 5];

// 인덱스 -1부터 (배열 끝에서부터 첫 번째 요소)
// 0개의 요소를 삭제하고
// 3과 4를 추가합니다.
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```

`slice`

```jsx
arr.slice([start], [end])

//ex
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (인덱스가 1인 요소부터 인덱스가 3인 요소까지를 복사(인덱스가 3인 요소는 제외))

alert( arr.slice(-2) ); // s,t (인덱스가 -2인 요소부터 제일 끝 요소까지를 복사)
```

arr.slice()는 인수를 하나도 넘기지 않고 arr 복사본을 마들 수 있다. 이런 방식은 기존 배열을 건드리지 않으면서 배열을 조작해 새로운 배열을 만들고자 할 때 자주 사용됩니다

`concat`

arr.concat은 기존 배열의 요소를 사용해 새로운 배열을 만들거나 기존 배열에 요소를 추가하고자 할 때 사용할 수 있다

```jsx
arr.concat(arg1, arg2...)

// ex
let arr = [1, 2];

// arr의 요소 모두와 [3,4]의 요소 모두를 한데 모은 새로운 배열이 만들어집니다.
alert( arr.concat([3, 4]) ); // 1,2,3,4

// arr의 요소 모두와 [3,4]의 요소 모두, [5,6]의 요소 모두를 모은 새로운 배열이 만들어집니다.
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// arr의 요소 모두와 [3,4]의 요소 모두, 5와 6을 한데 모은 새로운 배열이 만들어집니다.
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

concat 메서드는 제공받은 배열의 요소를 복사해 활용한다. 객체가 인자로 넘어오면(배열처럼 보이는 유사 배열 객체이더라도) 객체는 분해되지않고 통으로 복사되어 더해진다

```jsx
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

## forEach로 반복 작업하기

arr.forEach는 주어진 함수를 배열 요소 각각에 실행할 수 있게 해준다

```jsx
arr.forEach(function(item, index, array) {
  // 요소에 무언가를 할 수 있습니다.
});

// ex
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

참고로, 인수로 넘겨준 함수의 반환값은 무시된다

## 배열 탐색하기

배열 내에서 무언가를 찾고 싶을 떄 쓰는 메서드가 있다

### indexOf, lastIndexOf 와 includes

arr.indexOf와 arr.lastIndexOf, arr.includes는 같은 이름을 가진 문자열 메서드와 문법이 동일하다. 연산 대상이 문자열이 아닌 배열의 요소라는 점만 다르다

- `arr.indexOf(item, from)` 는 인덱스 `from`부터 시작해 `item(요소)`을 찾습니다. 요소를 발견하면 해당 요소의 인덱스를 반환하고, 발견하지 못했으면 `-1`을 반환합니다
- `arr.lastIndexOf(item, from)` 는 위 메서드와 동일한 기능을 하는데, 검색을 끝에서부터 시작한다는 점만 다르다
- `arr.includes(item, from)` : `from`부터 시작해 `item`이 있는지 검색하는데, 해당하는 요소를 발견하면 `true`를 반환한다

```jsx
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

### find와 findIndex

```jsx
let result = arr.find(function(item, index, array) {
  // true가 반환되면 반복이 멈추고 해당 요소를 반환합니다.
  // 조건에 해당하는 요소가 없으면 undefined를 반환합니다.
});

// ex
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

arr.findIndex는 find와 동일한 일을 하나, 조건에 맞는 요소을 반환하는 대신 해당 요소의 인덱스를 반환한다는 점이 다르다 조건에 맞는 요소가 없으면 `-1` 반환

### filter

filter는 find와 문법이 유사하지만, 조건에 맞는 요소 전체를 담은 배열을 반환한다

```jsx
let results = arr.filter(function(item, index, array) {
  // 조건을 충족하는 요소는 results에 순차적으로 더해집니다.
  // 조건을 충족하는 요소가 하나도 없으면 빈 배열이 반환됩니다.
});

// ex
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// 앞쪽 사용자 두 명을 반환합니다.
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## 배열을 변형하는 메서드

### map

`map` 은 배열 요소 전체를 대상으로 함수를 호출하고, 함수 호출 결과를 배열로 반환해준다

```jsx
let result = arr.map(function(item, index, array) {
  // 요소 대신 새로운 값을 반환합니다.
});

// ex
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

배열의 요소를 정렬해준다. 배열 자체가 변경된다

```jsx
let arr = [ 1, 2, 15 ];

// arr 내부가 재 정렬됩니다.
arr.sort();

alert( arr );  // 1, 15, 2
```

요소는 문자열로 취급되어 재 정렬된다

```jsx
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

alert(arr);  // 1, 2, 15
```

**💡 정렬 함수는 어떤 숫자든 반환할 수 있다**

```jsx
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // 1, 2, 15
```

**💡 화살표 함수를 사용한다**

```jsx
arr.sort( (a, b) => a - b );
```

**💡문자열엔 `Localecompare`를 사용**

```jsx
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (제대로 정렬이 되지 않았습니다.)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (제대로 정렬되었네요!)
```

### reverse

배열 요소를 역순으로 정렬시켜준다

```jsx
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

### split과 join

`split`

```jsx
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `${name}에게 보내는 메시지` ); // Bilbo에게 보내는 메시지
}
```

`join`

```jsx
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // 배열 요소 모두를 ;를 사용해 하나의 문자열로 합칩니다.

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce와 reduceRight

`forEach`, `for`, `for…of`를 사용하면 배열 내 요소를 대상으로 반복 작업을 할 수 있다

각 요소를 돌면서 반복 작업을 수행하고, 작업 결과물을 새로운 배열 형태고 얻으려면 map을 사용하면 된다

`arr.reduce`와 `arr.reduceRight`도 이런 메서드들과 유사한 작업을 해준다. 

```jsx
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

인수로 넘겨주는 함수는 배열의 모든 요소를 대상으로 차례차례 적용되는데, 적용 결과는 다음 함수 호출 시 사용 된다

- `accumulator` – 이전 함수 호출의 결과. `initial`은 함수 최초 호출 시 사용되는 초깃값을 나타냄(옵션)
- `item` – 현재 배열 요소
- `index` – 요소의 위치
- `array` – 배열

```jsx
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

`arr.reduceRight` 는 `reduce` 와 동일한 기능을 하지만 배열의 오른쪽부터 연산을 수행한다

## Array.isArray로 배열 여부 알아내기

자바스크립트에서 배열은 독립된 자료형으로 취급되지 않고 객체형에 속한다

따라서 `typeof` 로는 일반 객체와 배열을 구분할 수가 없다

```jsx
alert(typeof {}); // object
alert(typeof []); // object
```

그렇기에 `Array.isArray(value)` 메서드로 배열을 구분할 수 있다. `value`가 배열이라면 `true`, 아니라면 `false`

```jsx
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## 배열 메서드와 ‘thisArg’

함수를 호출하는 대부분의 배열 메서드(`find`, `filter`, `map` 등 `sort`는 제외)는 `thisArg`라는 매개변수를 옵션으로 받을 수 있다

`thisArg`

```jsx
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg는 선택적으로 사용할 수 있는 마지막 인수입니다.
```

`thisArg`는 `func`의 `this`가 된다
```jsx
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

// army.canJoin 호출 시 참을 반환해주는 user를 찾음
let soldiers = users.filter(army.canJoin, army);

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```