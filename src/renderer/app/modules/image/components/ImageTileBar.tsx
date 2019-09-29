import * as React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  barContainer: {
    position: "relative",
    bottom: "50px",
    left: "-3px",
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
