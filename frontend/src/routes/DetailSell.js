import React, { useEffect, useRef } from "react";
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
import ListBox from "./components/ListBox";
import CommentList from "./components/CommentList";
import "../fonts/Font.css";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
const InputFile = styled.input``;
const LabelFile = styled.label`
    height: 100%;
    border: thin solid #d9d9d9;
    color: #bfbfbf;
    border-radius: 70px;
    padding: 7px 66.5px;
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
const Footer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "DoHyeon";
`;
const CommentBox = styled.div`
    height: 40px;
    margin: 5px 10px;
    display: flex;
    justify-content: space-around;
`;
const CommentTitle = styled.div`
    width: 100%;
    padding: 10px 0px 7px 35px;
    display: flex;
    align-items: center;
    font-size: 17px;
    border-bottom: thin solid #c1daff;
    background-color: #c1daff;
`;

const DetailSell = () => {
    const {key } = useParams();
    const location = useLocation();
    const dataKey = location.state.boardId;
    const navigate = useNavigate();
    //현재 로그인 중인 email 받기
    const emailL = useSelector((state) => state.email);

    //수정 삭제 버튼 유무
    const [isShow, setIsShow] = React.useState(false);
    //게시글 정보 가져오기
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [fileId, setFileId] = React.useState([]);
    const [fileInfo, setFileInfo] = React.useState([]);
    const [email, setEmail] = React.useState("");
    const fileName=useRef();
    const fileDownload=useRef();
    const getPost = async () => {
        const response = await axios.get(
            `https://sooksook.herokuapp.com/studyPost/info?id=${dataKey}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setFileId(prev=>prev.concat(response.data.fileId));
        setEmail(response.data.email);
        if (emailL === response.data.email) {
            setIsShow(true);
        } else {
            setIsShow(false);
        }
    };

    React.useEffect(() => {
        if (emailL === "") {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
        getPost();
    }, []);

    const getFile = () => {
        
        (fileId || []).reduce((prev, cur) => {
            return prev.then(async () => {
                await axios
                    .get(
                        `https://sooksook.herokuapp.com/studyPost/fileInfo?id=${cur}`
                    )
                    .then((res) => {
                       fileName.current=res.data.origFileName;
                    });
                await axios
                    .get(
                        `https://sooksook.herokuapp.com/studyPost/fileDownload?id=${cur}`,
                        {
                            responseType: "arraybuffer",
                        }
                    )
                    .then((res) => {
                        const file = new Blob([res.data]);
                        fileDownload.current=window.URL.createObjectURL(file);
                    });
                    const temp={fileName:fileName.current,fileDownload:fileDownload.current}
                    setFileInfo(prev=>[...prev,temp]);

            });
        }, Promise.resolve());
    };
    React.useEffect(() => {
        getFile();
    }, [fileId]);

/*게시글 수정*/
    const [isModify, setIsModify] = React.useState(false);
    const [isDisable, setIsDisable] = React.useState(true);
    const handleModifyClick = () => {
        setIsModify(true);
        setIsDisable(false);
    };
    const getTitle = (text) => {
        setTitle(text);
    };
    const getArea = (text) => {
        setContent(text);
    };
    
     const [filename, setFilename] = React.useState("파일 추가하기");
    const [addFormData, setAddFormData] = React.useState([]);
    const [delFileId,setDelFileId]=React.useState([]);
    const formData = new FormData();
    const handleDelFile=(id)=>{
        console.log("삭제");
        setDelFileId((prev) => [...prev, id]);
        setFileInfo(fileInfo.map((item)=>item.fileId===id?{...item,fileName:"삭제되었습니다."}:item));
    }
    const handleFileClick=()=>{
        setAddFormData([]);
    }
    const handleFileChange = (e) => {
        const nowFile=[...addFormData];
        if (e.target.value === "") {
            setFilename("파일 추가하기");
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
    const upload=async()=>{
        await axios
        .put(`/studyPost`, formData);
        setIsDisable(true);
    };
    const handleUploadClick = () => {
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
            formData.append("id",key)
            console.log(addFormData);
            for (let i = 0; i < addFormData.length; i++) {
                formData.append("files", addFormData[i]);
            }
            for(let i=0;i<delFileId.length;i++){
                formData.append("deleteId",delFileId[i])
            }
        }
            upload();
            setDelFileId([]);
        navigate("/sell");
       
    };
    //게시글 삭제
    const [id, setId] = React.useState([]);
    const getId = async () => {
        const response = await axios.get(
            "https://sooksook.herokuapp.com/studyPosts/category?category=%ED%8C%90%EB%A7%A4%2F%EB%82%98%EB%88%94%20%EA%B2%8C%EC%8B%9C%EA%B8%80"
        );
        setId(...id, response.data);
    };
    const handleDeleteClick = () => {
        const removePost = async () => {
            const response = await axios.delete("/studyPost", {
                params: {
                    email: email,
                    id: dataKey,
                },
            });
            if (response.data) {
                getId();
                navigate("/sell");
            }
        };
        removePost();
    };
    /*댓글*/
    const [comment, setComment] = React.useState("");
    const [commentList, setCommentList] = React.useState([]);
    const getText = (text) => {
        setComment(text);
    };
    //댓글 가져오기
    const getComment=async()=>{
        const res=await axios
        .get("https://sooksook.herokuapp.com/studyComments/all", {
            params: {
                studyPostId: dataKey,
            },
        });
        setCommentList(res.data);
    };
    React.useEffect(() => {
       getComment();
    }, [location.key]);
    //댓글 추가하기
    const addComment=async ()=>{
        const res=await axios
        .post("https://sooksook.herokuapp.com/studyComment", {
            content: comment,
            email: emailL,
            studyPostId: dataKey,
            upIndex: "null",
        });
        
        setComment("");
        getComment();
    };
    const handlePlusClick = () => {
        addComment();
    };
    const handleXclick = async (email,id) => {
         console.log(1);
        const res=await axios.delete("/studyComment", {
            params: {
                email: email,
                id: id,
            },
        });
        getComment();
        };
    const [isRecomment, setIsRecomment] = React.useState(false);
    const [upIndex, setUpIndex] = React.useState();
    const handleSendClick = (id) => {
        setIsRecomment(true);
        setUpIndex(id);

    };
    //대댓글 추가
    const addRecomment=async ()=>{
        const res=await axios
        .post("https://sooksook.herokuapp.com/studyComment", {
            content: comment,
            email: emailL,
            studyPostId: dataKey,
            upIndex: upIndex,
        });

        setComment('');
        getComment();
    }
    const handleRecommentClick = () => {
       addRecomment();
    };
    const handleCommentClick = () => {
        setIsRecomment(false);
    };
    return (
        <Root>
            <GlobalStyle />
            <Logo />
            <ColorBox height="85px">
                <Title>판매/나눔 게시판</Title>
            </ColorBox>
            <Main>
                <InputBox>
                    <Quest>제목</Quest>
                    <Box width="200px" left="100px" top="7px">
                        <InputText
                            value={title}
                            disable={isDisable}
                            getText={getTitle}
                        />
                    </Box>
                </InputBox>
                <InputBox mgBot="62px">
                    <Quest>내용</Quest>
                    <Box width="200px" left="100px" top="7px">
                        <InputArea
                            value={content}
                            bg="#F0F0F0"
                            disable={isDisable}
                            getArea={getArea}
                        />
                    </Box>
                </InputBox>
                <InputBox mgBot="50px">
                    <Quest>파일</Quest>
                    <Box width="200px" left="100px" top="17px">
                        {/* 파일 정보 */}
                        {fileInfo &&
                            fileInfo.map((item) => {
                                return (
                                   
                                        <div
                                            style={{
                                                display: "flex",
                                                marginBottom: "7px",
                                            }}
                                        >
                                            <a
                                                href={item.fileDownload}
                                                download={item.fileName}
                                            >
                                                {item.fileName}
                                            </a>
                                            {!isDisable && (
                                                <Button
                                                    margin="0px 10px"
                                                    onClick={() =>
                                                        handleDelFile(
                                                            item.fileId
                                                        )
                                                    }
                                                >
                                                    삭제
                                                </Button>
                                            )}
                                        </div>

                                );
                            })}
                        {!isDisable && (
                            <>
                                <LabelFile for="inputFile">
                                    {filename}
                                </LabelFile>

                                <input
                                    id="inputFile"
                                    type="file"
                                    multiple="multiple"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                    onClick={handleFileClick}
                                />
                            </>
                        )}
                    </Box>
                </InputBox>
            </Main>
            <ButtonBox mgRight="50px">
                {isShow && (
                    <>
                        {isDisable && (
                            <Button
                                width="70px"
                                mg="30px"
                                onClick={handleModifyClick}
                            >
                                수정
                            </Button>
                        )}
                        {!isDisable && (
                            <Button
                                width="70px"
                                mg="30px"
                                onClick={handleUploadClick}
                            >
                                업로드
                            </Button>
                        )}
                        <Button
                            width="70px"
                            mg="30px"
                            onClick={handleDeleteClick}
                        >
                            삭제
                        </Button>
                    </>
                )}

                <Link to="/sell">
                    <Button width="70px" mg="30px">
                        목록
                    </Button>
                </Link>
            </ButtonBox>
            <Footer>
                <CommentTitle onClick={handleCommentClick}>댓글</CommentTitle>
                <ListBox>
                {commentList &&
                        commentList.map((comment) => (
                            <CommentList
                                email={comment.email}
                                writeEmail={email}
                                handleSendClick={handleSendClick}
                                id={comment.id}
                                dataKey={dataKey}
                                childList={comment.childList}
                                handleXclick={handleXclick}
                                removed={comment.removed}
                               
                            />
                        ))}
                </ListBox>
                {!isRecomment && (
                    <CommentBox>
                        <InputText
                            text="입력하세요"
                            getText={getText}
                            value={comment}
                        ></InputText>
                        <Button width="50px" mg="5px" onClick={handlePlusClick}>
                            입력
                        </Button>
                    </CommentBox>
                )}
                {isRecomment && (
                    <CommentBox>
                        <InputText
                            text="대댓글을 입력하세요"
                            getText={getText}
                            value={comment}
                        ></InputText>
                        <Button
                            width="50px"
                            mg="5px"
                            onClick={handleRecommentClick}
                        >
                            입력
                        </Button>
                    </CommentBox>
                )}
            </Footer>
        </Root>
    );
};

export default DetailSell;
