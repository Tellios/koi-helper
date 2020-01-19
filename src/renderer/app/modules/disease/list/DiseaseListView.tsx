import * as React from "react";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { mainBarActionEmitter, Row, ListCard, ContentCard } from "app/ui";
import { combineUnbinds } from "app/utilities";
import { Id } from "app/storage";
import { Files } from "app/modules/file";
import { DiseaseItem } from "./DiseaseItem";
import { List } from "@material-ui/core";
import { DiseaseDetailsView } from "../details/DiseaseDetailsView";

export const DiseaseListView: React.FunctionComponent = () => {
  const { state, actions } = useAppState();
  const [selected, setSelected] = React.useState<Id | undefined>(undefined);

  React.useEffect(() => {
    actions.setMainBar({
      title: t.disease.diseaseListTitle,
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
    <DiseaseItem
      key={disease.id}
      disease={disease}
      selected={selected === disease.id}
      onClick={disease => setSelected(disease.id)}
      onDeleted={disease => disease.id === selected && setSelected(undefined)}
    />
  ));

  return (
    <Row>
      <ListCard>
        <List>{listItems}</List>
      </ListCard>

      {selected && (
        <ContentCard fillWidth>
          <DiseaseDetailsView diseaseId={selected} />
          <Files referenceId={selected} />
        </ContentCard>
      )}
    </Row>
  );
};
