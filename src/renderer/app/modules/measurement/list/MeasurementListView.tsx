import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { Id } from "app/storage";
import { useAppState } from "app/state";
import { MeasurementItem } from "./MeasurementItem";

const useStyles = makeStyles(() => ({
  list: {
    display: "flex",
    flexDirection: "column"
  }
}));

export interface IMeasurementListViewProps {
  fishId: Id;
}

export const MeasurementListView: React.FunctionComponent<
  IMeasurementListViewProps
> = ({ fishId }) => {
  const classes = useStyles();
  const { state, actions } = useAppState();

  React.useEffect(() => {
    actions.getMeasurements(fishId);
  }, [fishId]);

  const listItems = state.measurements.map(measurement => (
    <MeasurementItem key={measurement.id} measurement={measurement} />
  ));

  return <div className={classes.list}>{listItems}</div>;
};
