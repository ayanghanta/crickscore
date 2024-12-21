"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMatchContext } from "../_context/MatchContext";

function OverForm() {
  const [over, setOver] = useState(0);
  const router = useRouter();
  const { dispatch } = useMatchContext();

  function handleSubmit(e) {
    e.preventDefault();
    if (!over) return;

    dispatch({ type: "setOver", payload: over });
    router.push("/batting");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="over">Over:</label>
        <input
          type="number"
          min={0}
          id="over"
          className="text-gray-700"
          value={over}
          onChange={(e) => setOver(+e.target.value)}
        />
        {over > 1 && <button>Next</button>}
      </form>
    </div>
  );
}

export default OverForm;
