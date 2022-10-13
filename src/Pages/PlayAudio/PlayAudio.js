import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

const PlayAudio = ({ soundFile }) => {
  const audioCtxContainer = useRef(null);

  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [file, setFile] = useState();
  const [playDuration, setPlayDuration] = useState(0);

  //오디오 재생
  const playSound = (buffer, time) => {
    const sourceNode = audioCtxContainer.current.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.connect(audioCtxContainer.current.destination);
    sourceNode.start(time);
    setIsPlaying(true);
  };

  //파일 업로드
  const onFileChange = (e) => {
    // let file = e.target.files[0];
    let file = soundFile;
    setFile(file);
    // console.log("FILE:", file);
    console.log("SOUNDFILE", soundFile);
    let fileReader = new FileReader();
    fileReader.onload = function (ev) {
      audioCtxContainer.current = new AudioContext();
      audioCtxContainer.current
        .decodeAudioData(ev.target.result)
        .then(function (buffer) {
          playSound(buffer);
        });
    };
    fileReader.readAsArrayBuffer(file);
  };

  //재생 일시정지 + 시간 데이터
  const onPlayPause = (e) => {
    if (!isPlaying) {
      audioCtxContainer.current.resume();
      setIsPlaying(true);
    } else if (audioCtxContainer.current.state === "running") {
      setPlayDuration(audioCtxContainer.current.currentTime);
      audioCtxContainer.current.suspend();
      setIsPlaying(false);
    } else if (audioCtxContainer.current.state === "suspended") {
      audioCtxContainer.current.resume();
    }
  };

  const toHHMMSS = (numSecs) => {
    let secNum = parseInt(numSecs, 10);
    let hours = Math.floor(secNum / 3600)
      .toString()
      .padStart(2, "0");
    let minutes = Math.floor((secNum - hours * 3600) / 60)
      .toString()
      .padStart(2, "0");
    let seconds = (secNum - hours * 3600 - minutes * 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const [realTime, setRealTime] = useState("00:00:00");

  useEffect(() => {
    if (isPlaying) {
      setInterval(() => {
        setRealTime(toHHMMSS(audioCtxContainer.current.currentTime));
      }, 1000);
    }
  }, [isPlaying, playDuration]);

  return (
    <Wrapper>
      <LeftWrapper>
        <OpenFile>
          <input
            type="file"
            accept=".mp3,.wav"
            ref={ref}
            onChange={onFileChange}
          />
        </OpenFile>

        <Play>
          {isPlaying ? (
            <BsFillPauseFill
              onClick={onPlayPause}
              style={{ width: "50px", height: "50px" }}
            />
          ) : (
            <BsFillPlayFill
              onClick={onPlayPause}
              style={{ width: "50px", height: "50px" }}
            />
          )}
        </Play>
        <Time>
          {realTime}
          {/* {toHHMMSS(playDuration)} */}
        </Time>
      </LeftWrapper>

      <RightWrapper>
        <List>
          <File>
            <FileInfo>
              <FileName>
                음성파일 01
                {/* {file.name} */}
              </FileName>
              <FileDetail>
                2022년 10월 13일
                {/* {file.lastModifiedDate} */}
              </FileDetail>
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
  margin: 50px 200px;
`;

const LeftWrapper = styled.div`
  width: 465px;
  height: 423px;
  padding: 40px;
  border-right: 1px solid gray;
`;

const OpenFile = styled.div``;

const RightWrapper = styled.div`
  width: 268px;
  height: 423px;
`;

const Time = styled.p`
  display: flex;
  justify-content: center;
  font-size: 5rem;
  margin: 10px 0;
`;

const Play = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const List = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  margin: 0 10px;
`;
const File = styled.div`
  margin: 10px;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px 10px;
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
export default PlayAudio;
