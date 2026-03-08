import type { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

import { plugins, resolvePlugins } from './webpack.plugins';
import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
  externals: {
    sqlite3: 'commonjs sqlite3',
    sharp: 'commonjs sharp',
  },
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: [...rules],
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    plugins: resolvePlugins,
  },
};
