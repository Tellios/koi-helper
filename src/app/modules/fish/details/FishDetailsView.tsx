import { t } from '@app/i18n';
import { ImageGallery } from '@app/modules/image';
import {
  MeasurementListHeaderView,
  MeasurementListView,
  MeasurementsGraphView,
} from '@app/modules/measurement';
import { useAppState } from '@app/state';
import { Stack, Tab, Tabs } from '@mui/material';
import { Id } from '@shared/models';
import * as React from 'react';
import { InfoPanel } from './InfoPanel';

interface IFishDetailsViewProps {
  fishId: Id;
}

export const FishDetailsView: React.FC<IFishDetailsViewProps> = ({ fishId }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const state = useAppState();
  const fish = state.fishes.filter((fish) => fish.id === fishId)[0];

  if (!fish) {
    return <>{t.fish.doesNotExistMessage(fishId)}</>;
  }

  return (
    <Stack sx={{ width: '100%', height: '100%', gap: 2, overflow: 'hidden' }}>
      <Tabs
        value={selectedTab}
        variant="fullWidth"
        onChange={(_event, value) => setSelectedTab(value)}
      >
        <Tab label={t.common.tabs.info} />
        <Tab label={t.common.tabs.images} />
        <Tab label={t.measurement.tabHeader} />
      </Tabs>

      {selectedTab === 0 && <InfoPanel fish={fish} />}
      {selectedTab === 1 && <ImageGallery referenceId={fish.id} titleVariant="none" />}
      {selectedTab === 2 && (
        <Stack id="fish-measurements" sx={{ width: '100%', flex: 1, overflow: 'hidden' }}>
          <MeasurementsGraphView />
          <MeasurementListHeaderView fishId={fish.id} />
          <MeasurementListView fishId={fish.id} />
        </Stack>
      )}
    </Stack>
  );
};
