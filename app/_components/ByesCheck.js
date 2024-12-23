function ByesCheck({ handler, runType, condition = true }) {
  return (
    <div className="space-x-1">
      <div>
        <input
          type="checkbox"
          checked={runType === "byes"}
          onChange={() => handler("byes")}
          id="byes"
        />
        <label htmlFor="byes" className="px-1 border">
          Byes
        </label>
      </div>
      {condition && (
        <div>
          <input
            type="checkbox"
            checked={runType === "run"}
            onChange={() => handler("run")}
            id="run"
          />
          <label htmlFor="run" className="px-1 border">
            Run
          </label>
        </div>
      )}
    </div>
  );
}

export default ByesCheck;
