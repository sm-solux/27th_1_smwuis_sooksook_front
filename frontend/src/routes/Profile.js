import React from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./components/GlobalStyle";
import Root from "./components/Root";
import ColorBox from "./components/ColorBox";
import Logo from "./components/Logo";
import ListText from "./components/ListText";
import List from "./components/List";
import ListBox from "./components/ListBox";
import ListHeader from "./components/ListHeader";
import ListTitle from "./components/ListTitle";
import Box from "./components/Box";

import InputText from "./components/InputText";
import StudyHistory from "./components/StudyHistory";
import "../fonts/Font.css";
import profile from "../images/profile.png";
import snowflake from "../images/snowflake.png";
import Badge from "./components/Badge";
import star from "../images/star.png";
import { Progress } from "antd";

const StarImg = styled.img`
    width: 20px;
    height: 20px;
    margin: 5px;
`;
const ProfileImg = styled.img`
    width: 150px;
    height: 150px;
    position: absolute;
    top: 220px;
    left: 150px;
    z-index: 1;
    @media screen and (max-width: 460px) {
        left: 100px;
    }
`;
const SnowImg = styled.img`
    width: 70px;
    height: 70px;
    position: absolute;
    top: 200px;
    left: 130px;
    z-index: 2;
    @media screen and (max-width: 460px) {
        left: 80px;
    }
`;
const ProfileName = styled.div`
    width: 150px;
    color: #ffffff;
    font-family: "Dohyeon";
    font-size: 30px;
    position: absolute;
    top: 250px;
    left: 320px;
    @media screen and (max-width: 460px) {
        left: 270px;
    }
`;
const ProfileComment = styled.div`
    width: 660px;
    font-size: 15px;
    position: absolute;
    top: 320px;
    left: 320px;
    @media screen and (max-width: 460px) {
        left: 260px;
    }
`;
const Level = styled.div`
    margin: 100px 320px 70px 320px;
    height: 50px;
    @media screen and (max-width: 460px) {
        margin-left: 150px;
    }
`;
const LevelText = styled.div`
    width: 70px;
    font-size: 20px;
    font-family: "DoHyeon";
`;
const LevelGauge = styled.div`
    width: 100%;
    font-family: "DoHyeon";
`;

function Profile() {
    const [name, setName] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [level, setLevel] = React.useState("");
    const [point, setPoint] = React.useState(0);
    const { key } = useParams();
    console.log(key);
    const [studyHistoryList, setStudyHistory] = React.useState([]);
    const getMyStudy = async () => {
        const res = await axios.get(`/userRating/myInfo?email=${key}`);
        setStudyHistory(res.data);
    };
    React.useEffect(() => {
        axios
            .get("https://sooksook.herokuapp.com/user/myInfo", {
                params: {
                    email: key,
                },
            })
            .then((response) => {
                setName(response.data.nickname);
                setComment(response.data.introduction);
                setLevel(response.data.rating);
                setPoint(response.data.points);
            });
        getMyStudy();
    }, []);
    return (
        <Root>
            <GlobalStyle />
            <Logo />
            <ColorBox height="300px">
                <SnowImg src={snowflake} />
                <ProfileImg src={profile} />
                <ProfileName>{name}</ProfileName>
                <ProfileComment>{comment}</ProfileComment>
            </ColorBox>
            <Level>
                <LevelText>{level}</LevelText>
                <LevelGauge>
                    <Progress
                        percent={point}
                        format={(percent) => percent + "포인트"}
                    />
                </LevelGauge>
            </Level>

            <ListHeader>
                <ListTitle border="3px solid black">스터디 히스토리</ListTitle>
            </ListHeader>
            <ListBox>
                {studyHistoryList &&
                    studyHistoryList.map((history, index) => {
                        return (
                            <List key={index}>
                                <ListText
                                    style={{
                                        flexBasis: "600px",
                                        flexShrink: 0,
                                    }}
                                >
                                    {JSON.parse(history.contents).map(
                                        (item) => {
                                            return <Badge rnd="pink">{item}</Badge>;
                                        }
                                    )}
                                </ListText>
                                <ListText>
                                    <StarImg src={star} />
                                    {history.score}
                                </ListText>
                            </List>
                        );
                    })}
            </ListBox>
        </Root>
    );
}

export default Profile;
