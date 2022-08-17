import styled from "styled-components";
import "../../fonts/Font.css";

const ButtonBox = styled.div`
    text-align:right;
    margin-right:${(props) => props.mgRight};
    vertical-align:middle;
    font-family:"DoHyeon";
    margin-bottom:5px;
`;

export default ButtonBox;