import * as React from "react";
import {
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import { Save, ExpandMore } from "@material-ui/icons";
import { defaultTo, toNumber, omit } from "lodash";
import { IPond } from "app/storage";
import { useAppState } from "app/state";
import { t } from "app/i18n";

interface IInfoPanelProps {
  pond: IPond;
}

type EditedPondProperties = Partial<IPond>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      flexBasis: "33.33%",
      flexShrink: 0
    },
    secondaryHeading: {
      alignSelf: "center",
      color: theme.palette.text.secondary
    }
  })
);

export const InfoPanel: React.FunctionComponent<IInfoPanelProps> = ({
  pond
}) => {
  const [state, setState] = React.useState<EditedPondProperties>({});
  const { actions } = useAppState();
  const classes = useStyles();

  const handleChange = (property: keyof IPond, value: any) => {
    if (value === pond[property]) {
      return setState(currentState => omit(currentState, [property]));
    }

    setState(currentState => ({
      ...currentState,
      [property]: value
    }));
  };

  const resetForm = () => setState({});

  const isChanged = Object.keys(state).length > 0;

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Typography variant="h4" className={classes.heading}>
        {t.common.infoHeader}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          className={classes.secondaryHeading}
        >
          {t.common.expandInfo}
        </Typography>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label={t.pond.nameLabel}
                value={defaultTo(state.name, pond.name)}
                onChange={e => handleChange("name", e.target.value)}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label={t.pond.volumeLabel}
                type="number"
                value={defaultTo(state.volume, pond.volume)}
                onChange={e => handleChange("volume", toNumber(e.target.value))}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label={t.pond.depthLabel}
                type="number"
                value={defaultTo(state.depth, pond.depth)}
                onChange={e => handleChange("depth", toNumber(e.target.value))}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label={t.pond.lengthLabel}
                type="number"
                value={defaultTo(state.length, pond.length)}
                onChange={e => handleChange("length", toNumber(e.target.value))}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label={t.pond.widthLabel}
                type="number"
                value={defaultTo(state.width, pond.width)}
                onChange={e => handleChange("width", toNumber(e.target.value))}
              />
            </Grid>
          </Grid>

          <Box mt={2}>
            <Grid container direction="row" justify="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!isChanged}
                  onClick={() => {
                    actions.updatePond({ ...pond, ...state });
                    resetForm();
                  }}
                >
                  <Save />
                  {t.common.saveAction}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  disabled={!isChanged}
                  size="large"
                  onClick={() => resetForm()}
                >
                  {t.common.resetAction}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
