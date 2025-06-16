import { IImageReference, Id } from '@app/storage';
import { DeleteButton } from '@app/ui';
import { Close, Delete } from '@mui/icons-material';
import { Box, Dialog, DialogContent, Fab, useTheme } from '@mui/material';
import { debounce } from 'lodash';
import * as React from 'react';
import { ImageDialogBigImage } from './ImageDialogBigImage';
import { ImageDialogThumbnailList } from './ImageDialogThumbnailList';

interface IImageDialogProps {
  isOpen: boolean;
  references: IImageReference[];
  preSelectedImage?: Id;
  onClose: () => void;
  onDelete: (image: IImageReference) => void;
}

export const ImageDialog: React.FunctionComponent<IImageDialogProps> = ({
  isOpen,
  references,
  preSelectedImage,
  onClose,
  onDelete,
}) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = React.useState(
    preSelectedImage ? preSelectedImage : references[0].id,
  );

  const imageIndex = references.findIndex((ref) => ref.id === selectedImage);
  const bigImage = references[imageIndex];

  const changeIndex = React.useCallback(
    (newIndex: number) => {
      if (newIndex < 0) {
        newIndex = references.length - 1;
      } else if (newIndex >= references.length) {
        newIndex = 0;
      }

      setSelectedImage(references[newIndex].id);
    },
    [references, setSelectedImage],
  );

  const decrementIndex = React.useCallback(
    (currentIndex: number) => {
      changeIndex(currentIndex - 1);
    },
    [changeIndex],
  );

  const incrementIndex = React.useCallback(
    (currentIndex) => {
      changeIndex(currentIndex + 1);
    },
    [changeIndex],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      decrementIndex(imageIndex);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      incrementIndex(imageIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const onWheel = debounce((e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      decrementIndex(imageIndex);
    } else {
      incrementIndex(imageIndex);
    }
  }, 50);

  const onDeleteImage = () => {
    const imageToDelete = references[imageIndex];
    incrementIndex(imageIndex);
    onDelete(imageToDelete);
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose} onKeyDown={onKeyDown} onWheel={onWheel}>
      <DialogContent
        sx={{
          overflow: 'hidden',
        }}
      >
        <Box
          style={{
            width: '100%',
            height: '80%',
          }}
        >
          <ImageDialogBigImage reference={bigImage} />
        </Box>
        <Box
          sx={{
            height: '20%',
            maxHeight: '180px',
          }}
        >
          <ImageDialogThumbnailList
            references={references}
            selectedImage={selectedImage}
            onImageSelected={(id) => setSelectedImage(id)}
            onSelectPrevious={() => decrementIndex(imageIndex)}
            onSelectNext={() => incrementIndex(imageIndex)}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: theme.spacing(2),
            right: theme.spacing(2),
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <DeleteButton
            renderButton={(onClick, sx) => (
              <Fab sx={sx} onClick={onClick} color="primary">
                <Delete />
              </Fab>
            )}
            sx={{
              margin: theme.spacing(1),
            }}
            onDelete={onDeleteImage}
          />
          <Fab
            color="primary"
            sx={{
              margin: theme.spacing(1),
            }}
            onClick={onClose}
          >
            <Close />
          </Fab>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
