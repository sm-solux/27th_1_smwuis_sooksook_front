import styled from "styled-components";

const ColorBox=styled.div`
  width:100%;
  height:${(props)=>props.height};
  background-color:#C1DAFF;
  position:relative;
  font-family:"DoHyeon";
  display:flex;
  justify-content:${(props)=>props.jc}
`;

export default ColorBox;