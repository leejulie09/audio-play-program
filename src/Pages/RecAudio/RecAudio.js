import React, { useState } from "react";
import styled from "styled-components";
import { BsFillPlayFill, BsStopFill, BsRecordCircle } from "react-icons/bs";
import { BiPlayCircle } from "react-icons/bi";
import RecodeButton from "../../Components/RecodeButton";

const BaseAudioContext = new (window.AudioContext ||
  window.webkitAudioContext)();
const AudioProgress = BaseAudioContext.createScriptProcessor(0, 1, 1);

const RecAudio = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [audioUrlIntoString, setAudioUrlIntoString] = useState("");
  const [recodingStart, setRecodingStart] = useState("");
  const [recodingEnd, setRecodingEnd] = useState("");

  function makeSound(stream) {
    const source = BaseAudioContext.createMediaStreamSource(stream);
    setSource(source);
    source.connect(AudioProgress);
    AudioProgress.connect(BaseAudioContext.destination);
  }

  return (
    <Container>
      <LeftSideContainer>
        <LeftTopWrapper>
          <RecodeTimeBox>00:00:00</RecodeTimeBox>
        </LeftTopWrapper>
        <LeftMiddleWrapper>
          <AudioWaveUIBox>AUDIO WAVE IU</AudioWaveUIBox>
        </LeftMiddleWrapper>
        <LeftBottomWrapper>
          <AudioControllerBox>
            <RecodeButton />
          </AudioControllerBox>
        </LeftBottomWrapper>
        {/* <Bar>
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
        </Control> */}
      </LeftSideContainer>

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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
  border: 1px solid black;
`;
const LeftTopWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 25%;
`;
const RecodeTimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 6rem;
  font-size: 3rem;
`;
const LeftMiddleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
`;
const AudioWaveUIBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  background-color: rgba(22, 54, 196, 0.5);
  border: 1px solid black;
`;
const LeftBottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 30%;
`;
const AudioControllerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 40%;
  background-color: rgba(66, 245, 87, 0.5);
  border: 1px solid black;
`;

const RightWrapper = styled.div`
  width: 268px;
  height: 423px;
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
