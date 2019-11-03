import * as React from "react";
import { Popover, Button, IconButton, makeStyles } from "@material-ui/core";
import { Delete, DeleteForever, Cancel } from "@material-ui/icons";
import { t } from "app/i18n";

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    padding: spacing(2),
    margin: spacing(1)
  }
}));

export interface IDeleteButtonProps {
  renderButton?: (
    className: string,
    onClick: (e: React.MouseEvent) => void
  ) => void;
  className?: string;
  onDelete: () => void;
}

export const DeleteButton: React.FunctionComponent<IDeleteButtonProps> = ({
  renderButton = (className, onClick) => (
    <IconButton className={className} onClick={onClick}>
      <Delete />
    </IconButton>
  ),
  className,
  onDelete
}) => {
  const classes = useStyles();
  const [
    deletePopoverAnchor,
    setDeletePopoverAnchor
  ] = React.useState<Element | null>(null);

  const handleDelete = () => {
    setDeletePopoverAnchor(null);
    onDelete();
  };

  return (
    <>
      {renderButton(className, e => setDeletePopoverAnchor(e.currentTarget))}
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
        <Button onClick={handleDelete} className={classes.button}>
          <DeleteForever />
          {t.common.imageGallery.deleteImageAction}
        </Button>
        <Button
          onClick={() => setDeletePopoverAnchor(null)}
          className={classes.button}
        >
          <Cancel />
          {t.common.imageGallery.cancelAction}
        </Button>
      </Popover>
    </>
  );
};
