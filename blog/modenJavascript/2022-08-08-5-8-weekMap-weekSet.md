---
slug:  modern-javascript-5-8
title: (모던 자바스크립트) 5-8 맵과 셋
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, weekMap, weekSet, 위크맵, 위크셋, 모던 자바스크립트]
---
<br/>

# (모던 자바스크립트) 5-8 위크맵과 위크셋

자바스크립트 엔진은 도달 가능한 (그리고 추후 사용될 가능성이 있는) 값을 메모리에 유지한다

```jsx
let john = { name: "John" };

// 위 객체는 john이라는 참조를 통해 접근할 수 있습니다.

// 그런데 참조를 null로 덮어쓰면 위 객체에 더 이상 도달이 가능하지 않게 되어
john = null;

// 객체가 메모리에서 삭제됩니다.
```

자료구조를 구성하는 요소도 자신이 속한 자료구조가 메모리에 남아있는 동안 대게 도달 가능한 값으로 취급되어 메모리에서 삭제되지 않는다. 객체의 프로퍼티나 배열의 배열의 요소, 맵이나 셋을 구성하는 요소들이 이에 해당한다.

## 위크맵

`맵`과 `위크맵`의 첫 번째 차이는 `위크맵`의 키가 반드시 객체여야 한다는 점이다. 원시값은 위크맵의 키가 될 수 없다

```jsx
let weekMap = new WeekMap();

let obj = {};

weekMap.set(obj, "ok"); // 정삭적으로 동작한다(객체 키)

// 문자열("test")은 키로 사용할 수 없다
weekMap.set("test", "Whoops"); // Error: Invalid value used as week map key
```

위크맵의 키로 사용된 객체를 참조하는 것이 아무것도 없다면 해당 객체는 메모리와 위크맵에서 자동으로 삭제된다

```jsx
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 참조를 덮어씀

// john을 나타내는 객체는 이제 메모리에서 지워집니다!
```

`john` 을 나타내는 객체는 오로지 `위크맵`의 키로만 사용되고 있으므로, 참조를 덮어쓰게 되면 이 객체는 위크맵과 메모리에서 자동으로 삭제된다

`맵`과 `위크맵`의 두번째 차이는 위크맵은 반복작업과 `keys()`, `values()`, `entries()`메서드를 지원하지 않는다. 따라서 위크뱁에선 키나 값 전체를 얻는게불가능하다

## 유스 케이스: 추가 데이터

`위크맵` 은 부차적인 데이터를 저장할 곳이 필요할 떄 좋다

```jsx
// 📁 visitsCount.js
let visitsCountMap = new Map(); // 맵에 사용자의 방문 횟수를 저장함

// 사용자가 방문하면 방문 횟수를 늘려줍니다.
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

아래는 John이라는 사용자가 방문했을 때, 어떻게 방문 횟수가 증가하는지를 보여줍니다.

```jsx
// 📁 main.js
let john = { name: "John" };

countUser(john); // John의 방문 횟수를 증가시킵니다.

// John의 방문 횟수를 셀 필요가 없어지면 아래와 같이 john을 null로 덮어씁니다.
john = null;
```

## 위크셋

- `위크셋은` `셋`과 유사한데, 객체만 저장할 수 있다. 원시잢은 저장할 수 없다
- 셋 안의 객체는 도달 가능할 때만 메모리에서 유지된다
- `셋`과 마찬가지로 `위크셋`이 제원하는 메서드는 `add`, `has`, `delete`를 사용할 수 있고, `size`, `keys()` 나 반복 작업 관련 메서드는 사용할 수 없다

```jsx
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John이 사이트를 방문합니다.
visitedSet.add(pete); // 이어서 Pete가 사이트를 방문합니다.
visitedSet.add(john); // 이어서 John이 다시 사이트를 방문합니다.

// visitedSet엔 두 명의 사용자가 저장될 겁니다.

// John의 방문 여부를 확인해보겠습니다.
alert(visitedSet.has(john)); // true

// Mary의 방문 여부를 확인해보겠습니다.
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet에서 john을 나타내는 객체가 자동으로 삭제됩니다.
```

`위크맵`과 `위크셋`의 가장 큰 단점은 반복 작업이 불가능하다는 점이다. 위크맵이나 위크셋에 저장된 자료를 한 번에 얻는게 불가능하다