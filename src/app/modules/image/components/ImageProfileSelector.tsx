import { t } from '@shared/i18n';
import { DeleteButton } from '@app/ui';
import { AddAPhoto } from '@mui/icons-material';
import { Box, Button, Tooltip, useTheme } from '@mui/material';
import { getProfileReferenceId } from '@shared/getProfileReferenceId';
import { Id, IImageReference } from '@shared/models';
import * as React from 'react';
import { useImageUploadStore } from '../image-upload-store';
import { deleteImage, getImageReferences } from '../operations';
import { ImageContent } from './ImageContent';
import { ImageLazyLoader } from './ImageLazyLoader';

interface IImageProfileProps {
  referenceId: Id;
}

export const ImageProfileSelector: React.FC<IImageProfileProps> = ({ referenceId }) => {
  const theme = useTheme();
  const { uploadImages } = useImageUploadStore();
  const [profileImageReference, setProfileImageReference] = React.useState<
    IImageReference | undefined
  >(undefined);
  const [hasImage, setHasImage] = React.useState<boolean | undefined>(undefined);

  const getProfileImage = React.useCallback((id) => {
    getImageReferences(getProfileReferenceId(id)).then((imageReferences) => {
      if (imageReferences.length > 0) {
        setProfileImageReference(imageReferences[0]);
        setHasImage(true);
      } else {
        setHasImage(false);
      }
    });
  }, []);

  React.useEffect(() => {
    getProfileImage(referenceId);
  }, [getProfileImage, referenceId]);

  return (
    <Box
      sx={{
        width: 100,
        height: 100,
      }}
    >
      {hasImage === false && (
        <Tooltip aria-label="add" title={t.common.imageProfile.addAction}>
          <Button
            sx={{
              width: '100%',
              height: '100%',
              borderColor: theme.palette.common.black,
              borderStyle: 'dashed',
              borderWidth: '2px',
              textAlign: 'center',
            }}
            onClick={async () => {
              await uploadImages({
                referenceId: getProfileReferenceId(referenceId),
                type: 'Profile',
              });
              getProfileImage(referenceId);
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
                imageContainerSx={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #9c9c9c',
                  position: 'relative',
                }}
                imgSx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                imageContainerRef={ref}
                isLoading={isLoading}
                imageName={profileImageReference.name}
                imageData={imageData}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#0000004f',
                  }}
                >
                  <DeleteButton
                    sx={{
                      color: theme.palette.common.white,
                    }}
                    onDelete={async () => {
                      await deleteImage(profileImageReference.id);
                      setHasImage(false);
                      setProfileImageReference(undefined);
                    }}
                  />
                </Box>
              </ImageContent>
            );
          }}
        </ImageLazyLoader>
      )}
    </Box>
  );
};
