import * as React from "react";
import { useAppState } from "app/state";
import { Id, IImageReference } from "app/storage";
import { ListHeader } from "app/ui";
import {
  CircularProgress,
  Box,
  Button,
} from "@material-ui/core";
import { getImageReferences } from "../operations";
import { ImageTileList } from "./ImageTileList";

interface IImageGalleryProps {
  referenceId: Id;
}

export const ImageGallery: React.FunctionComponent<IImageGalleryProps> = ({
  referenceId
}) => {
  const { actions } = useAppState();
  const [references, setReferences] = React.useState<IImageReference[] | null>(
    null
  );

  React.useEffect(() => {
    if (references === null) {
      getImageReferences(referenceId).then(setReferences);
    }
  });

  return (
    <Box>
      <ListHeader
        title={"img"}
        actionArea={
          <Button onClick={() => actions.uploadImages(referenceId)}>
            Add images
          </Button>
        }
      />

      {references === null && <CircularProgress />}
      {references !== null && <ImageTileList references={references} />}
    </Box>
  );
};
