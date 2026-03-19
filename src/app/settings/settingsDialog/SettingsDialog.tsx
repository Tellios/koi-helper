import { Language, t } from '@app/i18n';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { IAppSettings } from '@shared/models';
import { omit } from 'lodash';
import * as React from 'react';
import { useSettingsStore } from '../settings-store';

const availableLanguages: Language[] = ['en', 'sv'];

export const SettingsDialog: React.FunctionComponent = () => {
  const { settings, showDialog, updateSettings, hideSettings } = useSettingsStore();
  const [formData, setFormData] = React.useState<Partial<IAppSettings>>({});

  const languageOptions = availableLanguages.map((lang) => (
    <MenuItem key={lang} value={lang} selected={lang === settings.language}>
      {t.settings.languages[lang]}
    </MenuItem>
  ));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (property: keyof IAppSettings, value: any) => {
    if (value === settings[property]) {
      return setFormData((currentFormData) => omit(currentFormData, [property]));
    }

    setFormData((currentState) => ({
      ...currentState,
      [property]: value,
    }));
  };

  const save = () => {
    updateSettings(formData);
    setFormData({});
  };

  const cancel = () => {
    setFormData({});
    hideSettings();
  };

  const isChanged = Object.keys(formData).length > 0;

  return (
    <Dialog open={showDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{t.settings.dialogTitle}</DialogTitle>
      <DialogContent>
        <InputLabel htmlFor="language-select">{t.settings.languageLabel}</InputLabel>
        <Select
          fullWidth
          value={formData.language || settings.language}
          inputProps={{ id: 'language-select' }}
          onChange={(e) => handleChange('language', e.target.value)}
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
