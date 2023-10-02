const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const CopyPlugin = require('copy-webpack-plugin');

const ResponsiveLoaderSharp = require('responsive-loader/sharp');

module.exports = (env, argv) => {
  const mode = argv.mode === 'production' ? 'production' : 'development';

  // eslint-disable-next-line no-console
  console.log(`mode: ${mode}\n`);

  return {
    mode,
    entry: './src/js/main.ts',
    output: {
      filename: 'main.js',
      path: `${__dirname}/dist`,
      clean: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        hash: true,
        scriptLoading: 'module',
      }),
      // optimize generated favicons from FaviconsWebpackPlugin and generated images from responsive-loader
      new ImageminWebpackPlugin({
        cacheFolder: `${__dirname}/cache`,
        pngquant: {
          quality: '60-75',
        },
      }),
      // copy static files
      new CopyPlugin({
        patterns: [{ from: './src/static', to: '.' }],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts?$/,
          include: `${__dirname}/src`,
          use: 'babel-loader',
        },
        {
          test: /\.scss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },
        {
          test: /\.(png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'responsive-loader',
              options: {
                outputPath: '/images',
                publicPath: '/images',
                name: '[name].[ext]?[hash:6]',
                adapter: ResponsiveLoaderSharp,
                placeholder: true,
                placeholderSize: 20,
                quality: 60, // quality for webp and avif
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    devServer: {
      watchFiles: ['src/**/*.html', 'src/*.scss', 'src/images/*'],
      static: ['dist'],
      compress: true,
      port: 9000,
      https: true,
      open: false,
    },
  };
};
