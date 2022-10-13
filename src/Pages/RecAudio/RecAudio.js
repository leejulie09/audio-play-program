import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiPlayCircle } from "react-icons/bi";
import RecodeButton from "../../Components/RecodeButton";

const RecAudio = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [onPause, setOnPause] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [test, setTest] = useState("");

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const onRecAudio = () => {
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      console.log(audioUrl);

      mediaRecorder.start();
      mediaRecorder.onstart = () => {
        console.log("녹화 시작");
      };

      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
      setOnRec(false);
    });
  };

  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });
    media.stop();
    media.onstop = () => {
      console.log("녹화중지");
    };
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio/wav",
    });
    const blobUrl = URL.createObjectURL(sound);
    setTest(blobUrl);
    console.log(blobUrl);
  }, [audioUrl]);

  const pauseFucntion = () => {
    setOnPause(false);
    media.pause();
    media.onpause = () => {
      console.log("일시정지");
    };
  };
  const resumeFucntion = () => {
    setOnPause(true);
    media.resume();
    media.onresume = () => {
      console.log("이어서 녹화시작");
    };
  };
  // console.log(media);
  // console.log(audioCtx);
  // console.log(audioUrl);

  return (
    <Container>
      <LeftSideContainer>
        <LeftTopWrapper>
          <RecodeTimeBox>00:00:00</RecodeTimeBox>
        </LeftTopWrapper>
        <LeftMiddleWrapper>
          <AudioWaveUIBox>
            <Emoji>🎤</Emoji>
            <PleaseClickMessage>Click the Red Button below!</PleaseClickMessage>
          </AudioWaveUIBox>
        </LeftMiddleWrapper>
        <LeftBottomWrapper>
          <AudioControllerBox>
            <RecodeButton
              onClickRecodButton={onRec ? onRecAudio : offRecAudio}
              onClickPauseButton={onPause ? pauseFucntion : resumeFucntion}
              recValue={onRec}
            >
              녹음
            </RecodeButton>
            <button onClick={onSubmitAudioFile}>결과 확인</button>
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
          <Files>
            <FilePlay>
              <BiPlayCircle style={{ width: "35px", height: "35px" }} />
            </FilePlay>
            <FileInfo>
              <FileName>음성파일 01</FileName>
              <FileDetail>2020년 10월 12일 00:00:10 </FileDetail>
            </FileInfo>
          </Files>
          <DropDown>
            <DownloadButton href={`${test}`} download>
              다운로드
            </DownloadButton>
          </DropDown>
        </List>
      </RightWrapper>
    </Container>
  );
};
const PleaseClickMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 3rem;
  color: white;
  font-size: 1.5rem;
`;
const Emoji = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 10rem;
  font-size: 8rem;
`;
const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #363636;
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
  padding: 0% 2%;
  width: 100%;
  height: 45%;
`;
const AudioWaveUIBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  background-color: #575757;
  border-radius: 5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
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
const Files = styled.div`
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

const DownloadButton = styled.a`
  border: 0;
  background: none;
  cursor: pointer;
`;
export default RecAudio;
