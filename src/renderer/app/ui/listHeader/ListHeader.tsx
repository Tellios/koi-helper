import * as React from "react";
import { Typography, makeStyles, Box } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  headerRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
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
  const rootClasses = clsx(classes.headerRoot, className);

  return (
    <Box display="flex" className={rootClasses}>
      {titleVariant !== "none" && (
        <Typography variant={titleVariant === "large" ? "h4" : "h6"}>
          {title}
        </Typography>
      )}

      {actionArea && <Box className={classes.actionArea}>{actionArea}</Box>}
    </Box>
  );
};
