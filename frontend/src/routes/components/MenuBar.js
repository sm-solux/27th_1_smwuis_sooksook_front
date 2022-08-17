import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import Root from "./Root";
import "../../fonts/Font.css";

const Box = styled.ul`
    color: #0652a1;
    width: 200px;
    height: 240px;
    height: auto;
    font-family: "DoHyeon";
    font-size: 20px;
    display: ${(props) => props.dp};
    position: absolute;
    background-color: #ffffff;
    border-radius: 5px;
    border: 2px solid #e0f7fa;
    top: 110px;
    left: 25px;
    z-index: 1;
`;
const List = styled.li`
    width: 200px;
    height: 40px;
    text-align: center;
    border-bottom: thin solid #c1daff;
    z-index: 1;
    padding-top: 10px;
    border-radius: 5px;
`;
const MenuBar = () => {
    return (
        <Root>
            <GlobalStyle />
            <Box>
                <List>
                    <Link to="/board1">강의 스터디</Link>
                </List>

                <List>
                    <Link to="/board2">강의 외 스터디</Link>
                </List>

                <List>
                    <Link to="/share">자료 공유</Link>
                </List>

                <List>
                    <Link to="/sell">판매/나눔</Link>
                </List>

                <List>
                    <Link to="/Qaboard">질문 게시판</Link>
                </List>
            </Box>
        </Root>
    );
};

export default MenuBar;
