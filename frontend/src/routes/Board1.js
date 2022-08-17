import "../css/board1.css";
import { Link,useParams,useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Table } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import GlobalStyle from "./components/GlobalStyle";
import Logo from "./components/Logo.js";
import Cstudy from "./components/Cstudy.js";
import Root from "./components/Root";
import axios from "axios";

const Select = styled.select`
    width: 140px;
    height: 32px;
    transition: 0.5s;
    border-color: #c1daff;
    font-size: 19.5px;
    background-color: transparent;
    white-space: nowrap;
    font-family: "DoHyeon";
    font-weight: bold;
`;

const Board1 = () => {
    const [data, setData] = useState("");
    const [dpt, setDpt] = React.useState("전체");
    const location=useLocation().key;
    const [rerender,setRerender]=useState("");
   
    const getAll = async () => {
        setData([]);
        const response = await axios.get(
            "https://sooksook.herokuapp.com/studyBoards/list?lecture=true"
        );
        response.data.map((item)=>{
            console.log(item);
            if(item.finished===false){
                
                setData((prev)=>[...(prev),item]);
            }
        });
           
    };
    const getDpt = async () => {
        setData([]);
        const response = await axios.get("/studyBoards/department", {
            params: {
                department: dpt,
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
        console.log(location);
        if (dpt === "전체") {
            getAll();
        } else {
            getDpt();

        } 
    }, [location,dpt]);

    const onChangeDpt = async (e) => {
        const dpt = await setDpt(e.target.value);
        return dpt;
    };

    const columns = [
        {
            title: <div className="studyname">스터디 명</div>,
            dataIndex: "title",
            key: "title",
            render: (text, record, index) => (
                <Link
                    to={`/enterboard/${data[index].id}`}
                    state={{ boardId: data[index].id }}
                >
                    {text}
                </Link>
            ),
        },

        {
            title: <div className="user">작성자</div>,
            dataIndex: "nickname",
            key: "nickname",
            render:(nickname,record,index)=>(
                <Link to={`/profile/${data[index].email}`}>
                    {nickname}
                </Link>
            ),
        },
    ];

    return (
        <Root>
            <GlobalStyle />
            <Logo />
            <div className="block">
                <Select onChange={onChangeDpt}>
                    <option value="전체">전체</option>
                    <option value="문과대학">문과대학</option>
                    <option value="이과대학">이과대학</option>
                    <option value="공과대학">공과대학</option>
                    <option value="생활과학대학">생활과학대학</option>
                    <option value="법과대학">법과대학</option>
                    <option value="경상대학">경상대학</option>
                    <option value="음악대학">음악대학</option>
                    <option value="약학대학">약학대학</option>
                    <option value="미술대학">미술대학</option>
                    <option value="기초교양대학">기초교양대학</option>
                    <option value="글로벌서비스학부">글로벌서비스학부</option>
                    <option value="영어영문학부">영어영문학부</option>
                    <option value="미디어학부">미디어학부</option>
                </Select>
                <Cstudy />
            </div>
            <section className="table">
                <Table columns={columns} dataSource={data} />
            </section>
        </Root>
    );
};

export default Board1;
