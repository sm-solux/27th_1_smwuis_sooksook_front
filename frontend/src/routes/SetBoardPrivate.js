import axios from "axios";
import React from "react";
import styled from "styled-components";
import GlobalStyle from "./components/GlobalStyle";
import Root from "./components/Root";
import ColorBox from "./components/ColorBox";
import InputBox from "./components/InputBox";
import InputText from "./components/InputText";
import Box from "./components/Box";
import InputArea from "./components/InputArea";
import Button from "./components/Button";
import Logo from "./components/Logo";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "../fonts/Font.css";
import { useSelector } from "react-redux";

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
    font-family: "DoHyeon";
    border-bottom: thin solid #c1daff;
`;

const Quest = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    font-size: 25px;
    align-items: center;
`;

const LabelFile = styled.label`
    height: 100%;
    border: thin solid #d9d9d9;
    color: #bfbfbf;
    border-radius: 70px;
    padding: 7px 66px;
    font-size: 13px;

    &:hover {
        border-color: #4aacfc;
        transition: 0.5s;
    }

    transition: 0.5s;
`;
const ButtonBox = styled.div`
    font-family: "DoHyeon";
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SetBoardShare = () => {
    const navigate = useNavigate();
    const emailL = useSelector((state) => state.email);
    const location=useLocation();
    const key=location.state.boardId;
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [filename, setFilename] = React.useState("파일 선택하기");

    const [id,setId]=React.useState([]);

    React.useEffect(()=>{
        if(emailL===""){
            alert("로그인이 필요합니다.");
            navigate("/login");  
        }
    },[emailL])
    const getText = (text) => {
        setTitle(text);
    };
    const getArea = (text) => {
        setContent(text);
    };
    const [addFormData, setAddFormData] = React.useState([]);
    const formData = new FormData();
    const handleFileClick=()=>{
        setAddFormData([]);
    }
    const handleFileChange = (e) => {
        const nowFile=[...addFormData];
        if (e.target.value === "") {
            setFilename("파일 선택하기");
        } else {
            if (e.target.files.length > 1) {
                setFilename("파일" + e.target.files.length + "개");
            } else {
                if (e.target.value.length > 10) {
                    setFilename(e.target.value.substr(0, 11) + "...");
                } else {
                    setFilename(e.target.value);
                }
            }
        }
        for (let i = 0; i < e.target.files.length; i++) {
            nowFile.push(e.target.files[i]);
        }
        setAddFormData(nowFile);
    };
    const upload=async ()=>{
        await axios
        .post("https://sooksook.herokuapp.com/studyPost/lecture", formData)
        .then((response) => {
            console.log(response.data);
            navigate(`/private/${key}`);
        });
    }
    const handleUploadClick = (e) => {
        if (title === "") {
            alert("제목을 입력하세요");
            return;
        } else if (content === "") {
            alert("내용을 입력하세요");
            return;
        } else {
            formData.append("title", title);
            formData.append("email", emailL);
            formData.append("content", content);
            formData.append("studyBoardId",key);
            console.log(addFormData);
            for (let i = 0; i < addFormData.length; i++) {
                formData.append("files", addFormData[i]);
            }
            /*db에 게시글 정보 저장*/

            upload();

            
        }
    };


    return (
        <Root>
            <GlobalStyle />
            <Logo />
            <ColorBox height="90px">
                <Title>글 작성</Title>
            </ColorBox>
            <Main>
                <InputBox>
                    <Quest>제목</Quest>
                    <Box width="200px" left="100px" top="7px">
                        <InputText text="입력하세요" getText={getText} />
                    </Box>
                </InputBox>
                <InputBox mgBot="62px">
                    <Quest>내용</Quest>
                    <Box width="200px" left="100px" top="7px">
                        <InputArea
                            area="입력하세요"
                            bg="#F0F0F0"
                            getArea={getArea}
                        />
                    </Box>
                </InputBox>
                <InputBox mgBot="50px">
                    <Quest>파일</Quest>
                    <Box width="200px" left="100px" top="17px">
                        <LabelFile for="inputFile">{filename}</LabelFile>
                        <input
                            id="inputFile"
                            type="file"
                            multiple="multiple"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            onClick={handleFileClick}
                        />
                    </Box>
                </InputBox>
            </Main>
            <ButtonBox mgRight="50px">
                <Button width="70px" mg="30px" onClick={handleUploadClick}>
                    업로드
                </Button>

                <Link to={`/private/${key}`}>
                    <Button width="70px" mg="30px">
                        목록
                    </Button>
                </Link>
            </ButtonBox>
        </Root>
    );
};
export default SetBoardShare;
