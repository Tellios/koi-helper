import * as React from "react";
import { List } from "@material-ui/core";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { mainBarActionEmitter, Row, ListCard, ContentCard } from "app/ui";
import { combineUnbinds } from "app/utilities";
import { Id } from "app/storage";
import { Files } from "app/modules/file";
import { VarietyDetailsView } from "../details";
import { VarietyItem } from "./VarietyItem";

export const VarietyListView: React.FunctionComponent = () => {
  const { state, actions } = useAppState();
  const [selected, setSelected] = React.useState<Id | undefined>(undefined);

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
    <VarietyItem
      key={variety.id}
      variety={variety}
      selected={selected === variety.id}
      onClick={variety => setSelected(variety.id)}
      onDeleted={variety => variety.id === selected && setSelected(undefined)}
    />
  ));

  return (
    <Row>
      <ListCard>
        <List>{listItems}</List>
      </ListCard>

      {selected && (
        <ContentCard fillWidth>
          <VarietyDetailsView varietyId={selected} />
          <Files referenceId={selected} />
        </ContentCard>
      )}
    </Row>
  );
};
