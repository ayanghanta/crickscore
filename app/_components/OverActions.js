import { useState } from "react";
import { useInnings } from "../_context/InningsContext";
import Button from "./Button";
import OutTypes from "./OutTypes";
import ExtrasActions from "./ExtrasActions";
import Modal from "./ui/Modal";
import ByesRun from "./ByesRun";

function OverActions() {
  const [fallWicket, setFallWicket] = useState(false);
  const {
    dispatch,
    isFreeHit,
    isGameOn,
    currentBatters,
    onStrike,
    currentBowler,
  } = useInnings();

  function scoreValidRun(run) {
    // dispatch({ type: "scoreRun", payload: run });
    dispatch({
      type: "scoreRun",
      payload: {
        bowler: currentBowler,
        batter: currentBatters[onStrike],
        run,
      },
    });
  }

  function handleWicketFall(wicketType, outBatter, run = 0, isByesRun) {
    setFallWicket(false);
    dispatch({
      type: "wicketFall",
      payload: {
        wicketType,
        batter: currentBatters[onStrike],
        bowler: currentBowler,
        outBatter,
        run,
        isByesRun,
      },
    });
  }

  function handleWideBall(run) {
    dispatch({
      type: "bowlWideBall",
      payload: {
        bowler: currentBowler,
        batter: currentBatters[onStrike],
        run: 1,
      },
    });
  }

  function handleNoBall(run) {
    dispatch({
      type: "bowlNoBall",
      payload: {
        bowler: currentBowler,
        batter: currentBatters[onStrike],
        run: 1,
      },
    });
  }

  // function handleExtraAction(bawlType) {}

  if (!isGameOn) return null;

  return (
    <div>
      {isFreeHit && (
        <p className="w-4/5 mx-auto bg-amber-400 font-bold text-center text-red-500 py-1.5">
          FREE HIT 💥
        </p>
      )}
      <Modal>
        <div className="grid grid-cols-5 border border-gray-200 py-6 px-4 gap-x-2 gap-y-2 md:w-4/5 mx-auto">
          <Button onClick={() => scoreValidRun(0)}>0</Button>
          <Button onClick={() => scoreValidRun(1)}>1</Button>
          <Button onClick={() => scoreValidRun(2)}>2</Button>

          <div className="border border-gray-200 p-1 space-x-1 grid grid-cols-[8fr_2fr]">
            <Button onClick={() => handleWideBall(1)}>Wide</Button>
            <Modal.Button id="wide">
              <Button>+</Button>
            </Modal.Button>
          </div>

          <Modal.Button id="byesRun">
            <Button>Byes</Button>
          </Modal.Button>

          <Button onClick={() => scoreValidRun(3)}>3</Button>
          <Button onClick={() => scoreValidRun(4)}>4</Button>
          <Button onClick={() => scoreValidRun(6)}>6</Button>

          <div className="border border-gray-200 p-1 space-x-1 grid grid-cols-[8fr_2fr]">
            <Button onClick={() => handleNoBall(1)}>NO</Button>

            <Modal.Button id="no">
              <Button>+</Button>
            </Modal.Button>
          </div>

          <Modal.Button id="wicket">
            <p className="bg-red-400 text-white hover:bg-red-500 space-x-2 px-2 py-1 transition duration-200 font-bold text-lg flex items-center justify-center cursor-pointer">
              <span>WICKET</span>
            </p>
          </Modal.Button>
        </div>
        <Modal.Window id="wicket">
          <OutTypes outHandler={handleWicketFall} />
        </Modal.Window>

        <Modal.Window id="wide">
          <ExtrasActions bowlType="wide" />
        </Modal.Window>

        <Modal.Window id="no">
          <ExtrasActions bowlType="no" />
        </Modal.Window>

        <Modal.Window id="byesRun">
          <ByesRun />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default OverActions;
