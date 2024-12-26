function RunoutType({ handler, outType, bowlType }) {
  return (
    <div className="flex space-x-4 items-center mb-3">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={outType === "run-out"}
          onChange={() => handler("run-out")}
          id="run-out"
          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor="run-out"
          className="text-gray-700 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        >
          Run out
        </label>
      </div>

      {bowlType !== "no" && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={outType === "stumps"}
            onChange={() => handler("stumps")}
            id="stumps"
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="stumps"
            className="text-gray-700 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
          >
            Stumps
          </label>
        </div>
      )}
    </div>
  );
}
export default RunoutType;
