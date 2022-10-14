import styled from "styled-components";

function RecoderControllerUI({
  downloadURL,
  onDownload,
  soundFile,
  backToRecoding,
  onSubmitAudioFile,
}) {
  return onDownload ? (
    <>
      <DownloadButton href={downloadURL} download={soundFile.name}>
        다운로드
      </DownloadButton>
      <BackToRecoding onClick={backToRecoding}>다시 녹음</BackToRecoding>
    </>
  ) : (
    <CheckRecoding onClick={onSubmitAudioFile}>결과 확인</CheckRecoding>
  );
}

export default RecoderControllerUI;

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
