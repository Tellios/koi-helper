/**
 * @author Leo Wang(草鞋没号) <308487730@qq.com>
 * @link https://github.com/caoxiemeihao/electron-forge-plugin-dependencies.git
 */

export interface DependenciesPluginConfig {
  /**
   * The dependencies package by Electron Forge, default to the `dependencies` in the current project's package.json.
   */
  dependencies?: string[];
  /**
   * Function to filter copied files/directories. Return `true` to copy the item, `false` to ignore it.
   * Can also return a `Promise` that resolves to `true` or `false` (or pass in an `async` function).
   */
  filter?: (src: string, dest: string) => boolean | Promise<boolean>;
}
