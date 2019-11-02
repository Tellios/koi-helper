import * as React from "react";
import { debounce } from "lodash";
import {
  Dialog,
  DialogContent,
  makeStyles,
  Fab,
  Popover,
  Button
} from "@material-ui/core";
import { Close, DeleteForever } from "@material-ui/icons";
import { IImageReference, Id } from "app/storage";
import { ImageDialogThumbnailList } from "./ImageDialogThumbnailList";
import { ImageDialogBigImage } from "./ImageDialogBigImage";
import { t } from "app/i18n";

interface IImageDialogProps {
  isOpen: boolean;
  references: IImageReference[];
  preSelectedImage?: Id;
  onClose: () => void;
  onDelete: (image: IImageReference) => void;
}

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    overflow: "hidden"
  },
  bigImageRoot: {
    width: "100%",
    height: "80%"
  },
  thumbnailListRoot: {
    height: "20%",
    maxHeight: "180px"
  },
  actionBar: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end"
  },
  actionFab: {
    margin: theme.spacing(1)
  }
}));

export const ImageDialog: React.FunctionComponent<IImageDialogProps> = ({
  isOpen,
  references,
  preSelectedImage,
  onClose,
  onDelete
}) => {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = React.useState(
    preSelectedImage ? preSelectedImage : references[0].id
  );
  const [
    deletePopoverAnchor,
    setDeletePopoverAnchor
  ] = React.useState<HTMLButtonElement | null>(null);

  const imageIndex = references.findIndex(ref => ref.id === selectedImage);
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
    [references, setSelectedImage]
  );

  const decrementIndex = React.useCallback(
    (currentIndex: number) => {
      changeIndex(currentIndex - 1);
    },
    [changeIndex]
  );

  const incrementIndex = React.useCallback(
    currentIndex => {
      changeIndex(currentIndex + 1);
    },
    [changeIndex]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      decrementIndex(imageIndex);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      incrementIndex(imageIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  const handleDeltaYChange = React.useCallback(
    debounce((deltaY: number, currentIndex: number) => {
      if (deltaY < 0) {
        decrementIndex(currentIndex);
      } else {
        incrementIndex(currentIndex);
      }
    }, 50),
    [incrementIndex, decrementIndex]
  );

  const onWheel = (e: React.WheelEvent) => {
    handleDeltaYChange(e.deltaY, imageIndex);
  };

  const onDeleteImage = () => {
    setDeletePopoverAnchor(null);
    const imageToDelete = references[imageIndex];
    incrementIndex(imageIndex);
    onDelete(imageToDelete);
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      <DialogContent className={classes.dialogRoot}>
        <div className={classes.bigImageRoot}>
          <ImageDialogBigImage reference={bigImage} />
        </div>
        <div className={classes.thumbnailListRoot}>
          <ImageDialogThumbnailList
            references={references}
            selectedImage={selectedImage}
            onImageSelected={id => setSelectedImage(id)}
            onSelectPrevious={() => decrementIndex(imageIndex)}
            onSelectNext={() => incrementIndex(imageIndex)}
          />
        </div>
        <div className={classes.actionBar}>
          <Fab
            className={classes.actionFab}
            onClick={e => setDeletePopoverAnchor(e.currentTarget)}
          >
            <DeleteForever />
          </Fab>
          <Fab color="primary" className={classes.actionFab} onClick={onClose}>
            <Close />
          </Fab>
          <Popover
            anchorEl={deletePopoverAnchor}
            open={Boolean(deletePopoverAnchor)}
            onClose={() => setDeletePopoverAnchor(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <Button onClick={onDeleteImage}>
              {t.common.imageGallery.deleteImageAction}
            </Button>
            <Button onClick={() => setDeletePopoverAnchor(null)}>
              {t.common.imageGallery.cancelAction}
            </Button>
          </Popover>
        </div>
      </DialogContent>
    </Dialog>
  );
};
