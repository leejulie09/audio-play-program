import styled, { keyframes } from "styled-components";

function AudioProgressUI({ onRecValue, onPauseValue }) {
  return onRecValue ? (
    <>
      <Emoji>🎤</Emoji>
      <PleaseClickMessage>Click the Red Button below!</PleaseClickMessage>
    </>
  ) : (
    <>
      <PulseBox delay="0s" pause={onPauseValue ? "running" : "paused"} />
      <PulseBox delay="1s" pause={onPauseValue ? "running" : "paused"} />
      <PulseBox delay="2s" pause={onPauseValue ? "running" : "paused"} />
      <PulseMessage>
        {onPauseValue ? "Recoding Progress..." : "Paused"}
      </PulseMessage>
    </>
  );
}

export default AudioProgressUI;

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
