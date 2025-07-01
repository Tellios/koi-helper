import { Id, IImageReference } from '@shared/models';
import { Box } from '@mui/material';
import * as React from 'react';
import { getImageReferences } from '../operations';
import { ImageContent } from './ImageContent';
import { ImageLazyLoader } from './ImageLazyLoader';
import { getProfileReferenceId } from '@shared/getProfileReferenceId';

interface IImageProfileProps {
  referenceId: Id;
  fallback?: React.ReactNode;
}

export const ImageProfile: React.FC<IImageProfileProps> = ({ referenceId, fallback }) => {
  const [profileImageReference, setProfileImageReference] = React.useState<
    IImageReference | undefined
  >(undefined);

  const getProfileImage = React.useCallback((id) => {
    getImageReferences(getProfileReferenceId(id)).then((imageReferences) => {
      if (imageReferences.length > 0) {
        setProfileImageReference(imageReferences[0]);
      } else {
        setProfileImageReference(undefined);
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
      {profileImageReference && (
        <ImageLazyLoader image={profileImageReference} isThumbnail>
          {(imageData, ref, isLoading) => (
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
            />
          )}
        </ImageLazyLoader>
      )}

      {!profileImageReference && fallback && (
        <Box
          sx={{
            width: 100,
            height: 100,
          }}
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
