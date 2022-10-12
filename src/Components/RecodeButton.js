import styled from "styled-components";
import { BsRecordCircle } from "react-icons/bs";
import { useState } from "react";

const BaseAudioContext = new (window.AudioContext ||
  window.webkitAudioContext)();
const AudioProgress = BaseAudioContext.createScriptProcessor(0, 1, 1);

function RecodeButton() {
  const [source, setSource] = useState();
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [audioUrl, setAudioUrl] = useState();
  const [audioUrlIntoString, setAudioUrlIntoString] = useState("");
  const [recodingStart, setRecodingStart] = useState("");
  const [recodingEnd, setRecodingEnd] = useState("");

  const createMediaRecorder = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      setStream(stream);
      setMedia(mediaRecorder);
    });
  };
  const createSoundSource = (stream) => {
    const source = BaseAudioContext.createMediaStreamSource(stream);
    setSource(source);
  };
  const connectAudioNodesForRecoding = () => {
    source.connect(AudioProgress);
    AudioProgress.connect(BaseAudioContext.destination);
  };
  const createAudioUrl = () => {
    media.ondataavailable = (e) => {
      setAudioUrl(e.data);
    };
  };
  const onClickRecodingButton = (e) => {
    setOnRec(false);
    (async () => {
      createMediaRecorder();
      media.start();
      createSoundSource(stream);
      connectAudioNodesForRecoding();
      createAudioUrl();
    })();

    // AudioProgress.onaudioprocess = function (e) {
    //   if (e.playbackTime > 10) {
    //     stream.getAudioTracks().forEach(function (track) {
    //       track.stop();
    //     });
    //     mediaRecorder.stop();
    //     AudioProgress.disconnect();
    //     BaseAudioContext.createMediaStreamSource(stream).disconnect();

    //     mediaRecorder.ondataavailable = function (e) {
    //       setAudioUrl(e.data);
    //       setOnRec(true);
    //     };
    //   } else {
    //     setOnRec(false);
    //   }
    // };
  };

  return (
    <Container onClick={onClickRecodingButton}>
      <BsRecordCircle />
    </Container>
  );
}

export default RecodeButton;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  font-size: 4rem;
  color: #e83b35;
`;
