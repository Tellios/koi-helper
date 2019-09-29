import * as React from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  CircularProgress,
  makeStyles
} from "@material-ui/core";
import { IImageReference } from "app/storage";
import { ImageLazyLoader } from "./ImageLazyLoader";

const useStyles = makeStyles(() => ({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px"
  },
  image: {
    objectFit: "cover"
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
    <GridList cellHeight={180}>
      {references.map(reference => {
        return (
          <GridListTile key={reference.id}>
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
            <GridListTileBar title={reference.name} />
          </GridListTile>
        );
      })}
    </GridList>
  );
};
