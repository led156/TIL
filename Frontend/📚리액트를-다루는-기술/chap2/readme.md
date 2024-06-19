# 2. JSX
# 2.1. 코드 이해하기
- `import` : 특정 파일을 불러오는 것. 브라우저가 아닌 환경에서 자바스크립트를 실행할 수 잇게 해 주는 환경에서 지원하는 기능.
- 이러한 기능을 브라우저에서도 사용하기 위해 번들러(bundler)를 사용함.
  + 웹팩, Parcel, browserify
  + 불러온 모듈을 모두 합쳐서 하나의 파일을 생성해 주고, 최적화 과정에서 여러 개의 파일로 분리할 수도 있음.
  ![image](https://github.com/led156/TIL/assets/67251510/db846aef-1815-4a49-86d0-0df2fa81f596)
- 파일들을 불러오는 것은 로더(loader)라는 기능이 담당함.
  + css-loader : CSS파일, file-loader : 웹 폰트/미디어 파일, babel-loader : 자바스크립트 파일을 불러오면서 바벨이라는 도구를 사용해 ES5 문법으로 변환해줌. (구 버전 웹 브라우저와 호환하기 위해서)
 
# 2.2. JSX란?
- JSX : 자바스크립트의 확장 문법
  + 브라우저에서 실행되기 전에 코드가 번들링되는 과정에서 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환됨.
  ```js
  /* JSX */
  function App() {
    return (
      <div>
        Hello <b>react</b>
      </div>
    );
  }
  
  /* JS */
  function App() {
    return React.createElement("div", null, "Hello ", React.createElement("b", null, "react"));
  }
  ```
 
# 2.3. JSX의 장점
## 2.3.1. 보기 쉽고 익숙하다

## 2.3.2. 더욱 높은 활용도
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
- `const root = ReactDOM.createRoot(document.getElementById('root'));` : id가 root인 HTML 요소를 찾고, 리액트 컴포넌트를 보여줄 수 있는 루트 인스턴스를 createRoot 함수를 사용해 생성.
- `root.render(...)` : JSX 코드를 인자로 넣어서 보여주고 싶은 컴포넌트를 화면에 보여줌.
- `React.StrictMode` 컴포넌트 : 레거시 기능을 사용할 때 경고를 주고, 미래 버전에 도입될 기능들이 정상적으로 호환될 수 있도록 유도하는 디버깅용 컴포넌트 (개발환경에서만 활성화)
- `reportWebVitals()` : 웹 성능을 측정하는 도구.

# 2.4. JSX 문법
## 2.4.1. 감싸인 요소
- 컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 한다.
- Vritual DOM에서 컴포넌트 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙이 있기 때문임.
- 따라서 div 또는 Fragment로 감싸주어야 함.
```js
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <h1>리액트 안녕!</h1>
      <h2>잘 작동하니?</h2>
    </Fragment>
  )
}
```

## 2.4.2. 자바스크립트 표현
- 자바스크립트 표현식을 작성하려면 JSX 내부에서 코드를 { }로 감싸면 됨.
```js
function App() {
  const name = '리액트';
  return (
    <>
      <h1>{name} 안녕!</h1>
      <h2>잘 작동하니?</h2>
    </>
  )
}
```
- const : 한번 지정하고 나면 변경이불가능한상수를 선언할 때 사용하는 키워드
- let : 동적인 값을 담을 수 있는 변수를 선언할 때 사용하는 키워드. 블록 단위의 scope
- var : 함수 단위의 scope를 가진 키워드

## 2.4.3. If 문 대신 조건부 연산자
- JSX 내부 자바스크립트 표현식에서 if 문을 사용할 수 없음.
- JSX 밖에서 If문을 사용하여 사전에 값을 설정하거나, {} 안에 조건부 연산자를 사용. (삼항 연산자)
```js
function App() {
  const name = '리액트';
  return (
    <>
      {name === '리액트' ? (
        <h1>리액트입니다.</h1>
      ) : (
        <h2>리액트가 아닙니다.</h2>
      )}
    </>
  )
}
```

## 2.4.4. AND 연산자(&&)를 사용한 조건부 렌더링
```js
function App() {
  const name = '리액트';
  return <>{name === '리액트' ? <h1>리액트입니다.</h1> : null}</>;
}

function App() {
  const name = '리액트';
  return <>{name === '리액트' && <h1>리액트입니다.</h1>}</>;
}
```


## 2.4.5. undefined를 렌더링하지 않기
- 컴포넌트 함수에서 undefined만 반환하여 렌더링하는 상황을 만들면 안 됨.
```js
function App() {
  const name = undefined;
  return <>{name || '리액트'}</>;
}
```

## 2.4.6. 인라인 스타일링
- DOM 요소에 스타일을 적용할 때는 문자열 형태로 넣는 것이 아닌, 객체 형태로 넣어 주어야 함.
  + background-color 를 카멜형식의 backgroundColor로 작성.
```js
function App() {
  const name = '리액트;
  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: '48px',
        fontWeight: 'bold',
        padding: 16
      }}
    >
      {name}
    </div>
  );
}
```

## 2.4.7. class 대신 className
```js
/* src/App.css */
.react {
  backgroundColor: 'black',
  color: 'aqua',
  fontSize: '48px',
  fontWeight: 'bold',
  padding: 16
}

/* src/App.js */
function App() {
  const name = '리액트;
  return <div className="react">{name}</div>;
}
```

## 2.4.8. 꼭 닫아야 하는 태그
- `<input></input>` 또는
- `<input />` : self-closing 태그 사용

## 2.4.9. 주석
- JSX 안에서 주석 작성 : `{/* ... */}`

# 2.5. ESLint와 Prettier 적용하기





