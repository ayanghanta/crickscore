import { useState } from "react";
import RunOptions from "./RunOptions";
import Button from "./Button";
import { useInnings } from "../_context/InningsContext";

function ByesRun({ handelCloseModal }) {
  const [byesRun, setByesRun] = useState(0);
  const { dispatch, currentBatters, currentBowler, onStrike } = useInnings();
  function handleClick(run) {
    setByesRun(run);
  }

  function handleSubmit() {
    dispatch({
      type: "byesRun",
      payload: {
        bowler: currentBowler,
        batter: currentBatters[onStrike],
        run: byesRun,
      },
    });
    handelCloseModal();
  }

  return (
    <div>
      <p className="text-lg font-semibold text-indigo-400 mb-6 text-center">
        Byes Run ({byesRun})
      </p>
      <RunOptions clickHandler={handleClick} />

      <div className="text-center">
        <Button type="modalPrimary" onClick={handleSubmit}>
          Save action
        </Button>
      </div>
    </div>
  );
}

export default ByesRun;
