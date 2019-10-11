import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { IImageReference, Id } from "app/storage";
import { ImageTile } from "./ImageTile";

const useStyles = makeStyles(() => ({
  imageListContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "hidden",
    overflowY: "hidden"
  }
}));

interface IImageDialogThumbnailList {
  references: IImageReference[];
  selectedImage: Id;
  onImageSelected: (id: Id) => void;
}

export const ImageDialogThumbnailList: React.FunctionComponent<
  IImageDialogThumbnailList
> = ({ references, selectedImage, onImageSelected }) => {
  const classes = useStyles();

  return (
    <div className={classes.imageListContainer}>
      {references.map(reference => (
        <ImageTile
          key={reference.id}
          reference={reference}
          selected={selectedImage === reference.id}
          onClick={() => onImageSelected(reference.id)}
        />
      ))}
    </div>
  );
};
