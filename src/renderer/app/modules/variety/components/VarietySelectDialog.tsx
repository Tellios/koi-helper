import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles
} from "@material-ui/core";
import { useAppState } from "app/state";
import { IVariety, Id } from "app/storage";
import { t } from "app/i18n";
import { VarietyButton } from "./VarietyButton";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "column"
  },
  item: {
    marginBottom: theme.spacing(1)
  }
}));

interface IVarietySelectDialogProps {
  open: boolean;
  selectedVariety?: Id;
  onSelected: (variety: IVariety) => void;
  onClose: () => void;
}

export const VarietySelectDialog: React.FC<IVarietySelectDialogProps> = ({
  open,
  selectedVariety,
  onSelected,
  onClose
}) => {
  const classes = useStyles();
  const [newVariety, setNewVariety] = React.useState<IVariety | undefined>(
    undefined
  );
  const {
    state: { varieties }
  } = useAppState();

  const closeDialog = () => {
    setNewVariety(undefined);
    onClose();
  };

  return (
    <Dialog open={open} fullWidth onEscapeKeyDown={onClose}>
      <DialogTitle>{t.variety.selectDialogHeader}</DialogTitle>
      <DialogContent className={classes.content}>
        {varieties.map(v => (
          <VarietyButton
            key={v.id}
            className={classes.item}
            variety={v}
            color={
              newVariety?.id === v.id
                ? "primary"
                : selectedVariety === v.id
                ? "secondary"
                : "default"
            }
            onClick={() => setNewVariety(v)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          disabled={
            newVariety === undefined || newVariety.id === selectedVariety
          }
          color="primary"
          onClick={() => {
            onSelected(newVariety!);
            closeDialog();
          }}
        >
          {t.common.selectAction}
        </Button>
        <Button color="primary" onClick={closeDialog}>
          {t.common.cancelAction}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
