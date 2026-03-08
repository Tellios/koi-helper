/**
 * @author Leo Wang(草鞋没号) <308487730@qq.com>
 * @link https://github.com/caoxiemeihao/electron-forge-plugin-dependencies.git
 */

import path from 'node:path';

import debug from 'debug';
import fs from 'fs-extra';

import type { DependenciesPluginConfig } from './config';

const d = debug('electron-forge:plugin:dependencies');

export default class DependenciesPluginGenerator {
  constructor(
    private readonly pluginConfig: DependenciesPluginConfig,
    private readonly projectDir: string,
    readonly isProd: boolean,
  ) {
    this.getDependencies().then((deps) => {
      d(`Config dependencies (isProd: ${isProd}):`, deps);
    });
  }

  async getDependencies() {
    if (this.pluginConfig.dependencies) {
      return this.pluginConfig.dependencies;
    }

    const packagePath = path.join(this.projectDir, 'package.json');
    const packageJson = await fs.readJson(packagePath);

    return Object.keys(packageJson.dependencies);
  }
}
