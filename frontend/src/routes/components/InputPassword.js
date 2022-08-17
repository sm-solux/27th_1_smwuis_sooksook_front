import { Input, Space } from "antd";
const InputPassword = (item) => {
    const onChange=(e)=>{
        item.getPw(e.target.value);
    }
    return (
        <Input.Password
            onChange={onChange}
            placeholder="입력하세요"
            style={{ "border-radius": "70px" }}
        />
    );
};

export default InputPassword;
