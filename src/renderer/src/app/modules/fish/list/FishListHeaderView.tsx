import { t } from '@app/i18n';
import { useActions, useAppState } from '@app/state';
import { Id } from '@app/storage';
import { ListHeader } from '@app/ui';
import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import * as React from 'react';

export interface IFishListHeaderViewProps {
  pondId: Id;
}

export const FishListHeaderView: React.FunctionComponent<IFishListHeaderViewProps> = ({
  pondId,
}) => {
  const state = useAppState();
  const actions = useActions();

  return (
    <ListHeader
      sx={{
        m: 2,
      }}
      title={t.fish.listHeading}
      titleVariant="none"
      actionArea={
        <>
          {state.varieties.length > 0 && (
            <Button
              onClick={() =>
                actions.addFish({
                  born: new Date(),
                  breeder: '',
                  origin: '',
                  measurements: [],
                  name: t.fish.newFishName,
                  pond: pondId,
                  sex: 'female',
                  treatments: [],
                  value: 0,
                  variety: state.varieties[0].id,
                })
              }
            >
              <Add /> {t.fish.addAction}
            </Button>
          )}

          <Typography variant="caption" hidden={state.varieties.length > 0}>
            {t.fish.addVariantsFirst}
          </Typography>
        </>
      }
    />
  );
};
