import React from "react";
import styled from "styled-components";
import { BsFillPlayFill, BsStopFill, BsRecordCircle } from "react-icons/bs";
import { BiPlayCircle } from "react-icons/bi";

const RecAudio = () => {
  return (
    <Wrapper>
      <LeftWrapper>
        <Time>00:00:00</Time>
        <Bar>
          <HalfBox></HalfBox>
        </Bar>
        <Control>
          <Play>
            <BsFillPlayFill style={{ width: "50px", height: "50px" }} />
          </Play>
          <Record>
            <BsRecordCircle
              style={{ width: "50px", height: "50px", color: "red" }}
            />
          </Record>
          <Stop>
            <BsStopFill style={{ width: "50px", height: "50px" }} />
          </Stop>
        </Control>
      </LeftWrapper>

      <RightWrapper>
        <List>
          <File>
            <FilePlay>
              <BiPlayCircle style={{ width: "35px", height: "35px" }} />
            </FilePlay>
            <FileInfo>
              <FileName>음성파일 01</FileName>
              <FileDetail>2020년 10월 12일 00:00:10 </FileDetail>
            </FileInfo>
          </File>
          <DropDown>
            <Button>다운로드</Button>
            <Button>삭제</Button>
          </DropDown>
        </List>
      </RightWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  font-family: "Noto Sans KR";
  margin: 50px 50px;
`;

const LeftWrapper = styled.div`
  width: 465px;
  height: 423px;
  padding: 40px;
  border-right: 1px solid gray;
`;

const RightWrapper = styled.div`
  width: 268px;
  height: 423px;
`;

const Time = styled.p`
  display: flex;
  justify-content: center;
  font-size: 5rem;
`;
const Bar = styled.div`
  height: 173px;
  margin: 20px 5px;
`;

const HalfBox = styled.div`
  height: 50%;
  border-bottom: 1px solid #ffc700;
`;

const Control = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Play = styled.div``;
const Record = styled.div``;
const Stop = styled.div``;

const List = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  margin: 0 10px;
`;
const File = styled.div`
  margin: 0 10px;
  margin: 5px;
  display: flex;
  justify-content: center;
`;
const FilePlay = styled.div`
  margin: 10px;
`;
const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`;
const FileName = styled.p`
  font-size: 1rem;
  margin-bottom: 0.2rem;
`;
const FileDetail = styled.p`
  font-size: 0.7rem;
  color: gray;
`;
const DropDown = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
`;

const Button = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
`;
export default RecAudio;
