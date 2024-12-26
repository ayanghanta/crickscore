import uid from "tiny-uid";

let MULTIPLIER;

if (process.env.NODE_ENV === "development") MULTIPLIER = 2;
if (process.env.NODE_ENV === "production") MULTIPLIER = 1;

export function caclTotalRun(allOversData) {
  const total = allOversData
    .flat()
    .map((bowl) => (bowl.run ? bowl.run : 0))
    .reduce((cur, acc) => acc + cur, 0);

  return total;
}

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
  getRun() {
    const totalRun =
      this.runs.map((run) => run.run).reduce((cur, acc) => cur + acc, 0) /
      MULTIPLIER;
    return totalRun;
  }

  getTotalPlayedBall() {
    const balls =
      this.runs.filter((ball) => ball.isLegal).length / MULTIPLIER || 0;
    return balls;
  }
  get4sCount() {
    return this.runs.filter((ball) => ball.run === 4).length / MULTIPLIER || 0;
  }
  get6sCount() {
    return this.runs.filter((ball) => ball.run === 6).length / MULTIPLIER || 0;
  }

  getStrikeRate() {
    const sr = (this.getRun() * 100) / this.getTotalPlayedBall() || 0;

    return sr.toFixed(2).padStart(5, "0");
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
  calcOver() {
    const totalBallBowl =
      this.delivarys.filter((ball) => ball.isLegal).length / MULTIPLIER;

    const fullOver = Math.trunc(totalBallBowl / 6);
    const balls = totalBallBowl % 6;

    const overBowl = +`${fullOver}.${balls}`;
    return overBowl.toFixed(1);
  }

  calcRunConceded() {
    const runs =
      this.delivarys
        .map((delivary) => delivary.run)
        .reduce((cur, acc) => cur + acc, 0) / MULTIPLIER;

    return runs;
  }

  calcTotalTake() {
    const wicketCount =
      this.delivarys.filter((delivary) => delivary.wicket === 1).length /
      MULTIPLIER;

    return wicketCount;
  }

  calcEnon() {
    const totalBallBowl =
      this.delivarys.filter((ball) => ball.isLegal).length / MULTIPLIER;
    const runsConced =
      this.delivarys
        .map((delivary) => delivary.run)
        .reduce((cur, acc) => cur + acc, 0) / MULTIPLIER;

    const economy = (runsConced / totalBallBowl) * 6 || 0;

    return economy.toFixed(2);
  }

  calcMaidenOver() {}
}
