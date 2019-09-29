import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { IImageReference } from "app/storage";
import { ImageTile } from "./ImageTile";

const useStyles = makeStyles(() => ({
  imageListContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
}));

interface IImageTileListProps {
  references: IImageReference[];
}

export const ImageTileList: React.FunctionComponent<IImageTileListProps> = ({
  references
}) => {
  const classes = useStyles();

  return (
    <div className={classes.imageListContainer}>
      {references.map(reference => (
        <ImageTile key={reference.id} reference={reference} />
      ))}
    </div>
  );
};
