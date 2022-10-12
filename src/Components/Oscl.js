function Oscl({ ChangeFreq, freq }) {
  return (
    <div>
      <input
        onChange={ChangeFreq}
        value={freq}
        max="1000"
        type="range"
        id="frequency"
      />
    </div>
  );
}

export default Oscl;
