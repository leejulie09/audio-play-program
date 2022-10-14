import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

const blobs = new Blob();
const files = new File([blobs], "soundBlob", {
  lastModified: new Date().getTime(),
  type: "audio/wav",
});

const PlayAudio = ({ soundFile, backToRecode }) => {
  const audioCtxContainer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [file, setFile] = useState(files);
  const [playDuration, setPlayDuration] = useState(0);
  const fileReader = new FileReader();

  const playSound = (buffer, time) => {
    const sourceNode = audioCtxContainer.current.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.connect(audioCtxContainer.current.destination);
    sourceNode.start(time);
    setIsPlaying(true);
  };
  useEffect(() => {
    setFile(soundFile);
  }, [soundFile]);
  console.log(backToRecode);
  useEffect(() => {
    fileReader.onload = function (ev) {
      audioCtxContainer.current = new AudioContext();
      audioCtxContainer.current
        .decodeAudioData(ev.target.result)
        .then(function (buffer) {
          playSound(buffer);
        });
    };
    fileReader.readAsArrayBuffer(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

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
    <Container>
      <Wrapper>
        <TimeBox>
          <Time>{realTime}</Time>
        </TimeBox>
        <PlayBox>
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
        </PlayBox>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 15rem;
`;

const TimeBox = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 10rem;
`;
const Time = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 5rem;
  color: white;
  border-radius: 3rem;
  transition: 0.3s all;
`;

const PlayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 5rem;
`;
const Play = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  color: #9e9e9e;
  border-radius: 3rem;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: 0.3s all;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
    color: white;
  }
`;

export default PlayAudio;
