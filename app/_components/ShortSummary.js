import { useInnings } from "../_context/InningsContext";

function ShortSummary() {
  const { currentOverActivity } = useInnings();
  return (
    <div className="flex">
      <p>Current Over :</p>
      <p className="flex gap-1">
        {currentOverActivity.map((bowl, i) => (
          <span key={i} className="border border-green-200 px-2">
            {!bowl.type || `${bowl.type}-`}
            {bowl.run}
          </span>
        ))}
      </p>
    </div>
  );
}

export default ShortSummary;
