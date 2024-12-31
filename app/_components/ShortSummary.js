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
        {currentOverActivity.map((bowl, i) => {
          if (bowl.type === "WD") return <Wide bowl={bowl} key={i} />;
          else if (bowl.type === "NO") return <NO bowl={bowl} key={i} />;
          else if (bowl.type === "W") return <Wicket bowl={bowl} key={i} />;
          else if (bowl.run === 6 || bowl.run === 4)
            return <Boundary bowl={bowl} key={i} />;
          else
            return (
              <span
                key={i}
                className="font-bold bg-indigo-500 text-white px-3 text-lg"
              >
                {!bowl.type || ` ${bowl.type}+`}
                {bowl.run}
              </span>
            );
        })}
      </p>
    </div>
  );
}

function Wide(bowl) {
  console.log(bowl);
  return (
    <span className="font-bold bg-gray-400 text-gray-50 px-3 text-lg">
      WD+{+bowl.bowl.run - 1}
    </span>
  );
}
function NO(bowl) {
  return (
    <span className="font-bold bg-gray-400 text-gray-50 px-3 text-lg">
      NO+{+bowl.bowl.run - 1}
    </span>
  );
}
function Wicket(bowl) {
  return (
    <span className="font-bold bg-red-500 text-gray-50 px-3 text-lg">
      W{bowl.bowl.run ? `+${bowl.bowl.run}` : ""}
    </span>
  );
}

function Boundary(bowl) {
  return (
    <span className="font-bold bg-green-500 text-gray-50 px-3 text-lg">
      {bowl.bowl.run}
    </span>
  );
}

export default ShortSummary;
