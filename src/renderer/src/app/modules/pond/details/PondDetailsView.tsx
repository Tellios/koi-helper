import { t } from '@app/i18n';
import { FishListView } from '@app/modules/fish';
import { ImageGallery } from '@app/modules/image';
import { useActions, useAppState } from '@app/state';
import { ContentCard } from '@app/ui';
import { Grid, Paper, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router';
import { InfoPanel } from './InfoPanel';

export const PondDetailsView = () => {
  const { pondId } = useParams();
  const state = useAppState();
  const actions = useActions();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const pond = state.ponds.filter((pond) => pond.id === pondId)[0];

  React.useEffect(() => {
    actions.setMainBar({
      title: pond.name,
      showBackButton: true,
      actions: [],
    });
  });

  return (
    <Grid container direction="column" wrap="nowrap">
      <Grid>
        <Paper square>
          <Tabs
            value={selectedTab}
            variant="fullWidth"
            onChange={(_event, value) => setSelectedTab(value)}
          >
            <Tab label={t.common.tabs.info} />
            <Tab label={t.common.tabs.fishes} />
            <Tab label={t.common.tabs.images} />
          </Tabs>
        </Paper>
      </Grid>

      <Grid>
        {selectedTab === 0 && (
          <ContentCard disableScroll>
            <InfoPanel pond={pond} />
          </ContentCard>
        )}
        {selectedTab === 1 && <FishListView pondId={pond.id} />}
        {selectedTab === 2 && (
          <ContentCard disableScroll>
            <ImageGallery referenceId={pond.id} titleVariant="none" />
          </ContentCard>
        )}
      </Grid>
    </Grid>
  );
};
