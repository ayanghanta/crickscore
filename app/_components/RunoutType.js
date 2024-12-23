function RunoutType({ handler, outType, bowlType }) {
  return (
    <div className="space-x-1">
      <div>
        <input
          type="checkbox"
          checked={outType === "run-out"}
          onChange={() => handler("run-out")}
          id="run-out"
        />
        <label htmlFor="run-out" className="px-1 border">
          Run out
        </label>
      </div>

      {bowlType !== "no" && (
        <div>
          <input
            type="checkbox"
            checked={outType === "stumps"}
            onChange={() => handler("stumps")}
            id="stumps"
          />
          <label htmlFor="stumps" className="px-1 border">
            Stumps
          </label>
        </div>
      )}
    </div>
  );
}
export default RunoutType;
