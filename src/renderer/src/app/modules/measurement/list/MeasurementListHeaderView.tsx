import * as React from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { t } from '@app/i18n';
import { useAppState } from '@app/state';
import { Id } from '@app/storage';
import { ListHeader } from '@app/ui';

export interface IMeasurementListHeaderViewProps {
  fishId: Id;
}

export const MeasurementListHeaderView: React.FunctionComponent<
  IMeasurementListHeaderViewProps
> = ({ fishId }) => {
  const { actions } = useAppState();

  return (
    <ListHeader
      title={''}
      actionArea={
        <>
          <Button
            onClick={() =>
              actions.addMeasurement({
                fish: fishId,
                measurement: {
                  comment: '',
                  date: new Date(),
                  length: 0,
                  weight: 0
                }
              })
            }
          >
            <Add /> {t.measurement.addAction}
          </Button>
        </>
      }
    />
  );
};
