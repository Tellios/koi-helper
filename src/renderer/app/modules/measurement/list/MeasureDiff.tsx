import * as React from "react";
import { Typography } from "@material-ui/core";

interface IMeasureDiff {
  newValue: number;
  oldValue?: number;
}

type DiffType = "Increase" | "Decrease" | "NoChange";

export const MeasureDiff: React.FC<IMeasureDiff> = ({ newValue, oldValue }) => {
  const diff = newValue - (oldValue ?? newValue);

  let diffType: DiffType = "NoChange";

  if (diff > 0) {
    diffType = "Increase";
  } else if (diff < 0) {
    diffType = "Decrease";
  }

  let text: string = "";

  if (diffType !== "NoChange") {
    text += "(";

    if (diffType === "Increase") {
      text += "+";
    } else if (diffType === "Decrease") {
      text += "-";
    }

    text += diff;
    text += ")";
  }

  return <Typography color="textSecondary">{text}</Typography>;
};
