import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsStopFill,
  // BsRecordCircle,
} from "react-icons/bs";
import { BiPlayCircle } from "react-icons/bi";

const RecAudio = () => {
  const audioCtxContainer = useRef(null);
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [file, setFile] = useState();
  const [playDuration, setPlayDuration] = useState(0);

  const playSound = (buffer, time) => {
    const sourceNode = audioCtxContainer.current.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.connect(audioCtxContainer.current.destination);
    sourceNode.start(time);
    setIsPlaying(true);
  };

  const onFileChange = (e) => {
    let file = e.target.files[0];
    console.log(file);
    setFile(file);

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

  const onPlayPause = (e) => {
    console.log("audioState", audioCtxContainer.current.state);
    console.log("duration", audioCtxContainer.current.currentTime);
    if (!isPlaying) {
      audioCtxContainer.current.resume();
      setIsPlaying(true);
      document.getElementById("pauseButton").innerHTML = "Pause";
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
    let seconds =
      secNum - hours * 3600 - (minutes * 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  //wav다운로드
  // document.getElementById("export").addEventListener("click", function () {
  //   // export original recording
  //   module.recorder.exportWAV(function (blob) {
  //     var url = URL.createObjectURL(blob),
  //       li = document.createElement("li"),
  //       au = document.createElement("audio"),
  //       hf = document.createElement("a");

  //     au.controls = true;
  //     au.src = url;
  //     hf.href = url;
  //     hf.download =
  //       new Date().toISOString().replace("T", "-").slice(0, -5) + ".wav";
  //     hf.innerHTML = hf.download;
  //     li.appendChild(au);
  //     li.appendChild(hf);
  //     document.getElementById("downloads").appendChild(li);
  //   });
  // });

  return (
    <Wrapper>
      <LeftWrapper>
        {/* <audio src={file} controls></audio>; */}
        <OpenFile>
          <input
            type="file"
            accept=".mp3,.wav"
            ref={ref}
            onChange={onFileChange}
          />
        </OpenFile>
        <Time>{toHHMMSS(playDuration)}</Time>
        <Bar>
          <HalfBox></HalfBox>
        </Bar>
        <Control>
          <Play>
            <BsFillPlayFill
              onClick={onPlayPause}
              style={{ width: "50px", height: "50px" }}
              isPlaying={false}
            />
            <BsFillPauseFill
              onClick={onPlayPause}
              style={{ width: "50px", height: "50px" }}
              isPlaying={true}
            />
          </Play>
          {/* <Record>
            <BsRecordCircle
              style={{ width: "50px", height: "50px", color: "red" }}
            />
          </Record> */}
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
  margin: 50px 200px;
`;

const LeftWrapper = styled.div`
  width: 465px;
  height: 423px;
  padding: 40px;
  border-right: 1px solid gray;
`;

const OpenFile = styled.div`
  background-color: yellow;
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
// const Record = styled.div``;
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
