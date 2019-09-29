import * as React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { IImageReference } from "app/storage";
import { ImageLazyLoader } from "./ImageLazyLoader";
import { ImageTileBar } from "./ImageTileBar";

const useStyles = makeStyles(theme => ({
  imageTile: {
    display: "block",
    flexGrow: 1,
    width: "240px",
    height: "180px",
    margin: theme.spacing(0.5),
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer"
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "180px",
    maxWidth: "240px"
  },
  image: {
    objectFit: "cover"
  }
}));

interface IImageTileProps {
  reference: IImageReference;
}

export const ImageTile: React.FunctionComponent<IImageTileProps> = ({
  reference
}) => {
  const classes = useStyles();

  return (
    <button key={reference.id} className={classes.imageTile}>
      <ImageLazyLoader image={reference} isThumbnail>
        {(imageData, ref, isLoading) => {
          return (
            <div ref={ref} className={classes.imageContainer}>
              {isLoading && <CircularProgress />}
              {imageData !== null && (
                <img
                  alt={reference.name}
                  src={`data:image/png;base64, ${imageData}`}
                  className={classes.image}
                />
              )}
            </div>
          );
        }}
      </ImageLazyLoader>
      <ImageTileBar title={reference.name} />
    </button>
  );
};
