import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import type { Configuration } from 'webpack';

import { plugins, resolvePlugins } from './webpack.plugins';
import { rules } from './webpack.rules';

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
  },
  {
    test: /\.(ttf|woff|woff2|eot)$/,
    type: 'asset/resource',
  },
);

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
  plugins: [...plugins, new CopyWebpackPlugin({ patterns: [{ from: './src/assets' }] })],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    plugins: resolvePlugins,
  },
  externals: {
    'react-native-sqlite-storage': 'react-native-sqlite-storage',
  },
  devtool: 'inline-source-map',
};
