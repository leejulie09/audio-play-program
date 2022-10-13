import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BiPlayCircle } from "react-icons/bi";
import RecodeButton from "../../Components/RecodeButton";
import PlayAudio from "../PlayAudio/PlayAudio";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const blobs = new Blob();
const files = new File([blobs], "soundBlob", {
  lastModified: new Date().getTime(),
  type: "audio/wav",
});

const RecAudio = () => {
  const [soundFile, setSoundFile] = useState(files);
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [onPause, setOnPause] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [test, setTest] = useState("");
  const [onResult, setOnResult] = useState(false);
  const [onResultPlayer, setOnResultPlayer] = useState(false);
  const [onDownload, setOnDownload] = useState(false);
  const [backToRecode, setBackToRecode] = useState(false);

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
    setOnResult(true);
    setOnResultPlayer(true);
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    const sound = new File([audioUrl], "음성녹음", {
      lastModified: new Date().getTime(),
      type: "audio/wav",
    });

    const blobUrl = URL.createObjectURL(sound);
    setTest(blobUrl);
    setSoundFile(sound);
    setOnDownload(true);
    // console.log(blobUrl);
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
  const backToRecoding = () => {
    setOnResult(false);
    setOnResultPlayer(false);
    setOnDownload(false);
    setOnPause(true);
    setOnRec(true);
    setBackToRecode(true);
  };
  return (
    <Container>
      <LeftSideContainer>
        <LeftTopWrapper></LeftTopWrapper>
        <LeftMiddleWrapper>
          <AudioWaveUIBox>
            {onResultPlayer ? (
              <PlayAudio soundFile={soundFile} backToRecode={backToRecode} />
            ) : (
              <>
                {onRec ? (
                  <>
                    <Emoji>🎤</Emoji>
                    <PleaseClickMessage>
                      Click the Red Button below!
                    </PleaseClickMessage>
                  </>
                ) : (
                  <>
                    <PulseBox
                      delay="0s"
                      pause={onPause ? "running" : "paused"}
                    />
                    <PulseBox
                      delay="1s"
                      pause={onPause ? "running" : "paused"}
                    />
                    <PulseBox
                      delay="2s"
                      pause={onPause ? "running" : "paused"}
                    />
                    <PulseMessage>
                      {onPause ? "Recoding Progress..." : "Paused"}
                    </PulseMessage>
                  </>
                )}
              </>
            )}
          </AudioWaveUIBox>
        </LeftMiddleWrapper>
        <LeftBottomWrapper>
          <AudioControllerBox>
            {onResult ? (
              onDownload ? (
                <>
                  <DownloadButton
                    href={`${test}`}
                    download={`${soundFile.name}`}
                  >
                    다운로드
                  </DownloadButton>
                  <BackToRecoding onClick={backToRecoding}>
                    다시 녹음
                  </BackToRecoding>
                </>
              ) : (
                <CheckRecoding onClick={onSubmitAudioFile}>
                  결과 확인
                </CheckRecoding>
              )
            ) : (
              <RecodeButton
                onClickRecodButton={onRec ? onRecAudio : offRecAudio}
                onClickPauseButton={onPause ? pauseFucntion : resumeFucntion}
                recValue={onRec}
              >
                녹음
              </RecodeButton>
            )}
          </AudioControllerBox>
        </LeftBottomWrapper>
      </LeftSideContainer>
    </Container>
  );
};

const MoveSlide = keyframes`
    0% {
      transform: scale(0);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.5);
      opacity: 0.0;
    }
  `;
const CheckRecoding = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 4rem;
  border-radius: 3rem;
  color: #9e9e9e;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: 0.3s all;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
    color: white;
  }
`;
const PulseBox = styled.div`
  position: absolute;
  width: 15rem;
  height: 15rem;
  max-width: 30rem;
  background-color: #b8b8b8;
  border-radius: 8rem;
  opacity: 0;
  animation: ${MoveSlide} 3s linear infinite;
  animation-delay: ${(props) => props.delay};
  animation-play-state: ${(props) => props.pause};
`;
const PulseMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22rem;
  height: 5rem;
  font-size: 2rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 2rem;
  z-index: 1;
`;
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
  width: 100%;
  height: 100%;
`;
const LeftTopWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 25%;
`;
const LeftMiddleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0% 2%;
  width: 70%;
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

const DownloadButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  width: 6rem;
  height: 4rem;
  border-radius: 3rem;
  color: #9e9e9e;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: 0.3s all;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
    color: white;
  }
`;

const BackToRecoding = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  width: 6rem;
  height: 4rem;
  border-radius: 3rem;
  color: #9e9e9e;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: 0.3s all;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
    color: white;
  }
`;
export default RecAudio;
