import * as React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%"
  }
}));

interface IRowProps {
  children: React.ReactNodeArray | React.ReactNode;
}

export const Row: React.FC<IRowProps> = ({ children }) => {
  const classes = useStyles();

  return <Box className={classes.row}>{children}</Box>;
};
