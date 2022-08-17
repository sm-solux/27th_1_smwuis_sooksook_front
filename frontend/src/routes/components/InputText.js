import React from 'react';
import { Input } from "antd";
const InputText = (item) => {

    const onChange=(e)=>{
        item.getText(e.target.value);
    }
   
    return (
  
            <Input value={item.value} onChange={onChange} placeholder={item.text} style={{"background-color":item.bg, "border-radius":"70px" ,"margin-top":item.mgTop,"margin-left":item.mgLeft}} disabled={item.disable}/>
     
    );
}
export default InputText;
