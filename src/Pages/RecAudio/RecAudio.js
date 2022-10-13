import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { BiPlayCircle } from "react-icons/bi";
import RecodeButton from "../../Components/RecodeButton";

const async = require("async");
const BaseAudioContext = new (window.AudioContext ||
  window.webkitAudioContext)();
const AudioProgress = BaseAudioContext.createScriptProcessor(0, 1, 1);
const analyser = BaseAudioContext.createAnalyser();
const distortion = BaseAudioContext.createWaveShaper();

const RecAudio = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [audioUrlIntoString, setAudioUrlIntoString] = useState("");

  function makeSound(stream) {
    const source = BaseAudioContext.createMediaStreamSource(stream);
    setSource(source);
    source.connect(AudioProgress);
    AudioProgress.connect(BaseAudioContext.destination);
  }

  const visualize = (stream) => {
    const source = BaseAudioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.connect(distortion);
    distortion.connect(BaseAudioContext.destination);
    const bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    console.log(dataArray);
  };
  const onRecAudio = (e) => {
    // 마이크 사용 권한 획득
    setOnRec(false);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
      visualize(stream);
      mediaRecorder.ondataavailable = function (e) {
        setAudioUrl(e.data);
      };
      console.log(analyser);

      AudioProgress.onaudioprocess = function (e) {
        if (e.playbackTime > 10) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          AudioProgress.disconnect();
          BaseAudioContext.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();
    AudioProgress.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      setAudioUrlIntoString(URL.createObjectURL(audioUrl));
    }
  }, [audioUrl]);

  const stopMedia = () => {};
  const RecodeOff = () => {
    async.waterfall([offRecAudio(), onSubmitAudioFile()], (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("작업완료");
      }
    });
  };
  return (
    <Container>
      <LeftSideContainer>
        <LeftTopWrapper>
          <RecodeTimeBox>00:00:00</RecodeTimeBox>
        </LeftTopWrapper>
        <LeftMiddleWrapper>
          <AudioWaveUIBox></AudioWaveUIBox>
        </LeftMiddleWrapper>
        <LeftBottomWrapper>
          <AudioControllerBox>
            <RecodeButton
              onClickRecodButton={onRec ? onRecAudio : offRecAudio}
              recodingValue={onRec}
            />
            <audio src={audioUrlIntoString} controls></audio>
            <button onClick={onSubmitAudioFile}>결과 확인</button>
            <button>일시정지</button>
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  background-color: #575757;
  border-radius: 5rem;
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
