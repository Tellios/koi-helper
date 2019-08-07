import * as React from "react";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { mainBarActionEmitter } from "app/ui";
import { combineUnbinds } from "app/utilities";
import { DiseaseItem } from "./DiseaseItem";
import { List } from "@material-ui/core";

export const DiseaseListView: React.FunctionComponent = () => {
  const { state, actions } = useAppState();

  React.useEffect(() => {
    actions.setMainBar({
      title: t.variety.varietyListTitle,
      showBackButton: false,
      actions: [
        {
          name: "addDisease",
          label: t.disease.addAction
        }
      ]
    });

    return combineUnbinds([
      mainBarActionEmitter.onAction("addDisease", () => {
        actions.addDisease({
          name: t.disease.newDiseaseName,
          description: "",
          medication: ""
        });
      })
    ]);
  });

  const listItems = state.diseases.map(disease => (
    <DiseaseItem key={disease.id} disease={disease} />
  ));

  return <List disablePadding>{listItems}</List>;
};
