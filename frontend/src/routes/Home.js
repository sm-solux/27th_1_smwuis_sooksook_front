import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./components/GlobalStyle";
import Root from "./components/Root";
import ColorBox from "./components/ColorBox";
import Logo from "./components/Logo";
import "../fonts/Font.css";
import TitleImg from "../images/title.png";
import study from "../images/study.png";
import study2 from "../images/study2.png";
import sale from "../images/sale.png";
import quest from "../images/quest.png";
import share from "../images/share.png";

const Title = styled.div`
    width: 660px;
    display: flex;
    justify-content: center;
    margin-top: ${(props) => props.mgTop};
    font-size: ${(props) => props.ftSize};
    color: #ffffff;
    font-family: "Cafe24";
    position: absolute;
    top: ${(props) => props.top};
    @media screen and (max-width: 660px) {
        font-size: 30px;
    }
    @media screen and (max-width: 500px) {
        font-size: 23px;
    }
`;
const SubTitle = styled(Title)`
    @media screen and (max-width: 660px) {
        font-size: 15px;
    }
    @media screen and (max-width: 500px) {
        font-size: 12px;
    }
`;
const Img = styled.img`
    width: 40px;
    height: 40px;
    @media screen and (max-width: 660px) {
        width: 30px;
        height: 30px;
    }
    @media screen and (max-width: 500px) {
        width: 23px;
        height: 23px;
    }
`;
const MenuBox = styled.ul`
    display: flex;
    justify-content: center;
    width: 100%;
    heigth: 200px;
    margin-top: 50px;
    @media screen and (max-width: 700px) {
        flex-wrap: wrap;
    }
`;
const MenuBoxChild = styled.li`
    display: flex;
    flex-direction: column;
    margin: 10px 30px 10px 30px;

    @media screen and (max-width: 700px) {
        flex: 1 1 40%;
    }
`;
const MenuImg = styled.img`
    width: 50px;
    height: 50px;
    text-align: center;
    display: block;
    margin: auto;
    &:hover {
        width: 60px;
        height: 60px;
    }
`;
const MenuText = styled.div`
    width: 80px;
    font-size: 15px;
    color: #2558b5;
    margin-top: 5px;
    text-align: center;
    font-family: "DoHyeon";
`;
const StudyBox = styled.div`
    display: flex;
    justify-content: center;
    width: auto;
    height: auto;
    margin: 40px 20px 40px 20px;
    background-color: #e8eef4;
    border-radius: 60px;
    @media screen and (max-width: 820px) {
        flex-wrap: wrap;
    }
`;

const StudyBoxChild = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 70px 20px;
    justify-content: center;
    align-items: center;
    font-family: "DoHyeon";
    color: #003a71;
    @media screen and (max-width: 820px) {
        flex: 1 1 100%;
    }
`;
const StudyListTitle = styled.div`
    width: 155px;
    font-size: 20px;
    text-align: center;
`;
const StudyListBox = styled.ul`
    height: auto;
    margin-top: 5px;
    text-align: left;
`;
const StudyList = styled.li`
    font-size: 15px;
    text-align: left;
`;
const HotStudy = () => {
    const [hotStudyList, setHotStudyList] = React.useState([]);
    React.useEffect(() => {
        axios
            .get("https://sooksook.herokuapp.com/studyBoard/famous")
            .then((response) => {
                setHotStudyList(response.data);
            });
    }, []);
    return hotStudyList.map((study, index) => (
        study.lecture==="강의 스터디"?
        <StudyList key={index}>
            {index + 1}위 <Link to={`/enterboard/${study.studyBoardId}`} >{study.title}</Link>
        </StudyList>
        :
        <StudyList key={index}>
            {index + 1}위 <Link to={`/enterboard2/${study.studyBoardId}`} >{study.title}</Link>
        </StudyList>
    ));
};

const NewStudy = () => {
    const [newStudyList, setNewStudyList] = React.useState([]);
    React.useEffect(() => {
        axios
            .get("https://sooksook.herokuapp.com/studyBoard/famous")
            .then((response) => {
                setNewStudyList(response.data);
            });
    }, []);
    return newStudyList.map((study) => 
    study.lecture==="강의 스터디"?
    <StudyList>∘<Link to={`/enterboard/${study.studyBoardId}`}
    >&nbsp;{study.title}</Link></StudyList>
    :
    <StudyList>∘<Link to={`/enterboard2/${study.studyBoardId}`}
    >&nbsp;{study.title}</Link></StudyList>
    );
};

const HighStudy = () => {
    const [highStudyList, setHighStudyList] = React.useState([]);
    React.useEffect(() => {
        axios.get("https://sooksook.herokuapp.com/studyBoard/hard").then((response) => {
            setHighStudyList(response.data);
        });
    }, []);
    return highStudyList.map((study, index) => (
        study.lecture==="강의 스터디"?
        <StudyList key={index}>
            {index + 1}위
            <Link to={`/enterboard/${study.studyBoardId}`}>&nbsp;{study.title}</Link>
        </StudyList>
        :
        <StudyList key={index}>
            {index + 1}위
            <Link to={`/enterboard2/${study.studyBoardId}`}>&nbsp;{study.title}</Link>
        </StudyList>
    ));
};

function Home() {
    return (
        <Root jc="center">
            <GlobalStyle />
            <Logo />
            <ColorBox height="300px" jc="center">
                <Title mgTop="110px" ftSize="40px">
                    숙명인들과 함께 쑥쑥 자라나는 공간
                    <Img src={TitleImg} />
                </Title>
                <SubTitle mgTop="15px" ftSize="20px" top="160px">
                    숙명인들과 함께 스터디로 자라나보세요
                </SubTitle>
            </ColorBox>
            <MenuBox>
                <Link to="/board1">
                    <MenuBoxChild>
                        <MenuImg src={study} />
                        <MenuText>강의 스터디</MenuText>
                    </MenuBoxChild>
                </Link>
                <Link to="/board2">
                    <MenuBoxChild>
                        <MenuImg src={study2} />
                        <MenuText>강의 외 스터디</MenuText>
                    </MenuBoxChild>
                </Link>
                <Link to="/share">
                    <MenuBoxChild>
                        <MenuImg src={share} />
                        <MenuText>자료 공유</MenuText>
                    </MenuBoxChild>
                </Link>
                <Link to="/sell">
                    <MenuBoxChild>
                        <MenuImg src={sale} />
                        <MenuText>판매/나눔</MenuText>
                    </MenuBoxChild>
                </Link>
                <Link to="/qaboard">
                    <MenuBoxChild>
                        <MenuImg src={quest} />
                        <MenuText>질문</MenuText>
                    </MenuBoxChild>
                </Link>
            </MenuBox>
            <StudyBox>
                <StudyBoxChild>
                    <StudyListTitle>인기 스터디</StudyListTitle>
                    <StudyListBox>
                        <HotStudy />
                    </StudyListBox>
                </StudyBoxChild>
                <StudyBoxChild>
                    <StudyListTitle>새로운 스터디 NEW!</StudyListTitle>
                    <StudyListBox>
                        <NewStudy />
                    </StudyListBox>
                </StudyBoxChild>
                <StudyBoxChild>
                    <StudyListTitle>참여도 높은 스터디</StudyListTitle>
                    <StudyListBox>
                        <HighStudy />
                    </StudyListBox>
                </StudyBoxChild>
            </StudyBox>
        </Root>
    );
}
export default Home;
