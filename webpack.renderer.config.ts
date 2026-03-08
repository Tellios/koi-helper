import type { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

import { rules } from './webpack.rules';
import { plugins, resolvePlugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
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
  },
};
