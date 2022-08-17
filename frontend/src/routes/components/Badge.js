import styled from "styled-components";

const Badge=styled.div`
    border: thin solid #e8eef4;
    border-radius:30px;
    background-color:${(props)=>props.rnd};
    width:150px;
    height:25px;
    text-align:center;
    padding-top:5px;
    margin-left:${(props)=>props.mgLeft};
    margin-bottom:${(props)=>props.mgBot};
`;

export default Badge;