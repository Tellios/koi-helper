import { t } from '@app/i18n';
import { useActions } from '@app/state';
import { Id, IImageReference } from '@app/storage';
import { ListHeader, ListHeaderTitleVariant } from '@app/ui';
import { Add } from '@mui/icons-material';
import { Box, Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import { deleteImage, getImageReferences } from '../operations';
import { ImageDialog } from './ImageDialog';
import { ImageTileList } from './ImageTileList';

interface IImageGalleryProps {
  referenceId: Id;
  titleVariant?: ListHeaderTitleVariant;
}

interface IDialogState {
  isOpen: boolean;
  preSelectedImage?: Id;
}

export const ImageGallery: React.FunctionComponent<IImageGalleryProps> = ({
  referenceId,
  titleVariant,
}) => {
  const actions = useActions();
  const [references, setReferences] = React.useState<IImageReference[] | null>(null);
  const [dialogState, setDialogState] = React.useState<IDialogState>({
    isOpen: false,
  });

  React.useEffect(() => {
    getImageReferences(referenceId).then(setReferences);
  }, [referenceId]);

  const onUploadImages = async () => {
    await actions.uploadImages({ referenceId, type: 'ImageGallery' });
    getImageReferences(referenceId).then(setReferences);
  };

  const onDeleteImage = async (image: IImageReference) => {
    await deleteImage(image.id);

    if (references) {
      const updatedReferences = references.filter((ref) => ref.id !== image.id);
      setDialogState({ isOpen: updatedReferences.length > 0 });
      setReferences(updatedReferences);
    }
  };

  return (
    <Box>
      <ListHeader
        title={t.common.imageGallery.header}
        titleVariant={titleVariant}
        actionArea={
          <Button onClick={onUploadImages}>
            <Add />
            {t.common.imageGallery.addImagesAction}
          </Button>
        }
      />

      {references === null && <CircularProgress />}
      {references !== null && (
        <ImageTileList
          references={references}
          onImageClicked={(id) => {
            setDialogState({
              isOpen: true,
              preSelectedImage: id,
            });
          }}
        />
      )}
      {references !== null && dialogState.isOpen && (
        <ImageDialog
          isOpen={dialogState.isOpen}
          references={references}
          preSelectedImage={dialogState.preSelectedImage}
          onClose={() => {
            setDialogState({
              isOpen: false,
            });
          }}
          onDelete={onDeleteImage}
        />
      )}
    </Box>
  );
};
