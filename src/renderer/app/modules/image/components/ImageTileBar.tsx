import * as React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  barContainer: {
    position: "relative",
    bottom: "40px",
    left: "0",
    right: "0",
    width: "240px",
    height: "40px",

    color: "#ffffff",
    backgroundColor: "#1b1b1bad",

    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

interface IImageTileBarProps {
  title: string;
}

export const ImageTileBar: React.FunctionComponent<IImageTileBarProps> = ({
  title
}) => {
  const classes = useStyles();

  return (
    <div className={classes.barContainer}>
      <span>{title}</span>
    </div>
  );
};
