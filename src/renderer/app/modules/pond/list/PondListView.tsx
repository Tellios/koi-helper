import * as React from "react";
import { List } from "@material-ui/core";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { PondItem } from "./PondItem";
import { sortItems } from "./sortItems";
import { mainBarActionEmitter, ListCard } from "app/ui";
import { combineUnbinds } from "app/utilities";

export const PondListView: React.FunctionComponent = () => {
  const { state, actions } = useAppState();

  React.useEffect(() => {
    if (state.ponds.length === 0) {
      actions.getPonds();
    }

    actions.setMainBar({
      title: t.pond.pondListTitle,
      showBackButton: false,
      actions: [
        {
          name: "addPond",
          label: t.pond.addPondAction
        },
        {
          name: "showArchived",
          label: t.common.toggleShowArchivedText(state.showArchivedPonds)
        }
      ]
    });

    return combineUnbinds([
      mainBarActionEmitter.onAction("addPond", () => {
        actions.addPond({
          name: t.pond.newPondName,
          length: 2000,
          width: 145,
          volume: 1200,
          depth: 3,
          archived: false,
          treatments: []
        });
      }),
      mainBarActionEmitter.onAction("showArchived", () => {
        actions.toggleShowArchivedPonds();
      })
    ]);
  }, []);

  const listItems = state.ponds
    .filter(pond => (state.showArchivedPonds ? true : !pond.archived))
    .sort(sortItems)
    .map(pond => <PondItem key={pond.id} pond={pond} />);

  return (
    <ListCard>
      <List disablePadding>{listItems}</List>
    </ListCard>
  );
};
