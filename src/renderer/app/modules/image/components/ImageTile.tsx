import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { IImageReference } from "app/storage";
import { ImageLazyLoader } from "./ImageLazyLoader";
import { ImageTileBar } from "./ImageTileBar";
import { ImageContent } from "./ImageContent";

const useStyles = makeStyles(theme => ({
  imageTile: {
    display: "block",
    height: "160px",
    margin: theme.spacing(0.5),
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",

    "&:focus": {
      outline: `2px solid ${theme.palette.primary.light}`
    }
  },
  imageContainer: {
    height: "160px",
    maxWidth: "240px"
  },
  image: {
    objectFit: "cover"
  }
}));

interface IImageTileProps {
  reference: IImageReference;
  selected?: boolean;
  onClick?: () => void;
}

export const ImageTile: React.FunctionComponent<IImageTileProps> = ({
  reference,
  selected,
  onClick
}) => {
  const classes = useStyles();
  const ref = React.createRef<HTMLButtonElement>();

  React.useEffect(() => {
    if (selected && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
      ref.current.focus();
    }
  }, [selected]);

  return (
    <button
      key={reference.id}
      ref={ref}
      className={classes.imageTile}
      onClick={onClick}
    >
      <ImageLazyLoader image={reference} isThumbnail>
        {(imageData, ref, isLoading) => {
          return (
            <ImageContent
              imageContainerClassName={classes.imageContainer}
              imgClassName={classes.image}
              imageContainerRef={ref}
              isLoading={isLoading}
              imageName={reference.name}
              imageData={imageData}
            />
          );
        }}
      </ImageLazyLoader>
      <ImageTileBar title={reference.name} />
    </button>
  );
};
