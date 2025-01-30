import Button from "./Button";

function RunOptions({ clickHandler }) {
  return (
    <div className="flex gap-2 mb-6">
      <Button type="modalRun" onClick={() => clickHandler(0)}>
        0
      </Button>
      <Button type="modalRun" onClick={() => clickHandler(1)}>
        1
      </Button>
      <Button type="modalRun" onClick={() => clickHandler(2)}>
        2
      </Button>
      <Button type="modalRun" onClick={() => clickHandler(3)}>
        3
      </Button>
      <Button type="modalRun" onClick={() => clickHandler(4)}>
        4
      </Button>
      <Button type="modalRun" onClick={() => clickHandler(6)}>
        6
      </Button>
    </div>
  );
}

export default RunOptions;
