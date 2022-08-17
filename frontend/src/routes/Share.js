import "../css/share.css";
import { Table } from "antd";
import GlobalStyle from "./components/GlobalStyle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import Logo from "./components/Logo.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Shareblock = () => {
    return (
        <section className="block">
            <button className="share">자료공유 게시판</button>
            <Cwrite />
        </section>
    );
};

const Cwrite = () => {
    return (
        <section>
            <button className="newstudy" style={{ marginLeft: "0px" }}>
                <Link to="/setboard_share">글 작성하기</Link>
            </button>
        </section>
    );
};

const Share = () => {
    const location = useLocation().key;
    //게시글 아이디 리스트 받아오는 함수
    const getId = async () => {
        const response = await axios.get(
            "https://sooksook.herokuapp.com/studyPosts/category?category=%EC%9E%90%EB%A3%8C%20%EA%B3%B5%EC%9C%A0%20%EA%B2%8C%EC%8B%9C%EA%B8%80"
        );
        setId(() => response.data);
    };
    const getData = () => {
        (id || []).reduce((prev, cur) => {
            return prev.then(async () => {
                await axios
                    .get(
                        `https://sooksook.herokuapp.com/studyPost/info?id=${cur}`
                    )
                    .then((res) => {
                        setData((prev) => [...prev, res.data]);
                    });
            });
        }, Promise.resolve());
    };

    const [data, setData] = useState([]);
    const [id, setId] = useState([]);
    React.useEffect(() => {
        getId();

        console.log(location);
    }, [location]);

    React.useEffect(() => {
        getData();
    }, [id]);

    const columns = [
        {
            title: <div className="studyname">제목</div>,
            dataIndex: "title",
            key: "title",
            render: (text, record, index) => (
                <Link
                    to={`/detailshare/${id[index]}`}
                    state={{ boardId: id[index] }}
                >
                    {text}
                </Link>
            ),
        },

        {
            title: <div className="user">작성자</div>,
            dataIndex: "nickname",
            key: "key",
        },
    ];

    return (
        <>
            <GlobalStyle />
            <Logo />
            <Shareblock />
            <section className="table">
                <Table columns={columns} dataSource={data} />
            </section>
        </>
    );
};

export default Share;
