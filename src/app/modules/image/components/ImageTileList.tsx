import { Stack } from '@mui/material';
import { IImageReference, Id } from '@shared/models';
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
    <Stack
      direction="row"
      sx={{
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        overflow: 'hidden',
        overflowY: 'auto',
        height: '100%',
        paddingBottom: '1px',
        gap: 1,
      }}
    >
      {references.map((reference) => (
        <ImageTile
          key={reference.id}
          reference={reference}
          onClick={() => onImageClicked(reference.id)}
        />
      ))}
    </Stack>
  );
};
