import "../css/login.css";
import React from "react";
import { Form } from "antd";
import GlobalStyle from "./components/GlobalStyle";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import Logo from "./components/Logo.js";
import Block from "./components/Block.js";
import Header from "./components/Header.js";
import Id from "./components/Id.js";
import Pw from "./components/Pw.js";
import Lgbutton from "./components/Lgbutton.js";
import axios from "axios";
import { INPUT_VALUE } from "./redux/login/types";
import store from "./redux/store";
const Login = () => {
    const navigate = useNavigate();
    let id = "";
    let pw = "";
    const getId = (text) => {
        id = text;
    };
    const getPw = (text) => {
        pw = text;
    };

    const onFinish = (e) => {
        axios
            .get("https://sooksook.herokuapp.com/user", {
                params: {
                    loginId: id,
                    password: pw,
                },
                validateStatus: function (status) {
                    return status === 500 || status === 200;
                }
            })
            .then((response) => {
                if (response.status === 500) {
                    alert("아이디 또는 비밀번호를 확인하세요");
                } else {

                    id = response.data.loginId;
                    pw = response.data.password;
                    store.dispatch({
                        type: INPUT_VALUE,
                        loginId: id,
                        password: pw,
                        isLogin: true,
                        email: response.data.email
                    });
                    navigate("/");
                }
            })


    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <GlobalStyle />
            <Logo />
            <Block />
            <div className="aclogin">
                <Header text="로그인" />
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
                    <Lgbutton>로그인</Lgbutton>
                </Form>
            </div>
        </>
    );
};

export default Login;
