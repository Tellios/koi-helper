import * as React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "auto",
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  },
  fillWidth: {
    flex: "2 1 0px"
  },
  disableScroll: {
    overflowY: "hidden"
  }
}));

interface IContentColumnProps {
  children: React.ReactNode;
  fillWidth?: boolean;
  disableScroll?: boolean;
}

export const ContentCard: React.FC<IContentColumnProps> = ({
  children,
  fillWidth,
  disableScroll
}) => {
  const classes = useStyles();
  const classNames = clsx(classes.root, {
    [classes.fillWidth]: fillWidth,
    [classes.disableScroll]: disableScroll
  });

  return <Paper className={classNames}>{children}</Paper>;
};
