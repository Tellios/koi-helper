import { IImageReference, Id } from '@shared/models';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, IconButton, useTheme } from '@mui/material';
import * as React from 'react';
import { ImageTile } from './ImageTile';

interface IImageDialogThumbnailList {
  references: IImageReference[];
  selectedImage: Id;
  onImageSelected: (id: Id) => void;
  onSelectPrevious: () => void;
  onSelectNext: () => void;
}

export const ImageDialogThumbnailList: React.FunctionComponent<IImageDialogThumbnailList> = ({
  references,
  selectedImage,
  onImageSelected,
  onSelectPrevious,
  onSelectNext,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'nowrap',
      }}
    >
      <IconButton
        sx={{
          alignSelf: 'center',
          margin: theme.spacing(1),
        }}
        size="medium"
        color="primary"
        onClick={onSelectPrevious}
      >
        <ArrowBack />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          overflowX: 'hidden',
          overflowY: 'hidden',
          gap: 1,
        }}
      >
        {references.map((reference) => (
          <ImageTile
            key={reference.id}
            reference={reference}
            selected={selectedImage === reference.id}
            onClick={() => onImageSelected(reference.id)}
          />
        ))}
      </Box>

      <IconButton
        sx={{
          alignSelf: 'center',
          margin: theme.spacing(1),
        }}
        size="medium"
        color="primary"
        onClick={onSelectNext}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};
