import { t } from '@shared/i18n';
import { ListHeader } from '@app/ui';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Id } from '@shared/models';
import * as React from 'react';
import { useMeasurementStore } from '../measurement-store';

export interface IMeasurementListHeaderViewProps {
  fishId: Id;
}

export const MeasurementListHeaderView: React.FunctionComponent<
  IMeasurementListHeaderViewProps
> = ({ fishId }) => {
  const { addMeasurement } = useMeasurementStore();

  return (
    <ListHeader
      title={''}
      actionArea={
        <>
          <Button
            onClick={() =>
              addMeasurement({
                fish: fishId,
                measurement: {
                  comment: '',
                  date: new Date(),
                  length: 0,
                  weight: 0,
                },
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
