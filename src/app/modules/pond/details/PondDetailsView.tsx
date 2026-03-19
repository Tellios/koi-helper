import { t } from '@app/i18n';
import { FishListView } from '@app/modules/fish';
import { ImageGallery } from '@app/modules/image';
import { ContentCard, useMainBarStore } from '@app/ui';
import { Info, PhotoLibrary } from '@mui/icons-material';
import { Stack, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { PiFish } from 'react-icons/pi';
import { useParams } from 'react-router';
import { usePondStore } from '../pond-store';
import { InfoPanel } from './InfoPanel';

export const PondDetailsView = () => {
  const { pondId } = useParams();
  const { ponds } = usePondStore();
  const { setOptions } = useMainBarStore();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const pond = ponds.find((p) => p.id === pondId)!;

  React.useEffect(() => {
    setOptions({
      title: pond.name,
      showBackButton: true,
      actions: [],
    });
  }, [pond, setOptions]);

  return (
    <Stack sx={{ width: '100%', height: '100%' }}>
      <Tabs
        value={selectedTab}
        variant="standard"
        onChange={(_event, value) => setSelectedTab(value)}
      >
        <Tab label={t.common.tabs.info} icon={<Info />} />
        <Tab label={t.common.tabs.fishes} icon={<PiFish size={24} />} />
        <Tab label={t.common.tabs.images} icon={<PhotoLibrary />} />
      </Tabs>

      {selectedTab === 0 && (
        <ContentCard disableScroll fillHeight>
          <InfoPanel pond={pond} />
        </ContentCard>
      )}
      {selectedTab === 1 && <FishListView pondId={pond.id} />}
      {selectedTab === 2 && (
        <ContentCard disableScroll fillHeight>
          <ImageGallery referenceId={pond.id} titleVariant="none" />
        </ContentCard>
      )}
    </Stack>
  );
};
