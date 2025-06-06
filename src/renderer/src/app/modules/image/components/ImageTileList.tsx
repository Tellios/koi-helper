import * as React from 'react';
import { makeStyles } from '@mui/material';
import { IImageReference, Id } from '@app/storage';
import { ImageTile } from './ImageTile';

const useStyles = makeStyles(() => ({
  imageListContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
}));

interface IImageTileListProps {
  references: IImageReference[];
  onImageClicked: (id: Id) => void;
}

export const ImageTileList: React.FunctionComponent<IImageTileListProps> = ({
  references,
  onImageClicked
}) => {
  const classes = useStyles();

  return (
    <div className={classes.imageListContainer}>
      {references.map((reference) => (
        <ImageTile
          key={reference.id}
          reference={reference}
          onClick={() => onImageClicked(reference.id)}
        />
      ))}
    </div>
  );
};
