import * as React from "react";
import { makeStyles, Box } from "@material-ui/core";
import { Id, getProfileReferenceId, IImageReference } from "app/storage";
import { ImageLazyLoader } from "./ImageLazyLoader";
import { ImageContent } from "./ImageContent";
import { getImageReferences } from "../operations";

const useStyles = makeStyles(() => ({
  root: {
    width: 100,
    height: 100
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    border: "1px solid #9c9c9c",
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
}));

interface IImageProfileProps {
  referenceId: Id;
  fallback?: React.ReactNode;
}

export const ImageProfile: React.FC<IImageProfileProps> = ({
  referenceId,
  fallback
}) => {
  const classes = useStyles();
  const [profileImageReference, setProfileImageReference] = React.useState<
    IImageReference | undefined
  >(undefined);

  const getProfileImage = React.useCallback(() => {
    getImageReferences(getProfileReferenceId(referenceId)).then(
      imageReferences => {
        if (imageReferences.length > 0) {
          setProfileImageReference(imageReferences[0]);
        } else {
          setProfileImageReference(undefined);
        }
      }
    );
  }, [referenceId]);

  React.useEffect(() => {
    getProfileImage();
  }, [referenceId]);

  return (
    <Box className={classes.root}>
      {profileImageReference && (
        <ImageLazyLoader image={profileImageReference} isThumbnail>
          {(imageData, ref, isLoading) => (
            <ImageContent
              imageContainerClassName={classes.imageContainer}
              imgClassName={classes.image}
              imageContainerRef={ref}
              isLoading={isLoading}
              imageName={profileImageReference.name}
              imageData={imageData}
            />
          )}
        </ImageLazyLoader>
      )}

      {!profileImageReference && fallback && (
        <Box
          className={classes.imageContainer}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {fallback}
        </Box>
      )}
    </Box>
  );
};
