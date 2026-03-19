import { t } from '@app/i18n';
import { useVarietyStore } from '@app/modules/variety';
import { ListHeader } from '@app/ui';
import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Id } from '@shared/models';
import * as React from 'react';
import { useFishStore } from '../fish-store';

export interface IFishListHeaderViewProps {
  pondId: Id;
}

export const FishListHeaderView: React.FunctionComponent<IFishListHeaderViewProps> = ({
  pondId,
}) => {
  const { varieties } = useVarietyStore();
  const { addFish } = useFishStore();

  return (
    <ListHeader
      sx={{
        m: 2,
      }}
      title={t.fish.listHeading}
      titleVariant="none"
      actionArea={
        <>
          {varieties.length > 0 && (
            <Button
              startIcon={<Add />}
              onClick={() =>
                addFish({
                  born: new Date(),
                  breeder: '',
                  origin: '',
                  measurements: [],
                  name: t.fish.newFishName,
                  pond: pondId,
                  sex: 'female',
                  treatments: [],
                  value: 0,
                  variety: varieties[0].id,
                })
              }
            >
              {t.fish.addAction}
            </Button>
          )}

          <Typography variant="caption" hidden={varieties.length > 0}>
            {t.fish.addVariantsFirst}
          </Typography>
        </>
      }
    />
  );
};
