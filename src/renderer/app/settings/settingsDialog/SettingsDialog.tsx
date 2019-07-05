import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import { useAppState } from "app/state";
import { IAppSettings } from "../IAppSettings";
import { t, Language } from "app/i18n";
import { omit } from "lodash";

const availableLanguages: Language[] = ["en", "sv"];

export const SettingsDialog: React.FunctionComponent = () => {
  const { state, actions } = useAppState();
  const [formData, setFormData] = React.useState<Partial<IAppSettings>>({});

  const languageOptions = availableLanguages.map(lang => (
    <MenuItem
      key={lang}
      value={lang}
      selected={lang === state.settings.settings.language}
    >
      {t.settings.languages[lang]}
    </MenuItem>
  ));

  const handleChange = (property: keyof IAppSettings, value: any) => {
    if (value === state.settings.settings[property]) {
      return setFormData(currentFormData => omit(currentFormData, [property]));
    }

    setFormData(currentState => ({
      ...currentState,
      [property]: value
    }));
  };

  const save = () => {
    actions.updateSettings(formData);
    setFormData({});
  };

  const cancel = () => {
    setFormData({});
    actions.hideSettings();
  };

  const isChanged = Object.keys(formData).length > 0;

  return (
    <Dialog open={state.settings.showDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{t.settings.dialogTitle}</DialogTitle>
      <DialogContent>
        <InputLabel htmlFor="language-select">
          {t.settings.languageLabel}
        </InputLabel>
        <Select
          fullWidth
          value={formData.language || state.settings.settings.language}
          inputProps={{ id: "language-select" }}
          onChange={e => handleChange("language", e.target.value)}
        >
          {languageOptions}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button disabled={!isChanged} color="primary" onClick={save}>
          {t.common.saveAction}
        </Button>
        <Button color="primary" onClick={cancel}>
          {t.common.cancelAction}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
