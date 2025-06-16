import { Box, CircularProgress, SxProps, Theme } from '@mui/material';
import * as React from 'react';

interface IImageContentProps {
  imageContainerRef: React.Ref<HTMLElement>;
  imageContainerSx: SxProps<Theme>;
  imgSx: SxProps<Theme>;
  imageData: string | null;
  imageName: string;
  isLoading: boolean;
}

export const ImageContent: React.FC<React.PropsWithChildren<IImageContentProps>> = ({
  imageContainerRef,
  imageContainerSx,
  imgSx,
  imageData,
  imageName,
  isLoading,
  children,
}) => {
  return (
    <Box ref={imageContainerRef} sx={imageContainerSx}>
      {isLoading && <CircularProgress />}
      {imageData !== null && (
        <Box
          component="img"
          alt={imageName}
          src={`data:image/png;base64, ${imageData}`}
          sx={imgSx}
        />
      )}

      {children}
    </Box>
  );
};
