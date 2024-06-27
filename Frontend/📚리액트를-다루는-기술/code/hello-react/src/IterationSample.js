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