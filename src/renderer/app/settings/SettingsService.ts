import { injectable } from "inversify";
import * as fs from "fs-extra";
import * as path from "path";
import * as envPaths from "env-paths";
import { SingleInstance } from "app/ioc";
import { logger, LogFunction } from "app/logger";
import { IAppSettings } from "./IAppSettings";

@injectable()
@SingleInstance()
export class SettingsService {
  private settingsFile = path.join(
    envPaths("koi-helper").config,
    "user-settings.json"
  );

  private cachedSettings?: IAppSettings;

  public constructor() {
    logger.info(
      `Initialized SettingsService using '${this.settingsFile}' for storage`
    );
  }

  public async getSettings(): Promise<IAppSettings> {
    if (this.cachedSettings) {
      return this.cachedSettings;
    }

    this.cachedSettings = await this.readSettings();
    return this.cachedSettings;
  }

  public async saveSettings(settings: Partial<IAppSettings>): Promise<void> {
    const existingSettings = await this.readSettingsFromFile();
    await fs.outputJSON(
      this.settingsFile,
      {
        ...existingSettings,
        ...settings
      },
      { spaces: 4 }
    );

    this.cachedSettings = await this.readSettings();
  }

  @LogFunction({ logStart: true, logEnd: true, level: "verbose" })
  private async readSettings() {
    const defaultSettings: IAppSettings = {
      language: "en"
    };

    const existingSettings = await this.readSettingsFromFile();

    return { ...defaultSettings, ...existingSettings };
  }

  @LogFunction({ logStart: true, logEnd: true, level: "verbose" })
  private async readSettingsFromFile(): Promise<Partial<IAppSettings>> {
    if (await fs.pathExists(this.settingsFile)) {
      return await fs.readJson(this.settingsFile);
    }

    return {};
  }
}
