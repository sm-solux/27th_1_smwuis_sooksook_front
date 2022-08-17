
const CheckBox=(item)=>{
    return(
      
        <input type="checkbox" checked={item.check} disabled={item.disable} onChange={item.getCheck}/>
       
    );
};

export default CheckBox;