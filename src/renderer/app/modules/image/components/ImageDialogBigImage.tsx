import * as React from "react";
import { IImageReference } from "app/storage";
import { ImageLazyLoader } from "./ImageLazyLoader";
import { CircularProgress, makeStyles } from "@material-ui/core";

interface IImageDialogBigImage {
  reference: IImageReference;
}

const useStyles = makeStyles(() => ({
  imageRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  }
}));

export const ImageDialogBigImage: React.FunctionComponent<
  IImageDialogBigImage
> = ({ reference }) => {
  const classes = useStyles();

  return (
    <ImageLazyLoader image={reference} isThumbnail={false}>
      {(imageData, ref, isLoading) => {
        return (
          <div ref={ref} className={classes.imageRoot}>
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
  );
};
