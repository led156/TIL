import React, { Component } from 'react';

class Counter extends Component {
    state = {
        number: 0,
        fixedNumber: 0
    };
    render() {
        const { number, fixedNumber } = this.state; // state 를 조회 할 때에는 this.state 로 조회합니다.
        return (
            <div>
                <h1>{number}</h1>
                <h1>바뀌지 않음 : {fixedNumber}</h1>
                <button
                // onClick 을 통하여 버튼이 클릭됐을 때 호출 할 함수를 지정합니다.
                onClick={() => {
                    // this.setState를 사용하여 state에 새로운 값을 넣을 수 있습니다.
                    this.setState(
                    {
                        number: number + 1
                    },
                    () => {
                        console.log('방금 setState 가 호출되었습니다.');
                        console.log(this.state);
                    }
                );
            }}
            >
                +1
            </button>
        </div>
        );
    }
}

export default Counter;