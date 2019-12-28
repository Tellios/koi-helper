import * as React from "react";
import { useAppState } from "app/state";
import { InfoPanel } from "./InfoPanel";
import { ImageGallery } from "app/modules/image";
import { Box, Tabs, Tab } from "@material-ui/core";
import { t } from "app/i18n";
import {
  MeasurementListHeaderView,
  MeasurementsGraphView
} from "app/modules/measurement";
import { MeasurementListView } from "app/modules/measurement";
import { Id } from "app/storage";

interface IFishDetailsViewProps {
  fishId: Id;
}

export const FishDetailsView: React.FC<IFishDetailsViewProps> = ({
  fishId
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const { state } = useAppState();
  const fish = state.fishes.filter(fish => fish.id === fishId)[0];

  if (!fish) {
    return <>{t.fish.doesNotExistMessage(fishId)}</>;
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
      {selectedTab === 1 && (
        <ImageGallery referenceId={fish.id} titleVariant="none" />
      )}
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
