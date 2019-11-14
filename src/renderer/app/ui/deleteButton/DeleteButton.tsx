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
    onClick: (e: React.MouseEvent) => void,
    className?: string
  ) => void;
  className?: string;
  onDelete: () => void;
}

export const DeleteButton: React.FunctionComponent<IDeleteButtonProps> = ({
  renderButton = (onClick, className) => (
    <IconButton
      title={t.common.deleteAction}
      className={className}
      onClick={onClick}
    >
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
      {renderButton(e => setDeletePopoverAnchor(e.currentTarget), className)}
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
          {t.common.deleteAction}
        </Button>
        <Button
          onClick={() => setDeletePopoverAnchor(null)}
          className={classes.button}
        >
          <Cancel />
          {t.common.cancelAction}
        </Button>
      </Popover>
    </>
  );
};
