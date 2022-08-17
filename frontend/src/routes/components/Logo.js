import { Link } from "react-router-dom";
import "../../css/board1.css";
import React, { useEffect, useRef } from "react";
import { Input, AutoComplete } from "antd";
import "antd/dist/antd.css";
import MenuBar from "./MenuBar";
import logo from "../../images/logo.png";
import "../../fonts/Font.css";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { INPUT_VALUE } from "../redux/login/types";
import axios from "axios";

const Top = (props) => {
    return <h2 className="topright">{props.children}</h2>;
};
const Login = () => {
    const isLogin = useSelector((state) => state.isLogin);

    const handleLogoutClick = () => {
        store.dispatch({
            type: INPUT_VALUE,
            loginId: "",
            password: "",
            isLogin: false,
            email: "",
        });
    };
    if (isLogin) {
        return (
            <>
                <Top>
                    <Link to="/mypage">마이페이지</Link>
                </Top>
                <Top>
                    <div onClick={handleLogoutClick}>로그아웃</div>
                </Top>
            </>
        );
    } else {
        return (
            <Top>
                <Link to="/login">로그인</Link>
            </Top>
        );
    }
};

const Logo = () => {
    const [show, setShow] = React.useState(false);
    const handleLogoImgClick = () => {
        if (show === false) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    let title = useRef([]);
    const [options, setOptions] = React.useState([]);
    const searchResult = (value) => {
        const getKeyword = async () => {
            const res = await axios.get(
                "https://sooksook.herokuapp.com/studyBoard/search",
                {
                    params: {
                        keyword: value,
                    },
                }
            );
            title.current = res.data;
        };
        getKeyword();
        let url = "";

        title.current.map((item) => {
            if (item.studyBoardId == null) {
                switch (item.category) {
                    case "판매/나눔 게시글":
                        console.log("판매나눔");
                        url = `/detailsell/${item.studyPostId}`;
                        setOptions((prev) => [
                            ...prev,
                            {
                                value: url,
                                label: (
                                    <Link
                                        to={url}
                                        state={{ boardId: item.studyPostId }}
                                    >
                                        {item.category}: {item.title}
                                    </Link>
                                ),
                            },
                        ]);
                        return;
                    case "자료 공유 게시글":
                        console.log("자료공유");
                        url = `/detailshare/${item.studyPostId}`;
                        setOptions((prev) => [
                            ...prev,
                            {
                                value: url,
                                label: (
                                    <Link
                                        to={url}
                                        state={{ boardId: item.studyPostId }}
                                    >
                                        {item.category}: {item.title}
                                    </Link>
                                ),
                            },
                        ]);
                        return;
                    case "질문 게시글":
                        console.log("질문");
                        url = `/detailqa/${item.studyPostId}`;
                        setOptions((prev) => [
                            ...prev,
                            {
                                value: url,
                                label: (
                                    <Link
                                        to={url}
                                        state={{ boardId: item.studyPostId }}
                                    >
                                        {item.category}: {item.title}
                                    </Link>
                                ),
                            },
                        ]);
                        return;
                };
            } else {
                switch (item.category) {
                    case "강의 스터디":
                        console.log("강의");
                        url = `/enterboard/${item.studyBoardId}`;
                        setOptions((prev) => [
                            ...prev,
                            {
                                value: url,
                                label: (
                                    <Link
                                        to={url}
                                        state={{ boardId: item.studyBoardId }}
                                    >
                                        {item.category}: {item.title}
                                    </Link>
                                ),
                            },
                        ]);
                        return;
                    case "강의 외 스터디":
                        console.log("강의 외");
                        url = `/enterboard2/${item.studyBoardId}`;
                        setOptions((prev) => [
                            ...prev,
                            {
                                value: url,
                                label: (
                                    <Link
                                        to={url}
                                        state={{ boardId: item.studyBoardId }}
                                    >
                                        {item.category}: {item.title}
                                    </Link>
                                ),
                            },
                        ]);
                        return;
                };
            }
        });
    };

    const handleSearch = (value) => {
        searchResult(value);
    };

    const onSelect = (value) => {
        setOptions([]);
        console.log("onSelect", value);
    };
    return (
        <section className="logo" style={{ display: "flex" }}>
            <div className="title">
                {show && <MenuBar style={{ float: "left" }} />}
                <img src={logo} alt="logo" onClick={handleLogoImgClick} />
                <div className="name" style={{ fontFamily: "Titillium" }}>
                    <Link to="/">SookSook</Link>
                </div>
            </div>
            <div className="search" style={{ width: "500px" }}>
                <AutoComplete
                    dropdownMatchSelectWidth={252}
                    style={{
                        width: 300,
                    }}
                    options={options}
                    onSelect={onSelect}
                    onSearch={handleSearch}
                >
                    <Input.Search size="large" enterButton />
                </AutoComplete>
            </div>

            <div className="customer" style={{ fontFamily: "DoHyeon" }}>
                <Login />
                <Top>
                    <a
                        href="https://forms.gle/5aDqADeFdQCeHdu49"
                        target="_blank"
                    >
                        고객센터
                    </a>
                </Top>
            </div>
        </section>
    );
};

export default Logo;
