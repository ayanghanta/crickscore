import { useInnings } from "../_context/InningsContext";

function ShortSummary() {
  const { currentOverActivity, isNewOver, isGameOn, isInningsEnd } =
    useInnings();

  if (currentOverActivity.length === 0)
    return (
      <div className="flex md:w-4/5 mx-auto mt-8 mb-8 border py-4 px-4 justify-center">
        <p className="text-indigo-500 font-semibold">No balls bowled yet.</p>
      </div>
    );

  return (
    <div className="flex md:w-4/5 mx-auto mt-8 mb-8 border py-3 px-4">
      <p className="font-bold text-indigo-700">
        {isNewOver ? "Previous over: " : "Current over: "}
      </p>

      <p className="flex gap-3">
        <span></span>
        <span></span>
        {currentOverActivity.map((bowl, i) => (
          <span
            key={i}
            className="font-bold bg-indigo-500 text-white px-3 text-lg"
          >
            {!bowl.type || ` ${bowl.type}-`}
            {bowl.run}
          </span>
        ))}
      </p>
    </div>
  );
}

export default ShortSummary;
