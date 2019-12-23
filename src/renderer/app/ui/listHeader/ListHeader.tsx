import * as React from "react";
import { Typography, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  actionArea: {
    marginLeft: "auto",
    display: "flex",
    alignContent: "center"
  }
}));

export interface IListHeaderProps {
  title: string;
  actionArea?: React.ReactNode;
  smallHeader?: boolean;
}

export const ListHeader: React.FunctionComponent<IListHeaderProps> = ({
  title,
  actionArea,
  smallHeader
}) => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <Typography variant={smallHeader ? "h6" : "h4"}>{title}</Typography>

      {actionArea && <Box className={classes.actionArea}>{actionArea}</Box>}
    </Box>
  );
};
