import "../../css/join.css";
import { Link } from 'react-router-dom';

const Block = () => {
    return (
        <section className="loginblock">
            <button className="login"><Link to="/login">로그인</Link></button>
            <button className="login"><Link to="/join">회원가입</Link></button>
        </section >
    );
};

export default Block;
