# 6장 컴포넌트 반복
- 반복적인 내용을 효율적으로 보여 주고 관리하는 방법

# 6.1. 자바스크립트 배열의 Map() 함수
- map 함수 : 반복되는 컴포넌트를 렌더링할 수 있다.
  + 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는 규칙에 따라 변환한 후 그 결과로 새로운 배열을 생성한다.

## 6.1.1. 문법
- `arr.amp(callback, [thisArg])`
  + `callback` : 새로운 배열의 요소를 생성하는 함수
    * `currentValue` : 현재 처리하고 있는 요소
    * `index` : 현재 처리하고 있는 요소의 Index 값
    * `array` : 현재 처리하고 있는 원본 배열
  + `thisArg`(선택 항목) : callback 함수 내부에서 사용할 this 레퍼런스
 
## 6.1.2. 예제
```js
var numbers = [1, 2, 3, 4, 5]

var processed = numbers.map(function(num) {
  return num * num;
});

console.log(processed);
```

```js
/* ES6 : const, 화살표 함수 사용*/
const numbers = [1, 2, 3, 4, 5];
const result = numbers.map(num => num * num);
console.log(result);
```

# 6.2. 데이터 배열을 컴포넌트 배열로 변환하기
```js
const IterationSample = () => {
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map(name => <li>{name}</li>);
    return <ul>{nameList}</ul>;
};

export default IterationSample;
```


# 6.3. key
- key : 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용
  + key가 있어서 이를 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아낼 수 있음.

## 6.3.1. key 설정
- key 값은 언제나 유일해야 함. 따라서 데이터가 가진 고윳값을 key 값으로 설정해야 함.
  + 고유 번호가 없을시에는 Map 함수에 전달되는 콜백 함수의 인수인 Index 값을 사용하면 됨. (다만 index를 key로 사용하면 배열이 변경될 때 효율적으로 리렌더링하지 못함.)
```js
const IterationSample = () => {
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map((name, index) => <li key={index}>{name}</li>);
    return <ul>{nameList}</ul>;
};

export default IterationSample;
```


# 6.4. 응용
- 동적인 배열을 렌더링하는 방법과 고윳값을 만드는 방법 알아보기.
  
## 6.4.1. 초기 상태 설정하기
- userState 사용
  + 1. 데이터 배열
  + 2. 텍스트를 입력할 수 있는 input의 상태
  + 3. 데이터 배열에서 새로운 항목을 추가할 때 사용할 고유 id를 위한 상태
- 객체(문자열과 고유 id값) 형태로 이루어진 배열 만들기
```js
import { useState } from "react";

const IterationSample = () => {
    // 1. 데이터 배열
    const [names, setNames] = useState([
        { id: 1, text: '눈사람' },
        { id: 2, text: '얼음' },
        { id: 3, text: '눈' },
        { id: 4, text: '바람' }
    ]);
    // 2. 텍스트를 입력할 수 있는 input의 상태
    const [inputText, setInputText] = useState('');
    // 3. 데이터 배열에서 새로운 항목을 추가할 때 사용할 고유 id를 위한 상태
    const [nextId, setNextId] = useState(5);

    const nameList = names.map(name => <li key={name.id}>{name.text}</li>);
    return <ul>{nameList}</ul>;
};

export default IterationSample;  
```

## 6.4.2. 데이터 추가 기능 구현하기
```js
import { useState } from "react";

const IterationSample = () => {
    // 1. 데이터 배열
    const [names, setNames] = useState([
        { id: 1, text: '눈사람' },
        { id: 2, text: '얼음' },
        { id: 3, text: '눈' },
        { id: 4, text: '바람' }
    ]);
    // 2. 텍스트를 입력할 수 있는 input의 상태
    const [inputText, setInputText] = useState('');
    // 3. 데이터 배열에서 새로운 항목을 추가할 때 사용할 고유 id를 위한 상태
    const [nextId, setNextId] = useState(5);


    const onChange = e => setInputText(e.target.value);
    const onClick = () => {
        const nextNames = names.concat({
            id: nextId, // nextId 값을 id로 설정하고
            text: inputText
        });
        setNextId(nextId + 1); // nextId 값에 1을 더해 준다.
        setNames(nextNames); // names 값을 업데이트한다.
        setInputText(''); // inputText를 비운다.
    }

    const nameList = names.map(name => <li key={name.id}>{name.text}</li>);
    return (
        <>
            <input value={inputText} onChange={onChange} />
            <button onClick={onClick}>추가</button>
            <ul>{nameList}</ul>
        </>
    );
};

export default IterationSample;
```
- 새로운 이름을 등록할 수 있는 기능 구현.
- 배열에 새 항목을 추가할 때 배열의 Push 함수를 사용하지 않고 concat를 사용함.
  + push : 기존 배열 자체를 변경.
  + concat : 새로운 배열을 만들어 줌.
  + 리액트에서 상태를 업데이트할 때는 기존 상태를 그대로 두면서 새로운 값을 상태로 설정해야 함. (불변성 유지)
    * 리액트 컴포넌트의 성능을 최적화하기 위해 유지해야 함.
   
    
## 6.4.3. 데이터 제거 기능 구현하기
- 불변성을 유지하면서 배열의 특정 항목을 지우기 위해 배열 내장 함수 filter를 사용함.
  + 인자에 분류하고 싶은 조건을 반환하는 함수를 넣어 주면, 만족하는 원소들만 쉽게 분류할 수 있음.
  + ```js
    const numbers = [1, 2, 3, 4, 5, 6];
    const biggerThanThree = numbers.filter(number => number > 3);
    // 결과 : [4, 5, 6]

    const numbers = [1, 2, 3, 4, 5, 6];
    const biggerThanThree = numbers.filter(number => number !== 3);
    // 결과 : [1, 2, 4, 5, 6]
    ```


# 6.5. 정리
- 반복되는 데이터를 렌더링하는 방법을 배움
  + 응용하여 유동적인 배열을 다룸
- 컴포넌트 배열을 렌더링할 때는 key 값 설정에 항상 주의해야 함.
  + key 값은 언제나 유일해야 함. key 값이 중복된다면 렌더링 과정에서 오류가 발생함.
- 상태 안에서 배열을 변형할 때는 배열에 직접 접근하여 수정하는 것이 아니라 concat, filter 등의 배열 내장 함수를 사용하여 새로운 배열을 만든 후 이를 새로운 상태로 설정해 주어야 함.



