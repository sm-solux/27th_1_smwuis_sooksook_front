import React, { useEffect } from "react";
import styled from "styled-components";
import List from "./List";
import Box from "./Box";
import ListText from "./ListText";
import x from "../../images/x.png";
import axios from 'axios';

const XImg = styled.img`
    width: 30px;
    height: 30px;
    display: block;
    vertical-align: center;
    &:hover {
        width: 32px;
        height: 32px;
    }
`;

const StudySchedule = ({ handleXclick, id, date, content, finish, email,getAllSchedule }) => {
    const [check,setCheck]=React.useState();
    useEffect(()=>{
        setCheck(finish);
    },[finish]);
     //체크 수정 함수
     const getCheck = async () => {
        const res = await axios.put(
            `https://sooksook.herokuapp.com/userSchedule/check?email=${email}&id=${id}`
        );
    };
    const onChange=async(e)=>{
        setCheck(e.target.value);
        await getCheck();
        getAllSchedule();

    }
    return (
        <List>
            <Box left="50px" top="13px">

                <input type="checkbox" checked={check} onChange={onChange} />
              
            </Box>
            <Box left="70px" top="13px">
                <ListText>{date.substr(0, 10)}</ListText>
            </Box>
            <Box left="230px">
                <ListText>{content}</ListText>
            </Box>
            <Box right="20px">
                <XImg src={x} onClick={() => handleXclick(email, id)}></XImg>
            </Box>
        </List>
    );
};

export default StudySchedule;
