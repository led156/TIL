const MyComponent = (props) => {
    return (
    <div>나의 새롭고 멋진 {props.name} <br />
    chileren 값은 {props.children} 입니다.
    </div>)
    ;
};

/* props 기본값 설정 */
MyComponent.defaultProps = {
    name: '기본 이름'
};

export default MyComponent;