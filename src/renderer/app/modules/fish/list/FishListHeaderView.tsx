import * as React from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { t } from "app/i18n";
import { useAppState } from "app/state";
import { Id } from "app/storage";
import { ListHeader } from "app/ui";

const useStyles = makeStyles(theme => ({
  listHeader: {
    margin: theme.spacing(2)
  }
}));

export interface IFishListHeaderViewProps {
  pondId: Id;
}

export const FishListHeaderView: React.FunctionComponent<
  IFishListHeaderViewProps
> = ({ pondId }) => {
  const { state, actions } = useAppState();
  const classes = useStyles();

  return (
    <ListHeader
      className={classes.listHeader}
      title={t.fish.listHeading}
      titleVariant="none"
      actionArea={
        <>
          {state.varieties.length > 0 && (
            <Button
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

          <Typography variant="caption" hidden={state.varieties.length > 0}>
            {t.fish.addVariantsFirst}
          </Typography>
        </>
      }
    />
  );
};
