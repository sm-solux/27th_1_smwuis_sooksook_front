import styled from "styled-components";
import List from "./List";
import ListText from "./ListText";
import Badge from "./Badge";
import star from "../../images/star.png";
import Button from "./Button";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams,Link } from "react-router-dom";

const StarImg = styled.img`
    width: 20px;
    height: 20px;
    margin: 5px;
`;
const GetBadge = ({ id }) => {
    const emailL = useSelector((state) => state.email);
    const [content, setContent] = React.useState("");

    const getRatingInfo = async (id) => {
        const res = await axios
            .get("https://sooksook.herokuapp.com/userRating/total", {
                params: {
                    email: emailL,
                    studyBoardId: String(id),
                },
            })
            .catch((err) => console.log(err));
        console.log(res);
        if (res != undefined) {
            setContent(JSON.parse(res.data.contents));
        } else {
            setContent(["평가가 없습니다"]);
        }
    };

    const RandomColor = () => {
        return "#" + Math.round(Math.random() * 0xffffff).toString(16);
    };

    React.useEffect(() => {
        getRatingInfo(id);
    }, [id]);

    return (
        content &&
        content.map((content) => {
            return (
                <Badge rnd={RandomColor} mgLeft="10px">
                    {content}
                </Badge>
            );
        })
    );
};

const GetScore = ({ id }) => {
    const emailL = useSelector((state) => state.email);
    const [score, setScore] = React.useState(" ");
    const getRatingInfo = async (id) => {
        const res = await axios
            .get("https://sooksook.herokuapp.com/userRating/total", {
                params: {
                    email: emailL,
                    studyBoardId: String(id),
                },
            })
            .catch((err) => console.log(err));
        console.log(res);
        if (res != undefined) {
            setScore(() => res.data.averageScore);
        } else {
            setScore("x.x");
        }
    };
    React.useEffect(() => {
        getRatingInfo(id);
    }, [id]);
    return `${score}/5`;
};

const StudyHistory = () => {
    const navigate = useNavigate();
    const {state}=useLocation();
    const { key } = useParams();
    //현재 로그인 중인 email 받기
    const emailL = useSelector((state) => state.email);
    //랜덤한 색깔

    //참여 스터디 조회
    const [studyHistoryList, setStudyHistory] = React.useState([]);
    const getMyStudy = async () => {
        const res = await axios.get(`/studyMember/myInfo?email=${emailL}`);
        setStudyHistory(res.data);
    };
    //스터디 평가 조회(스터디게시판 id) 함수

    React.useEffect(() => {
        getMyStudy();
    }, []);

    const handleGradeClick = (id) => {
  
            navigate(`/membergrade/${id}`);

    };
    return studyHistoryList.map((history, index) => {
        if (history.finished === false) {
            return (
                <List key={index}>
                    <ListText>
                        <ListText width="100px" style={{ flexShrink: 1 }}>
                            {history.lecture==="강의 스터디"?
                            <Link to={`/private/${history.id}`}>{history.title}</Link>
                            :
                            <Link to={`/private2/${history.id}`}>{history.title}</Link>}
                        </ListText>
                    </ListText>
                    <ListText>진행중</ListText>
                </List>
            );
        } else {
            return (
                <List key={index}>
                    <ListText style={{ flexBasis: "600px", flexShrink: 0 }}>
                        <ListText width="100px">{history.title}</ListText>
                        <GetBadge id={history.id} />
                    </ListText>
                    <ListText>
                    
                        <Button
                            height="30px"
                            onClick={() => handleGradeClick(history.id)}
                        >
                            평가하기
                        </Button>
                      
                        <StarImg src={star} />
                        <GetScore id={history.id} />
                    </ListText>
                </List>
            );
        }
    });
};

export default StudyHistory;
