import "../../css/board1.css";
import { Link } from "react-router-dom";

const Cstudy2 = () => {
    return (
        <button className="newstudy" style={{ marginLeft: "0px" }}>
            <Link to="/openstudy2">스터디 개설</Link>
        </button>
    );
};

export default Cstudy2;
