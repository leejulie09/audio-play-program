import styled from "styled-components";
import { BsFillMicFill, BsFillPauseFill, BsStopFill } from "react-icons/bs";

function RecodeButton({ onClickRecodButton, recValue, onClickPauseButton }) {
  const offRecStyle = `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 3rem;
  
  `;
  const onRecStyle = `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 17rem;
  height: 5rem;
  border-radius: 3rem;
  background-color: rgba(0, 0, 0, 0.5);
  `;

  return (
    <Container changeStyled={recValue ? offRecStyle : onRecStyle}>
      <RecWrapper
        onClick={onClickRecodButton}
        changeStyled={recValue ? "white" : "black"}
      >
        {recValue ? <BsFillMicFill /> : <BsStopFill />}
      </RecWrapper>
      {!recValue && (
        <PauseWrapper onClick={onClickPauseButton}>
          <BsFillPauseFill />
        </PauseWrapper>
      )}
    </Container>
  );
}

export default RecodeButton;

const Container = styled.div`
  ${(props) => props.changeStyled}
  transition: 0.3s all;
`;

const RecWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  font-size: 1.7rem;
  color: ${(props) => props.changeStyled};
  background-color: #d42a2a;
  border-radius: 3rem;
  transition: 0.3s all;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
const PauseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  color: #9e9e9e;
  transition: 0.3s all;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
    color: white;
  }
`;
