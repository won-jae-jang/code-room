import styled from "styled-components";
import axios from "axios";
import LoginNav from "../../components/ui/LoginNav.jsx";
import MyBoards from "../../components/ui/MyBoards.jsx";
import MyComments from "../../components/ui/MyComments.jsx";
import Footer from "../MainPage/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MyPage = () => {
  const [myBoards, setMyBoards] = useState([]); //내가 작성한 게시판
  const [myComments, setMyComments] = useState([]); //내가 작성한 댓글
  const [username, setUsername] = useState(""); //나의 회원 이름
  const [joinDate, setJoinDate] = useState(""); //회원 가입 일자
  const [boardCount, setBoardCount] = useState(""); //작성 게시판 수
  const [commentCount, setCommentCount] = useState(""); //작성 댓글 수
  const navigator = useNavigate();

  // 나의 게시판 가져오기 (서버와 통신)
  useEffect(() => {
    const getMyData = async () => {
      const res = await axios.get("/users/mypage");
      console.log("mypage: " + res.data.data.postsIofo);
      // Todo
      setMyBoards(res.data.data.postsIofo);
      setMyComments(res.data.data.commentsInfo);
      setUsername(res.data.data.userInfo[0].username);
      setJoinDate(res.data.data.userInfo[0].joindate);
      setBoardCount(res.data.data.userInfo[0].PostsCount);
      setCommentCount(res.data.data.userInfo[0].commentsCount);
    };
    getMyData();
  }, []);

  // MyBoards 컴포넌트 전달 데이터 예시
  const sampleBoards = [
    {
      title: "제목 111111111111111111111111111111111111111",
      writerDt: "2024.01.01",
      views: "12",
      boardId: "0",
    },
  ];

  // const sampleBoards = [];

  // MyComments 컴포넌트 전달 데이터 예시
  const sampleComments = [
    {
      title: "제목 11111111111111111111111111111111111111",
      commentNum: "12",
      writeDt: "2024.01.01",
      boardId: "0",
    },
  ];
  // const sampleComments = [];

  return (
    <>
      <LoginNav />
      <SummaryContainer>
        <div class="item">
          {/* Todo */}
          <div class="number">{username}</div>
          <div>
            <span
              id="member-info-modify"
              onClick={() => navigator(`/users/update`)}
            >
              회원 정보 수정
            </span>
            <span> | </span>
            <span onClick={() => navigator(`/users/delete`)}>회원 탈퇴</span>
          </div>
        </div>
        <div class="item">
          <div class="number">{joinDate}</div>
          <div>회원가입 일자</div>
        </div>
        <div class="item">
          {/* Todo */}
          <div class="number">{boardCount}</div>
          <div>작성한 게시판 수</div>
        </div>
        <div class="item">
          {/* Todo */}
          <div class="number">{commentCount}</div>
          <div>작성한 댓글 수</div>
        </div>
      </SummaryContainer>
      <SummaryUnderline />
      {/* Todo props로 데이터 전달 */}
      <MyBoards sampleBoards={myBoards}></MyBoards>
      <MyComments sampleComments={myComments}></MyComments>
      <Footer></Footer>
    </>
  );
};

const SummaryUnderline = styled.hr`
  height: 2px;
  background-color: rgb(113, 113, 113);
  border: none;
  margin-bottom: 50px;
  opacity: 0.1;
`;

const SummaryContainer = styled.div`
  background-color: white;
  display: flex;
  /* padding: 21px 16px; */
  height: 90px;
  /* margin-bottom: 10px; */

  span {
    cursor: pointer;
  }

  .item {
    flex-grow: 1;
  }
  .number {
    font-size: 19px;
    font-weight: bold;
    color: #24855b;
  }
  .item > div:nth-child(2) {
    font-size: 13px;
  }
`;

export default MyPage;
