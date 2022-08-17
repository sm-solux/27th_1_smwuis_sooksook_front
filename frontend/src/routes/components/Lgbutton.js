import { Button } from "antd";
import "antd/dist/antd.css";
import "../../css/join.css";

const Lgbutton = (props) => {
    return (
        <Button className="joinbutton" type="primary" htmlType="submit">
            {props.children}
        </Button>
    );
};

export default Lgbutton;
