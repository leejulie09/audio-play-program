import React, { useCallback, useState } from "react";
import styled from "styled-components";
import AudioProgressUI from "../../Components/AudioProgressUI/AudioProgressUI";
import RecodeButton from "../../Components/RecodeButton/RecodeButton";
import RecoderControllerUI from "../../Components/RecoderControllerUI/RecoderControllerUI";
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
  const [downloadURL, setDownloadURL] = useState("");
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
      console.log(URL.createObjectURL(audioUrl));
    }
    const sound = new File([audioUrl], "음성녹음", {
      lastModified: new Date().getTime(),
      type: "audio/wav",
    });

    const blobUrl = URL.createObjectURL(sound);
    setDownloadURL(blobUrl);
    setSoundFile(sound);
    setOnDownload(true);
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
      <Wrapper>
        <TopWrapper />
        <MiddleWrapper>
          <AudioProgressUIBox>
            {onResultPlayer ? (
              <PlayAudio soundFile={soundFile} backToRecode={backToRecode} />
            ) : (
              <AudioProgressUI onRecValue={onRec} onPauseValue={onPause} />
            )}
          </AudioProgressUIBox>
        </MiddleWrapper>
        <BottomWrapper>
          <AudioControllerBox>
            {onResult ? (
              <RecoderControllerUI
                downloadURL={downloadURL}
                onDownload={onDownload}
                soundFile={soundFile}
                backToRecoding={backToRecoding}
                onSubmitAudioFile={onSubmitAudioFile}
              />
            ) : (
              <RecodeButton
                onClickRecodButton={onRec ? onRecAudio : offRecAudio}
                onClickPauseButton={onPause ? pauseFucntion : resumeFucntion}
                recValue={onRec}
              />
            )}
          </AudioControllerBox>
        </BottomWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #363636;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const TopWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 25%;
`;
const MiddleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0% 2%;
  width: 70%;
  height: 45%;
`;
const AudioProgressUIBox = styled.div`
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
const BottomWrapper = styled.div`
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

export default RecAudio;
