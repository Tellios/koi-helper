import * as React from "react";
import { useAppState } from "app/state";
import { Id, IImageReference } from "app/storage";
import { CircularProgress, Box, Typography, Button } from "@material-ui/core";
import { getImageReferences } from "../actions";
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

  console.log("RENDER IMAGES", references);

  return (
    <Box>
      <Box>
        <Typography>Images</Typography>
        <Button onClick={() => actions.uploadImages(referenceId)}>
          Add images
        </Button>
      </Box>
      {references === null && <CircularProgress />}
      {references !== null && <ImageTileList references={references} />}
    </Box>
  );
};
