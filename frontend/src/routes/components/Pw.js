import "antd/dist/antd.css";
import { Form, Input } from "antd";

const Pw = (item) => {
    const onChange = (e) => {
        item.getPw(e.target.value);
    }
    return (
        <Form.Item
            name="password"
            label="PW"
            rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
        >
            <Input.Password value={item.value} onChange={onChange} />
        </Form.Item>
    );
};

export default Pw;