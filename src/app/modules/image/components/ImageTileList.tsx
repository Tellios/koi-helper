import { IImageReference, Id } from '@app/storage';
import { Box } from '@mui/material';
import * as React from 'react';
import { ImageTile } from './ImageTile';

interface IImageTileListProps {
  references: IImageReference[];
  onImageClicked: (id: Id) => void;
}

export const ImageTileList: React.FunctionComponent<IImageTileListProps> = ({
  references,
  onImageClicked,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {references.map((reference) => (
        <ImageTile
          key={reference.id}
          reference={reference}
          onClick={() => onImageClicked(reference.id)}
        />
      ))}
    </Box>
  );
};
