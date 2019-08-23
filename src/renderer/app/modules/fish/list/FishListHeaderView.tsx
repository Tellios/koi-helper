import * as React from "react";
import { Typography, Box, Button, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { t } from "app/i18n";
import { useAppState } from "app/state";
import { Id } from "app/storage";

const useStyles = makeStyles(() => ({
  addButton: {
    marginLeft: "auto"
  },
  addVariantText: {
    marginLeft: "auto",
    alignSelf: "center"
  }
}));

export interface IFishListHeaderViewProps {
  pondId: Id;
}

export const FishListHeaderView: React.FunctionComponent<
  IFishListHeaderViewProps
> = ({ pondId }) => {
  const classes = useStyles();
  const { state, actions } = useAppState();

  return (
    <Box display="flex">
      <Typography variant="h4">{t.fish.listHeading}</Typography>

      {state.varieties.length > 0 && (
        <Button
          className={classes.addButton}
          onClick={() =>
            actions.addFish({
              born: new Date(),
              breeder: "",
              origin: "",
              measurements: [],
              name: t.fish.newFishName,
              pond: pondId,
              sex: "female",
              treatments: [],
              value: 0,
              variety: state.varieties[0].id
            })
          }
        >
          <Add /> {t.fish.addAction}
        </Button>
      )}

      <Typography
        variant="caption"
        className={classes.addVariantText}
        hidden={state.varieties.length > 0}
      >
        {t.fish.addVariantsFirst}
      </Typography>
    </Box>
  );
};
