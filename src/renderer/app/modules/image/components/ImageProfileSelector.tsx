import * as React from "react";
import { makeStyles, Box, Button, Tooltip } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import { Id, getProfileReferenceId, IImageReference } from "app/storage";
import { useAppState } from "app/state";
import { DeleteButton } from "app/ui";
import { t } from "app/i18n";
import { getImageReferences, deleteImage } from "../operations";
import { ImageLazyLoader } from "./ImageLazyLoader";
import { ImageContent } from "./ImageContent";

const useStyles = makeStyles(theme => ({
  root: {
    width: 100,
    height: 100
  },
  addProfileImage: {
    width: "100%",
    height: "100%",
    borderColor: theme.palette.common.black,
    borderStyle: "dashed",
    borderWidth: "2px",
    textAlign: "center"
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
  },
  imageActions: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0000004f"
  },
  imageActionButton: {
    color: theme.palette.common.white
  }
}));

interface IImageProfileProps {
  referenceId: Id;
}

export const ImageProfileSelector: React.FC<IImageProfileProps> = ({
  referenceId
}) => {
  const classes = useStyles();
  const { actions } = useAppState();
  const [profileImageReference, setProfileImageReference] = React.useState<
    IImageReference | undefined
  >(undefined);
  const [hasImage, setHasImage] = React.useState<boolean | undefined>(
    undefined
  );

  const getProfileImage = React.useCallback(() => {
    getImageReferences(getProfileReferenceId(referenceId)).then(
      imageReferences => {
        if (imageReferences.length > 0) {
          setProfileImageReference(imageReferences[0]);
          setHasImage(true);
        } else {
          setHasImage(false);
        }
      }
    );
  }, [referenceId]);

  React.useEffect(() => {
    getProfileImage();
  }, [referenceId]);

  return (
    <Box className={classes.root}>
      {hasImage === false && (
        <Tooltip aria-label="add" title={t.common.imageProfile.addAction}>
          <Button
            className={classes.addProfileImage}
            onClick={async () => {
              await actions.uploadImages({
                referenceId: getProfileReferenceId(referenceId),
                type: "Profile"
              });
              getProfileImage();
            }}
          >
            <AddAPhoto />
          </Button>
        </Tooltip>
      )}

      {hasImage === true && profileImageReference && (
        <ImageLazyLoader image={profileImageReference!} isThumbnail>
          {(imageData, ref, isLoading) => {
            return (
              <ImageContent
                imageContainerClassName={classes.imageContainer}
                imgClassName={classes.image}
                imageContainerRef={ref}
                isLoading={isLoading}
                imageName={profileImageReference.name}
                imageData={imageData}
              >
                <div className={classes.imageActions}>
                  <DeleteButton
                    className={classes.imageActionButton}
                    onDelete={async () => {
                      await deleteImage(profileImageReference.id);
                      setHasImage(false);
                      setProfileImageReference(undefined);
                    }}
                  />
                </div>
              </ImageContent>
            );
          }}
        </ImageLazyLoader>
      )}
    </Box>
  );
};
