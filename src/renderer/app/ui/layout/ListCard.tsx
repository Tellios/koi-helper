import * as React from "react";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    overflowY: "auto",
    margin: theme.spacing(1),
    minWidth: 280,
    flex: "1 1 0px"
  }
}));

interface IListColumnProps {
  children: React.ReactNode;
}

export const ListCard: React.FC<IListColumnProps> = ({ children }) => {
  const classes = useStyles();

  return <Paper className={classes.card}>{children}</Paper>;
};
