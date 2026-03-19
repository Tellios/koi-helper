import { t } from '@app/i18n';
import { Files } from '@app/modules/file';
import { ContentCard, ListCard, mainBarActionEmitter, Row, useMainBarStore } from '@app/ui';
import { combineUnbinds } from '@app/utilities';
import { List } from '@mui/material';
import { Id } from '@shared/models';
import * as React from 'react';
import { DiseaseDetailsView } from '../details/DiseaseDetailsView';
import { useDiseaseStore } from '../disease-store';
import { DiseaseItem } from './DiseaseItem';

export const DiseaseListView: React.FunctionComponent = () => {
  const { setOptions } = useMainBarStore();
  const { diseases, addDisease } = useDiseaseStore();

  const [selected, setSelected] = React.useState<Id | undefined>(undefined);

  React.useEffect(() => {
    setOptions({
      title: t.disease.diseaseListTitle,
      showBackButton: false,
      actions: [
        {
          name: 'addDisease',
          label: t.disease.addAction,
        },
      ],
    });

    return combineUnbinds([
      mainBarActionEmitter.onAction('addDisease', () => {
        addDisease({
          name: t.disease.newDiseaseName,
          description: '',
          medication: '',
        });
      }),
    ]);
  });

  const listItems = diseases.map((disease) => (
    <DiseaseItem
      key={disease.id}
      disease={disease}
      selected={selected === disease.id}
      onClick={(disease) => setSelected(disease.id)}
      onDeleted={(disease) => disease.id === selected && setSelected(undefined)}
    />
  ));

  return (
    <Row>
      <ListCard>
        <List>{listItems}</List>
      </ListCard>

      {selected && (
        <ContentCard fillWidth animate>
          <DiseaseDetailsView diseaseId={selected} />
          <Files referenceId={selected} />
        </ContentCard>
      )}
    </Row>
  );
};
