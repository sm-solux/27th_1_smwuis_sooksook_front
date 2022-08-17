import "antd/dist/antd.css";
import { Form, Input } from "antd";

const Id = (item) => {
    const onChange = (e) => {
        item.getId(e.target.value);
    }
    return (
        <Form.Item
            name="loginId"
            label="ID"
            rules={[{ required: true, message: "아이디를 입력해 주세요" }]}
        >
            <Input value={item.value} onChange={onChange} />
        </Form.Item>
    );
};

export default Id;
