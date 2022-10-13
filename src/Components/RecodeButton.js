import styled from "styled-components";
import { BsFillMicFill } from "react-icons/bs";
import { useCallback, useState } from "react";

function RecodeButton({ onClickRecodButton, recodingValue }) {
  return (
    <Container onClick={onClickRecodButton}>
      <BsFillMicFill />
    </Container>
  );
}

export default RecodeButton;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  font-size: 1.7rem;
  color: white;
  background-color: #fc264a;
  border-radius: 3rem;
  transition: 0.3s all;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
