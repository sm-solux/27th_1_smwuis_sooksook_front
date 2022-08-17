import "../css/join.css";
import React, { useState } from "react";
import { Form, Input } from "antd";
import "antd/dist/antd.css";
import Logo from "./components/Logo.js";
import { Link, useNavigate } from "react-router-dom";
import Block from "./components/Block.js";
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header.js";
import Id from "./components/Id.js";
import Pw from "./components/Pw.js";
import Lgbutton from "./components/Lgbutton.js";
import axios from "axios";

const Join = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [nickname, setNickname] = useState("");
    const [name, setName] = useState("");
    const getId = (text) => {
        setId(text);
    };
    const getPw = (text) => {
        setPw(text);
    };
    const getEmail = (text) => {
        setEmail(text.target.value);
    };
    const getNickname = (text) => {
        setNickname(text.target.value);
    };
    const getName = (text) => {
        setName(text.target.value);
    };

    const onFinish = (e) => {
        axios
            .post("https://sooksook.herokuapp.com/user", {
                loginId: id,
                email: email,
                password: pw,
                nickname: nickname,
                name: name,
            })
            .then(() => {

                alert("회원가입이 완료되었습니다");
                navigate("/login");

            })
            .catch((error) => {
                if (error.response.status === 500) {
                    if (
                        error.response.data.message ===
                        "이미 가입되어 있는 유저입니다."
                    ) {
                        alert(error.response.data.message);
                    } else {
                        alert("이메일 또는 아이디가 이미 존재합니다.");
                    }
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <GlobalStyle />
            <Logo />
            <Block />
            <div className="join">
                <Header text="회원가입" />
                <Form
                    className="form"
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Id getId={getId} />
                    <Pw getPw={getPw} />
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[{ required: true }]}
                    >
                        <Input onChange={getEmail} />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="이름"
                        rules={[{ required: true }]}
                    >
                        <Input onChange={getName} />
                    </Form.Item>
                    <Form.Item
                        name="nickname"
                        label="닉네임"
                        rules={[{ required: true }]}
                    >
                        <Input onChange={getNickname} />
                    </Form.Item>

                    <Lgbutton>회원가입</Lgbutton>
                </Form>
            </div>
        </>
    );
};

export default Join;
