import * as React from "react";
import { CircularProgress, Box, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useAppState } from "app/state";
import { Id, IImageReference } from "app/storage";
import { t } from "app/i18n";
import { ListHeader } from "app/ui";
import { getImageReferences } from "../operations";
import { ImageTileList } from "./ImageTileList";
import { ImageDialog } from "./ImageDialog";

interface IImageGalleryProps {
  referenceId: Id;
}

interface IDialogState {
  isOpen: boolean;
  preSelectedImage?: Id;
}

export const ImageGallery: React.FunctionComponent<IImageGalleryProps> = ({
  referenceId
}) => {
  const { actions } = useAppState();
  const [references, setReferences] = React.useState<IImageReference[] | null>(
    null
  );
  const [dialogState, setDialogState] = React.useState<IDialogState>({
    isOpen: false
  });

  React.useEffect(() => {
    getImageReferences(referenceId).then(setReferences);
  }, [referenceId]);

  return (
    <Box>
      <ListHeader
        title={t.common.imageGallery.header}
        actionArea={
          <Button onClick={() => actions.uploadImages(referenceId)}>
            <Add />
            {t.common.imageGallery.addImagesAction}
          </Button>
        }
      />

      {references === null && <CircularProgress />}
      {references !== null && (
        <ImageTileList
          references={references}
          onImageClicked={id => {
            setDialogState({
              isOpen: true,
              preSelectedImage: id
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
              isOpen: false
            });
          }}
        />
      )}
    </Box>
  );
};
