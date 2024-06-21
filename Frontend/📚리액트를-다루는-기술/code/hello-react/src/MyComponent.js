import PropsTypes from 'prop-types'

const MyComponent = ({ name = '기본 이름', favoriteNumber, children }) => {

    /* const { name, children } = props; */

    return (
        <div>
            나의 새롭고 멋진 {name} <br />
            chileren 값은 {children} 입니다. <br />
            제가 좋아하는 숫자는 {favoriteNumber} 입니다.
        </div>
    );
};

/* propsType 설정 */
MyComponent.PropsTypes = {
    name: PropsTypes.string,
    favoriteNumber: PropsTypes.number.isRequired
};

/* props 기본값 설정 */
// MyComponent.defaultProps = {
//     name: '기본 이름'
// };



export default MyComponent;