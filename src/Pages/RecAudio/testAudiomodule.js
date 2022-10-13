import React, { useCallback, useEffect, useRef, useState } from "react";
const async = require("async");

const BaseAudioContext = new (window.AudioContext ||
  window.webkitAudioContext)();
const AudioProgress = BaseAudioContext.createScriptProcessor(0, 1, 1);
const analyser = BaseAudioContext.createAnalyser();
const distortion = BaseAudioContext.createWaveShaper();
// 레거시 브라우저를 위해
// let BaseAudioContext = new (window.AudioContext || window.webkitAudioContext)();
// let out = BaseAudioContext.destination;
// let source = BaseAudioContext.createOscillator();
// let analyser = BaseAudioContext.createGain();

const Audio = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [audioUrlIntoString, setAudioUrlIntoString] = useState("");
  const [recodingStart, setRecodingStart] = useState("");
  const [recodingEnd, setRecodingEnd] = useState("");
  const audioElement = useRef();
  useEffect(() => {
    console.log(media);
    console.log(recodingStart);
    console.log(recodingEnd);
    console.log(recodingEnd - recodingStart);
    console.log(Math.floor((recodingEnd - recodingStart) / 1000));
  }, [media, recodingEnd]);
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
      mediaRecorder.onstart = () => {
        setRecodingStart(new Date().getTime());
      };
      mediaRecorder.onstop = () => {
        setRecodingEnd(new Date().getTime());
      };
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
      visualize(stream);
      mediaRecorder.ondataavailable = function (e) {
        setAudioUrl(e.data);
      };
      console.log(analyser);

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
    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    AudioProgress.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      setAudioUrlIntoString(URL.createObjectURL(audioUrl));
    }
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });
    console.log(sound);
  }, [audioUrl]);
  return (
    <>
      {onRec ? (
        <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
      ) : (
        <button onClick={onSubmitAudioFile}>결과 확인</button>
      )}
      <audio ref={audioElement} src={audioUrlIntoString} controls></audio>
    </>
  );
};

export default Audio;
