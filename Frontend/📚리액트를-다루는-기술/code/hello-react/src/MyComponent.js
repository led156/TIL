const MyComponent = ({ name, children }) => {

    /* const { name, children } = props; */

    return (
        <div>
            나의 새롭고 멋진 {name} <br />
            chileren 값은 {children} 입니다.
        </div>
    );
};

/* props 기본값 설정 */
MyComponent.defaultProps = {
    name: '기본 이름'
};

export default MyComponent;