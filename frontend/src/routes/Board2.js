import "../css/board2.css";
import React, { useState } from "react";
import { Link ,useLocation} from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import GlobalStyle from "./components/GlobalStyle";
import Logo from "./components/Logo.js";
import Cstudy2 from "./components/Cstudy2.js";
import Root from "./components/Root";
import axios from "axios";

const Select = styled.select`
    width: 100px;
    height: 32px;
    transition: 0.5s;
    border-color: #c1daff;
    font-size: 19.5px;
    background-color: transparent;
    white-space: nowrap;
    font-family: "DoHyeon";
    font-weight: bold;
`;

const Board2 = () => {
    const [data, setData] = useState("");
    const [category, setCategory] = React.useState("전체");
    const location=useLocation().key;

    const getAll = async () => {
        setData([]);
        const response = await axios.get(
            "https://sooksook.herokuapp.com/studyBoards/list?lecture=false"
        );
        response.data.map((item)=>{
            console.log(item);
            if(item.finished===false){
                
                setData((prev)=>[...(prev),item]);
            }
        });
    };
    const getCategory = async () => {
        setData([]);
        const response = await axios.get("/studyBoards/category", {
            params: {
                category: category,
            },
        });
        response.data.map((item)=>{
            console.log(item);
            if(item.finished===false){
                
                setData((prev)=>[...(prev),item]);
            }
        });
    };
    
    React.useEffect(() => {
        if (category === "전체") {
            getAll();
        } else {
            getCategory();
        }
    }, [location,category]);

    const onChangeCategory = async (e) => {
        const category = setCategory(e.target.value);
        return category;
    };
    
    const columns = [
        {
            title: <div className="studyname">스터디 명</div>,
            dataIndex: "title",
            key: "title",
            render: (text, record, index) => (
                <Link
                    to={`/enterboard2/${data[index].id}`}
                    state={{ boardId: data[index].id }}
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
        <Root>
            <GlobalStyle />
            <Logo />
            <div className="block">
                <Select onChange={onChangeCategory}>
                    <option value="전체">전체</option>
                    <option value="토익/토플">토익/토플</option>
                    <option value="면접">면접</option>
                    <option value="자소서">자소서</option>
                    <option value="코딩">코딩</option>
                    <option value="어학자격증">어학자격증</option>
                    <option value="LEET">LEET</option>
                    <option value="공무원시험">공무원시험</option>
                    <option value="해외유학">해외유학</option>
                    <option value="취미언어">취미언어</option>
                    <option value="전문자격증">전문자격증</option>
                </Select>
                <Cstudy2 />
            </div>
            <section className="table">
                <Table columns={columns} dataSource={data} />
            </section>
        </Root>
    );
};

export default Board2;
