---
slug:  react-01
title: React에서 왜 key를 index로 사용하면 안되는가?
authors: malone
tags: [React]
---

map 함수를 사용하여 DOM Elements들을 만들 경우 key값이 없으면 오류가 발생하게 된다.

> Each child in an array should have a unique “key” prop.
> 

### 그럼 key 를 왜 사용해야 할까?

React는 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸어 비교하여 다른 부분을 re-rendering을 시킨다

```html
<ul>
	<li>first</li>
	<li>second</li>
	<li>third</li>
</ul>

// third를 추가했을 때
<ul>
	<li>first</li>
	<li>second</li>
	<li>third</li>
</ul>
```

list에서 third가 추가되면 react는 변화를 감지하고서 re-rendering을 한다. 위가 같은 방법은 성능에 좋지 않은데 그 이유는 리스트에 third만 추가 된거지만 모두 다르다고 판단되어 전부를 re-rendering 하기 때문이다.  

이러한 문제를 해결하기 위해 react 에서는 key값을 지원한다.

기존의 가지고 있던 dom 트리와 변경된 가상 dom에서 key값을 비교해 변경을 한다면, 변경된 third만 추가 rendering한다. 간단하게 원하는 data가  배열의 index로 key를 사용하면 재배열이 일어날 경우 컴포넌트의 state 관련하여 문제 발생 할 수 있다. 컴포넌트는 key를 보고 갱신되고 재사용 됩니다. index를 사용했다면 항목의 순서가 바뀌었을 경우 key 또한 바뀌었을 거고 이는 state를 엉망으로 만들거나 원하지 않는 방식으로 컴포넌트를 바꿀 수 있다, 

아래 링크에서 리스트를 추가해보자 그럼 index를 key로 추가했을때의 문제점을 알 수 있다.

[JS Bin](https://jsbin.com/wohima/edit?output)

### index를 key로 사용해도 되는 경우

1. 배열과 각 요소가 static(정적)이며 **`computed`** 되지 않고 **`변하지 않아야`** 한다
2. 테이터에 unique id가 없을때
3. 리스트가 절대로 재정렬되거나 필터링이 되지 않을 때