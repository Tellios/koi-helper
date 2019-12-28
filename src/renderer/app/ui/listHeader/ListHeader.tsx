import * as React from "react";
import { Typography, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  actionArea: {
    marginLeft: "auto",
    display: "flex",
    alignContent: "center"
  }
}));

export type ListHeaderTitleVariant = "large" | "small" | "none";

export interface IListHeaderProps {
  title: string;
  actionArea?: React.ReactNode;
  titleVariant?: ListHeaderTitleVariant;
  className?: string;
}

export const ListHeader: React.FunctionComponent<IListHeaderProps> = ({
  title,
  actionArea,
  titleVariant = "large",
  className
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" className={className}>
      {titleVariant !== "none" && (
        <Typography variant={titleVariant === "large" ? "h4" : "h6"}>
          {title}
        </Typography>
      )}

      {actionArea && <Box className={classes.actionArea}>{actionArea}</Box>}
    </Box>
  );
};
