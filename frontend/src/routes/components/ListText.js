import styled from "styled-components";

const ListText=styled.div`
    font-size:15px;
    display:flex;
    justilfy-content:center;
    align-items:center;
    margin-left:10px;
    margin-right:10px;
    width:${(props)=>props.width};
`;

export default ListText;
