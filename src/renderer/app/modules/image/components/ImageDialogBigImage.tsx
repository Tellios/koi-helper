import * as React from "react";
import { IImageReference } from "app/storage";
import { ImageLazyLoader } from "./ImageLazyLoader";
import { makeStyles } from "@material-ui/core";
import { ImageContent } from "./ImageContent";

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

export const ImageDialogBigImage: React.FunctionComponent<IImageDialogBigImage> = ({
  reference
}) => {
  const classes = useStyles();

  return (
    <ImageLazyLoader image={reference} isThumbnail={false}>
      {(imageData, ref, isLoading) => {
        return (
          <ImageContent
            imageContainerClassName={classes.imageRoot}
            imgClassName={classes.image}
            imageContainerRef={ref}
            isLoading={isLoading}
            imageName={reference.name}
            imageData={imageData}
          />
        );
      }}
    </ImageLazyLoader>
  );
};
