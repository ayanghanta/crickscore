function ByesCheck({ handler, runType, condition = true }) {
  return (
    <div className="flex space-x-4 items-center mb-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={runType === "byes"}
          onChange={() => handler("byes")}
          id="byes"
          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor="byes"
          className="text-gray-700 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        >
          Byes
        </label>
      </div>
      {condition && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={runType === "run"}
            onChange={() => handler("run")}
            id="run"
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="run"
            className="text-gray-700 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
          >
            Run
          </label>
        </div>
      )}
    </div>
  );
}

export default ByesCheck;
