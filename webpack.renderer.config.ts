import path from 'node:path';

import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins, resolvePlugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  entry: './src/main.tsx',
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    plugins: resolvePlugins,
  },
  externals: {
    'react-native-sqlite-storage': 'react-native-sqlite-storage',
    sharp: 'commonjs sharp',
  },
};
