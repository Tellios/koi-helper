import { IImageReference } from '@shared/models';
import { Box, useTheme } from '@mui/material';
import * as React from 'react';
import { ImageContent } from './ImageContent';
import { ImageLazyLoader } from './ImageLazyLoader';
import { ImageTileBar } from './ImageTileBar';

interface IImageTileProps {
  reference: IImageReference;
  selected?: boolean;
  onClick?: () => void;
}

export const ImageTile: React.FunctionComponent<IImageTileProps> = ({
  reference,
  selected,
  onClick,
}) => {
  const ref = React.createRef<HTMLButtonElement>();
  const theme = useTheme();

  React.useEffect(() => {
    if (selected && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
      ref.current.focus();
    }
  }, [ref, selected]);

  return (
    <Box
      key={reference.id}
      component="button"
      ref={ref}
      sx={{
        display: 'block',
        height: '160px',
        margin: 0.5,
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',

        '&:focus': {
          outline: `2px solid ${theme.palette.primary.light}`,
        },
      }}
      onClick={onClick}
    >
      <ImageLazyLoader image={reference} isThumbnail>
        {(imageData, ref, isLoading) => {
          return (
            <ImageContent
              imageContainerSx={{
                height: '160px',
                maxWidth: '240px',
              }}
              imgSx={{
                objectFit: 'cover',
              }}
              imageContainerRef={ref}
              isLoading={isLoading}
              imageName={reference.name}
              imageData={imageData}
            />
          );
        }}
      </ImageLazyLoader>
      <ImageTileBar title={reference.name} />
    </Box>
  );
};
