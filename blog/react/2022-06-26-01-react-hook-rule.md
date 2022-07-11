---
slug:  react-02
title: React Hook의 규칙(주의점)
authors: malone
tags: [React]
keywords: [react, react hook, react hooks rule, hook, hook의 규칙, 주의점]
---
<br/>

> react에서 hooks을 사용할 때 주의할 점(규칙)이 있는데 무엇이 있는지는 알았지만 왜 그 규칙들을 지켜야하는지는 명확히 알고 있지않아서 확실히 습득하기위해서 찾아보았다.
> 

# Hook의 규칙

### 오직 React 함수 내에서만 Hook을 호출해야 합니다.

### 최상위 에서만 Hook을 호출해야한다.

반복문,  조건문 혹은 중첩된 함수 내에서 Hook을 호출 해서는 안된다. early return이 실행되기 전에 항상 react 함수 최상위에서 hook을 호출해야 컴포넌트 랜더링이 될때마다 항상 동일한 순서로 hook이 호출되는것을 보장한다. useState, useEffect가 여러 번 호출되는 중에도 Hook의 상태를 올바르게 유지할 수 있도록 해준다.

<aside>
💡 왜 반복문, 조건문 혹은 중첩된 함수 내에서 훅을 호출 하면 안될까?

</aside>

react는 hook이 호출되는 순서에서 의존하기 때문입니다. react는 랜더링 될때 hook의 호출 순서가 동일 하다면 각 state에 올바르게 접근 할 수 있는데

```jsx
// ------------
// 첫 번째 렌더링
// ------------
useState('Mary')           // 1. 'Mary'라는 name state 변수를 선언합니다.
useEffect(persistForm)     // 2. 폼 데이터를 저장하기 위한 effect를 추가합니다.
useState('Poppins')        // 3. 'Poppins'라는 surname state 변수를 선언합니다.
useEffect(updateTitle)     // 4. 제목을 업데이트하기 위한 effect를 추가합니다.

// -------------
// 두 번째 렌더링
// -------------
useState('Mary')           // 1. name state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(persistForm)     // 2. 폼 데이터를 저장하기 위한 effect가 대체됩니다.
useState('Poppins')        // 3. surname state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(updateTitle)     // 4. 제목을 업데이트하기 위한 effect가 대체됩니다.

// ...
```

조건문을 사용하여 hook의 순서가 변경되어 랜더링 되게 된다면

```jsx
// 🔴 조건문에 Hook을 사용함으로써 첫 번째 규칙을 깼습니다
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }

useState('Mary')           // 1. name state 변수를 읽습니다. (인자는 무시됩니다)
// useEffect(persistForm)  // 🔴 Hook을 건너뛰었습니다!
useState('Poppins')        // 🔴 2 (3이었던). surname state 변수를 읽는 데 실패했습니다.
useEffect(updateTitle)     // 🔴 3 (4였던). 제목을 업데이트하기 위한 effect가 대체되는 데 실패했습니다.
```
hook을 건너뛰고 랜더링 하게 되어 호출되는 hook의 순서가 다르게 되어 버그가 발생하게 됩니다 
<br/>

React Hook은 클로져와 배열을 가지고서 hook을 관리하고 랜더링 될 때마다 비교하는데 그렇기에 hook순서가 변경되지 않고 랜더링 되게 관리해야한다,  hook은 어떻게 클로져를 가지고서 hook의 상태를 기억하고 업데이트 하는지는 추후 포스트를 통해 더 알아 보도록 하겠다