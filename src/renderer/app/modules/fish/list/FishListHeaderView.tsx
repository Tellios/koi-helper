import * as React from "react";
import { Typography, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { t } from "app/i18n";
import { useAppState } from "app/state";
import { Id } from "app/storage";
import { ListHeader } from "app/ui";

export interface IFishListHeaderViewProps {
  pondId: Id;
}

export const FishListHeaderView: React.FunctionComponent<
  IFishListHeaderViewProps
> = ({ pondId }) => {
  const { state, actions } = useAppState();

  return (
    <ListHeader
      title={t.fish.listHeading}
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
