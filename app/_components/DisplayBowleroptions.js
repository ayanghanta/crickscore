import { useState } from "react";
import Button from "./Button";

function DisplayBowleroptions({ bowlerList, handleSelect }) {
  const [isSelect, setIsSelect] = useState(false);

  function handleClick(id) {
    const existingBowler = bowlerList
      .filter((bowler) => bowler.id === id)
      .at(0);

    handleSelect(existingBowler);
    setIsSelect(true);
  }

  if (bowlerList.length === 0 || isSelect) return null;
  return (
    <div className=" flex gap-0.5 flex-col items-start bg-white ">
      {bowlerList.map((bowler) => (
        <Button
          key={bowler.id}
          type="option"
          onClick={() => handleClick(bowler.id)}
        >
          {bowler.name}
        </Button>
      ))}
    </div>
  );
}

export default DisplayBowleroptions;
