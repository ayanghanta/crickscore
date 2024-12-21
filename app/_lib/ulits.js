import uid from "tiny-uid";

export function calcLegalDelivary(balls) {
  const totalLegalBalls = balls.filter((delivary) => delivary.isLegal);

  return totalLegalBalls.length;
}

export function rotateStrike(
  lastDelivery,
  onFieldBatters,
  currentStriker,
  isOverEnd
) {
  const isOddRun = lastDelivery.run % 2 === 1;
  const nonStrikerIndex = currentStriker === 0 ? 1 : 0;
  const currentStrikerIndex = currentStriker;

  let newStrikerIndex;

  if (lastDelivery.type === "WD") {
    if (isOddRun) newStrikerIndex = currentStrikerIndex;
    else newStrikerIndex = nonStrikerIndex;
  } else {
    if (isOddRun) newStrikerIndex = nonStrikerIndex;
    else newStrikerIndex = currentStrikerIndex;
  }

  if (isOverEnd) newStrikerIndex = newStrikerIndex === 0 ? 1 : 0;

  return newStrikerIndex;
}

export class Bowl {
  constructor(bowler, batter) {
    this.bowler = bowler;
    this.batter = batter;
    this.isLegal = true;
  }
  score(run) {
    this.run = run;
    return this;
  }
  notLegalDelivary() {
    this.isLegal = false;
    return this;
  }
  wideBall(run = 1) {
    this.run = run;
    this.isLegal = false;
    this.type = "WD";
    return this;
  }
  noBall(run) {
    this.run = run;
    this.isLegal = false;
    this.type = "NO";
    this.freeHit = true;
    return this;
  }
  wicketFall(run = 0, outBatter, wicketType) {
    this.run = run;
    this.type = "WICKET";
    this.outBatter = outBatter ?? this.batter;
    this.wicketType = "BOWLD";
    return this;
  }
}

export class Batter {
  constructor(name) {
    this.name = name;
    this.id = uid();
    this.runs = [];
  }
  scoreRun(run) {
    this.runs = [...this.runs, run];
  }
}
