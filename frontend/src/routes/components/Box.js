import styled from "styled-components";



const Box = styled.div`
    position: absolute;
    left: ${(props) => props.left};
    top: ${(props) => props.top};
    right: ${(props) => props.right};
    width:${(props) => props.width};
    height:${(props)=>props.height};
`;

export default Box;