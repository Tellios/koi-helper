import { AsyncAction } from "app/state";
import { ServiceLocator } from "app/ioc";
import { ConnectionService } from "app/storage";

export const loadFile: AsyncAction<string> = async (
  { state },
  filename: string
) => {
  state.activeFile = filename;
  state.fileLoaded = false;
  state.loadingFile = true;

  const connectionService = ServiceLocator.get(ConnectionService);
  await connectionService.connect(filename);

  state.loadingFile = false;
  state.fileLoaded = true;
};
