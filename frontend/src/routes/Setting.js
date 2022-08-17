import Logo from "./components/Logo";
import axios from "axios";
import styled from "styled-components";
import GlobalStyle from "./components/GlobalStyle";
import Root from "./components/Root";
import ColorBox from "./components/ColorBox";
import InputBox from "./components/InputBox";
import InputText from "./components/InputText";
import Box from "./components/Box";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useState } from "react";
import "../fonts/Font.css";
import { useSelector } from "react-redux";
import { Input, Space } from "antd";
import { INPUT_VALUE } from "./redux/login/types";
import store from "./redux/store";

const Title = styled.div`
    position: absolute;
    top: 30px;
    left: 100px;
    font-size: 36px;
    color: #ffffff;
    font-family: "Cafe24";
`;

const Main = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
    font-family: "DoHyeon";
`;

const Quest = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    font-size: 25px;
    align-items: center;
`;

const Setting = () => {
    const handleDeleteClick = (e) => {
        // 회원탈퇴
        if (window.confirm("정말로 탈퇴하시겠습니까?")) {
            axios
                .delete("https://sooksook.herokuapp.com/user", {
                    params: {
                        email: emailL,
                        id: id,
                    },
                })
                .then(() => {
                    alert("회원탈퇴가 완료되었습니다");
                    store.dispatch({
                        type: INPUT_VALUE,
                        loginId: "",
                        password: "",
                        isLogin: false,
                        email: "",
                    });
                    navigate("/");
                });
        }
    };

    const getPassword = (text) => {
        setPassword(text.target.value);
    };
    const getNewPassword = (text) => {
        setNewPassword(text.target.value);
    };
    const getNickname = (text) => {
        setNickname(text);
    };
    const getIntroduction = (text) => {
        setIntroduction(text);
    };

    const [nickname, setNickname] = React.useState("");
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [introduction, setIntroduction] = React.useState("");
    const navigate = useNavigate();
    const emailL = useSelector((state) => state.email);
    const [id, setId] = React.useState("");
    React.useEffect(() => {
        if (emailL === "") {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
        axios
            .get("https://sooksook.herokuapp.com/user/myInfo", {
                params: {
                    email: emailL,
                },
            })
            .then((response) => {
                setNickname(response.data.nickname);
                setIntroduction(response.data.introduction);
                setName(response.data.name);
                setId(response.data.id);
            });
    }, []);

    const handleUploadClick = () => {
        // 유저 정보 수정후 저장
        axios
            .put(`/user?id=${id}`, {
                email: emailL,
                introduction: introduction,
                nickname: nickname,
                name: name,
            })
            .then(setIsDisable(true));
    };

    const handlePasswordClick = () => {
        //비밀번호 수정
        axios
            .put(
                `/user/password?email=${emailL}&newPassword=${newPassword}&oldPassword=${password}`
            )
            .then(setIsPwDisable(true))
            .catch((err) => {
                alert("현재 비밀번호를 확인하세요");
            });
    };

    const [isPwDisable, setIsPwDisable] = React.useState(true);
    const [isDisable, setIsDisable] = React.useState(true);

    const handleModifyClick = () => {
        setIsDisable(false);
    };
    const handlePwModifyClick = () => {
        setIsPwDisable(false);
    };
    return (
        <Root>
            <GlobalStyle />
            <Logo />
            <ColorBox height="90px">
                <Title>정보수정</Title>
            </ColorBox>
            <Main>
                <InputBox>
                    <Quest>닉네임</Quest>
                    <Box width="200px" left="150px" top="7px">
                        <InputText
                            value={nickname}
                            disable={isDisable}
                            getText={getNickname}
                        />
                    </Box>
                </InputBox>

                <InputBox>
                    <Quest>한 줄 소개</Quest>
                    <Box width="200px" left="150px" top="7px">
                        <InputText
                            value={introduction}
                            disable={isDisable}
                            text="입력하세요"
                            getText={getIntroduction}
                        />
                    </Box>
                </InputBox>
                <ButtonBox>
                    {isDisable && (
                        <Button
                            width="100px"
                            mg="30px"
                            onClick={handleModifyClick}
                        >
                            수정
                        </Button>
                    )}
                    {!isDisable && (
                        <Button
                            width="100px"
                            mg="30px"
                            onClick={handleUploadClick}
                        >
                            저장
                        </Button>
                    )}
                </ButtonBox>
            </Main>
            <Main>
                <InputBox>
                    <Quest>현재 비밀번호</Quest>
                    <Box
                        width="200px"
                        left="150px"
                        disable={isDisable}
                        top="7px"
                    >
                        <Input.Password
                            value={password}
                            style={{ "border-radius": "70px" }}
                            disabled={isPwDisable}
                            onChange={getPassword}
                            placeholder="현재비밀번호를 입력하세요"
                        />
                    </Box>
                </InputBox>
                <InputBox>
                    <Quest>새 비밀번호</Quest>
                    <Box
                        width="200px"
                        left="150px"
                        disable={isDisable}
                        top="7px"
                    >
                        <Input.Password
                            value={newPassword}
                            style={{ "border-radius": "70px" }}
                            disabled={isPwDisable}
                            placeholder="새로운 비밀번호를 입력하세요"
                            onChange={getNewPassword}
                        />
                    </Box>
                </InputBox>
                <ButtonBox>
                    {isPwDisable && (
                        <Button
                            width="100px"
                            mg="30px"
                            onClick={handlePwModifyClick}
                        >
                            비밀번호 수정
                        </Button>
                    )}
                    {!isPwDisable && (
                        <Button
                            width="100px"
                            mg="30px"
                            onClick={handlePasswordClick}
                        >
                            비밀번호 저장
                        </Button>
                    )}
                    <Button width="100px" mg="30px" onClick={handleDeleteClick}>
                        회원탈퇴
                    </Button>
                </ButtonBox>
            </Main>
        </Root>
    );
};

export default Setting;
