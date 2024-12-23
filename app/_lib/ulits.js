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

  if (lastDelivery.type === "WD" || lastDelivery.type === "NO") {
    if (isOddRun) newStrikerIndex = currentStrikerIndex;
    else newStrikerIndex = nonStrikerIndex;
  } else {
    if (isOddRun) newStrikerIndex = nonStrikerIndex;
    else newStrikerIndex = currentStrikerIndex;
  }

  if (isOverEnd) newStrikerIndex = newStrikerIndex === 0 ? 1 : 0;

  return newStrikerIndex;
}

export const getRunData = (bowl) => {
  return { isLegal: bowl.isLegal, run: bowl.run, wicket: bowl.wicket ? 1 : 0 };
};

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
    this.wicket = true;
    this.type = this.type ? this.type : "W";
    this.outBatter = outBatter ?? this.batter;
    this.wicketType = wicketType;
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

export class Bowler {
  constructor(name) {
    this.name = name;
    this.id = uid();
    this.delivarys = [];
  }
  bowl(ball) {
    this.delivarys = [...this.delivarys, ball];
  }
}
