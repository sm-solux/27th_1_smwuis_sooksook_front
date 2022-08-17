import { Input } from 'antd';
const { TextArea } = Input;

const InputArea = (item) => {
    const onChange = (e) => {
        item.getArea(e.target.value);
    }
    return (
        <TextArea value={item.value} rows={4} placeholder={item.area} disabled={item.disable} onChange={onChange} style={{ "border-radius": "20px", "background-color": item.bg }} />
    );
}

export default InputArea;