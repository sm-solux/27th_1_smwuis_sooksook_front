import styled from "styled-components";

const InputBox = styled.div`
    position: relative;
    display: flex;
    justify-content: left;
    width: 344px;
    height: 50px;
    margin-bottom: ${(props) => props.mgBot};
    padding-left:${(props)=>props.pLeft};
    
`;

export default InputBox;
