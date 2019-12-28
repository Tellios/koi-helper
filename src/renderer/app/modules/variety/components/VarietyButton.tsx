import * as React from "react";
import { Box, Button, Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Pets } from "@material-ui/icons";
import { IVariety } from "app/storage";
import { t } from "app/i18n";
import { ImageProfile } from "app/modules/image";

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    minWidth: 260,
    display: "flex",
    justifyContent: "flex-start"
  },
  text: {
    marginLeft: theme.spacing(1)
  }
}));

interface IVarietyButtonProps {
  variety?: IVariety;
  color?: "primary" | "secondary" | "default";
  onClick?: () => void;
  className?: string;
}

export const VarietyButton: React.FC<IVarietyButtonProps> = ({
  variety,
  color,
  onClick,
  className
}) => {
  const classes = useStyles();
  const classNames = clsx(classes.button, className);

  return (
    <Button
      className={classNames}
      color={color}
      variant="outlined"
      onClick={onClick}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        {variety && (
          <>
            <ImageProfile referenceId={variety.id} fallback={<Pets />} />
            <Typography className={classes.text}>{variety.name}</Typography>
          </>
        )}
        {!variety === undefined && (
          <Typography>{t.variety.notSelected}</Typography>
        )}
      </Box>
    </Button>
  );
};
