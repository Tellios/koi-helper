import * as React from "react";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { mainBarActionEmitter } from "app/ui";
import { combineUnbinds } from "app/utilities";
import { VarietyItem } from "./VarietyItem";
import { List } from "@material-ui/core";

export const VarietyListView: React.FunctionComponent = () => {
  const { state, actions } = useAppState();

  React.useEffect(() => {
    actions.setMainBar({
      title: t.variety.varietyListTitle,
      showBackButton: false,
      actions: [
        {
          name: "addVariety",
          label: t.variety.addAction
        }
      ]
    });

    return combineUnbinds([
      mainBarActionEmitter.onAction("addVariety", () => {
        actions.addVariety({
          name: t.variety.newVarietyName,
          description: ""
        });
      })
    ]);
  });

  const listItems = state.varieties.map(variety => (
    <VarietyItem key={variety.id} variety={variety} />
  ));

  return <List disablePadding>{listItems}</List>;
};
