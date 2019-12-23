import * as React from "react";
import { useAppState } from "app/state";
import { RouteComponentProps } from "react-router";
import { InfoPanel } from "./InfoPanel";
import { ImageGallery } from "app/modules/image";
import { Box, Tabs, Tab } from "@material-ui/core";
import { t } from "app/i18n";
import {
  MeasurementListHeaderView,
  MeasurementsGraphView
} from "app/modules/measurement";
import { MeasurementListView } from "app/modules/measurement";

export const FishDetailsView: React.FunctionComponent<
  RouteComponentProps<{ fishId: string }>
> = ({ match }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const { state } = useAppState();
  const fish = state.fishes.filter(fish => fish.id === match.params.fishId)[0];

  if (!fish) {
    return <>{t.fish.doesNotExistMessage(match.params.fishId)}</>;
  }

  return (
    <Box>
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
      {selectedTab === 1 && <ImageGallery referenceId={fish.id} />}
      {selectedTab === 2 && (
        <>
          <MeasurementsGraphView />
          <MeasurementListHeaderView fishId={fish.id} />
          <MeasurementListView fishId={fish.id} />
        </>
      )}
    </Box>
  );
};
