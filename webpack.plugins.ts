import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import relocateLoader from '@vercel/webpack-asset-relocator-loader';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const plugins: any[] = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  {
    apply(compiler) {
      compiler.hooks.compilation.tap('webpack-asset-relocator-loader', (compilation) => {
        relocateLoader.initAssetCache(compilation, '');
      });
    },
  },
];

export const resolvePlugins = [
  new TsconfigPathsPlugin({
    configFile: './tsconfig.json',
  }),
];
