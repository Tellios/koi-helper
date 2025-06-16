import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const plugins: any[] = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
];

export const resolvePlugins = [
  new TsconfigPathsPlugin({
    configFile: './tsconfig.json',
  }),
];
