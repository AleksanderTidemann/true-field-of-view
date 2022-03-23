import { createTimeOfInterest } from "astronomy-bundle/time";
import { angleCalc } from "astronomy-bundle/utils";
import { createMoon } from "astronomy-bundle/moon";

export const getDeg = () => {
  const result = angleCalc.deg2angle(132.6029282);
  return result;
};

export const getMoon = () => {
  const toi = createTimeOfInterest.fromCurrentTime();
  const result = createMoon(toi);
  return result;
};
