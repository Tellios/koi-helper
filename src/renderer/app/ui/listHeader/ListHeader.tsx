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
}

export const ListHeader: React.FunctionComponent<IListHeaderProps> = ({
  title,
  actionArea
}) => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <Typography variant="h4">{title}</Typography>

      {actionArea && <Box className={classes.actionArea}>{actionArea}</Box>}
    </Box>
  );
};
