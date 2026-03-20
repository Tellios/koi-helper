import { t } from '@shared/i18n';
import { Files } from '@app/modules/file';
import { ContentCard, ListCard, mainBarActionEmitter, Row, useMainBarStore } from '@app/ui';
import { combineUnbinds } from '@app/utilities';
import { List } from '@mui/material';
import { Id } from '@shared/models';
import * as React from 'react';
import { useEffect } from 'react';
import { VarietyDetailsView } from '../details';
import { useVarietyStore } from '../variety-store';
import { VarietyItem } from './VarietyItem';

export const VarietyListView: React.FunctionComponent = () => {
  const { addVariety, varieties } = useVarietyStore();
  const { setOptions } = useMainBarStore();
  const [selected, setSelected] = React.useState<Id | undefined>(undefined);

  useEffect(() => {
    setOptions({
      title: t.variety.varietyListTitle,
      showBackButton: false,
      actions: [
        {
          name: 'addVariety',
          label: t.variety.addAction,
        },
      ],
    });

    return combineUnbinds([
      mainBarActionEmitter.onAction('addVariety', () => {
        addVariety({
          name: t.variety.newVarietyName,
          description: '',
        });
      }),
    ]);
  }, [setOptions, addVariety]);

  const listItems = varieties.map((variety) => (
    <VarietyItem
      key={variety.id}
      variety={variety}
      selected={selected === variety.id}
      onClick={(variety) => setSelected(variety.id)}
      onDeleted={(variety) => variety.id === selected && setSelected(undefined)}
    />
  ));

  return (
    <Row>
      <ListCard>
        <List>{listItems}</List>
      </ListCard>

      {selected && (
        <ContentCard fillWidth animate>
          <VarietyDetailsView varietyId={selected} />
          <Files referenceId={selected} />
        </ContentCard>
      )}
    </Row>
  );
};
