import { remote } from "electron";

export type SelectFilesMode = "singleSelect" | "multiSelect";

export interface IFileFilter {
  name: string;
  extensions: string[];
}

export interface ISelectFilesParams {
  filters: IFileFilter[];
  mode: SelectFilesMode;
}

type OpenDialogProperties = "openFile" | "multiSelections";

const modeToPropertiesMapping: Record<
  SelectFilesMode,
  OpenDialogProperties[]
> = {
  multiSelect: ["multiSelections"],
  singleSelect: ["openFile"]
};

export const selectFiles = async ({
  filters,
  mode
}: ISelectFilesParams): Promise<Electron.OpenDialogReturnValue> => {
  const properties = modeToPropertiesMapping[mode];

  const result = await remote.dialog.showOpenDialog({
    properties,
    filters
  });

  return result;
};
