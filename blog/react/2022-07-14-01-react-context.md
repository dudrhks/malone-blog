---
slug:  react-context-api
title: React Context API
authors: malone
tags: [React, Javascript, React Hook]
keywords: [react, react-hook, javscript, context, context]
---
<br/>

> context api는 react 전역적으로 데이터를 관리하고 사용할 수 있게 하는 방법입니다
> 

# Context?

Context는 부모 컴포넌트로부터 자식 컴포넌트로 전달되는 데이터 흐름과 상관없이 전역적인 데이터를 다룰 때 사용한다. 전역 데이터를 context에 저장한 후, 데이터가 필효한 컴포넌트에서 해당 데이터를 불러와 사용한다. 전역적으로 데이터를 쓸 수 있고 불필요한 props drilling 피할 수 있게 해주는 장점이 있다

# Context 사용법

## createContext 생성

context에서 사용할 기본값들을 담은 `Context`를 생성한다. 추후에 Context값에 접근하기 위해서 export 해준다

```jsx
// Count.tsx

import { createContext } from 'React'

export const CountCountext = createContext({
	count: 0,
	plusCount: ()=>{}
})
```

### Provider 설정

전역적으로 사용할 컴포넌트들을 `Provider` 로 감싸준다

```jsx
// Count
import { createContext } from 'React'

export const CountContext = createContext({
	count: 0,
	plusCount: ()=>{}
})

// provider로 감싸준다
function Count(){
	return (
		<CountCountext.Provider>
				...
		</CountCountext.Provider>
	)
}
```

## value setting

createContext에서 선언한 state값을 Provider value 값에 넣어준다

```jsx
// Count
import { createContext } from 'React'

export const CountContext = createContext({
	count: 0,
	plusCount: ()=>{}
})

// provider로 감싸준다
function Count(){
	const [count, setCount] = useState(0);

  const plusCount = () => {
    setCount(count + 1);
  };

	return (
		<CountCountext.Provider value={{count,plusCount}}>
				...
		</CountCountext.Provider>
	)
}
```

### Context 접근하기

context값에 접근하기 위해서는 useContext라는 hook을 사용하여 접근한다. useContext 훅에 우리가 만든 Context인 CountContext를 파라메터로 전달하면, createContext로 생성한 값들에 접근이 가능합니다.

```jsx
// component/AllCount.tsx
import { useContext } from 'React';
import { CountContext } from '../page/Count';

function AllCount(){
	const { count, plusCount } = useContext(CountContext);
	return (
		<div>
				<p>count : {count}</p>
				<button type="button" onClick={CountContext}>+</button>
		</div>
	)
}
```

# Context  단점

context는 Provider 설정한 value값이 바뀔때마다. 해당 Context를 접근하여 쓰고 있다면 자기가 참조하고 있는 값이 바뀐것이 아니더라도 Re rendering 되는 현상이 벌어진다 한개의 커다란 store, 즉 한 개으의 커다란 context를 만들어 두고 사용하게 되면 앱이 커지게 될수록 불필요한 리소스 낭비가 일어날 수 있다

## 해결방안

[Preventing rerenders with React.memo and useContext hook. · Issue #15156 · facebook/react](https://github.com/facebook/react/issues/15156#issuecomment-474590693)

### 1. split context

A와 B 컴포넌트가 있을 때 사용하는 context를 따로 나누어서 사용한다, 일반적으로 같이 사용되는 feature들 끼리 묶고, 다른 목적의 feature들을 나누어서 사용한다

### 2. `memo` 사용하기

같은 Context를 사용하지만, state를 사용하는 코드를 따로 때내어 memo()로 감싸준다

- 1번보다는 직관적이지 않고 불필요한 코드가 많아 질 수 있다

### 3. `useMemo` 사용하기

2번과 사용하는 방식이 비슷하고 비슷한 문제가 생긴다