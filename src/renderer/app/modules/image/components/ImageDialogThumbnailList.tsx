import * as React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { IImageReference, Id } from "app/storage";
import { ImageTile } from "./ImageTile";

const useStyles = makeStyles(theme => ({
  rootContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  imageListContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "hidden",
    overflowY: "hidden"
  },
  imageListButton: {
    alignSelf: "center",
    margin: theme.spacing(1)
  }
}));

interface IImageDialogThumbnailList {
  references: IImageReference[];
  selectedImage: Id;
  onImageSelected: (id: Id) => void;
  onSelectPrevious: () => void;
  onSelectNext: () => void;
}

export const ImageDialogThumbnailList: React.FunctionComponent<IImageDialogThumbnailList> = ({
  references,
  selectedImage,
  onImageSelected,
  onSelectPrevious,
  onSelectNext
}) => {
  const classes = useStyles();

  return (
    <div className={classes.rootContainer}>
      <IconButton
        className={classes.imageListButton}
        size="medium"
        color="primary"
        onClick={onSelectPrevious}
      >
        <ArrowBack />
      </IconButton>

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

      <IconButton
        className={classes.imageListButton}
        size="medium"
        color="primary"
        onClick={onSelectNext}
      >
        <ArrowForward />
      </IconButton>
    </div>
  );
};
