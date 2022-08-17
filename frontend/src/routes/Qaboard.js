import "../css/qacss.css";
import { Table } from "antd";
import { Link, useLocation } from 'react-router-dom';
import GlobalStyle from "./components/GlobalStyle";
import "antd/dist/antd.css";
import Logo from "./components/Logo.js";
import React, { useState } from "react";
import axios from "axios";

const Qablock = () => {
    return (
        <section className="block">
            <button className="qanda" >Q & A 게시판</button><Cwrite />
        </section>
    );
};


const Cwrite = () => {
    return (
        <section>
            <button className="newstudy" style={{ marginLeft: "0px" }}>
                <Link to="/setboard_qa">글 작성하기</Link></button>
        </section>
    );
};

const Qaboard = () => {
    const location = useLocation().key;
    const getId = async () => {
        const response = await axios.get(
            "https://sooksook.herokuapp.com/studyPosts/category?category=%EC%A7%88%EB%AC%B8%20%EA%B2%8C%EC%8B%9C%EA%B8%80"
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
    const { state } = useLocation();
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
                    to={`/detailqa/${id[index]}`}
                    state={{ boardId: id[index] }}
                >
                    {text}
                </Link>
            ),
        },

        {
            title: <div className="user">작성자</div>,
            dataIndex: "nickname",
            key: "nickname"
        }
    ];

    return (
        <>
            <GlobalStyle />
            <Logo />
            <Qablock />
            <section className="table">
                <Table columns={columns} dataSource={data} />
            </section>
        </>
    )
};

export default Qaboard;

