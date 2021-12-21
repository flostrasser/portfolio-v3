const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode === 'production' ? 'production' : 'development';
  console.log(`mode: ${mode}\n`);

  return {
    mode,
    entry: './src/js/main.js',
    output: {
      filename: 'main.js',
      path: __dirname + '/dist',
      clean: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        hash: true,
        scriptLoading: 'module',
      }),
      // generate favicons and link them in index.html
      new FaviconsWebpackPlugin({
        logo: './src/favicon.svg',
        prefix: '/favicons/',
        mode: 'auto', // 'webapp', 'light' or 'auto'
        favicons: {
          appName: 'Florian Strasser Portfolio',
          appDescription: 'Personal Frontend Developer & Web Designer Portfolio of Florian Strasser',
          developerName: 'Florian Strasser',
          developerURL: null, // prevent retrieving from the nearest package.json
          background: '#ddd',
          theme_color: '#101326',
          icons: {
            android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            firefox: false, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            yandex: false, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
          }
        }
      }),
      // optimize generated favicons from FaviconsWebpackPlugin and generated images from responsive-loader
      new ImageminWebpackPlugin({
        cacheFolder: __dirname + '/cache',
        pngquant: {
          quality: '60-75'
        }
      }),
      // copy static files
      new CopyPlugin({
        patterns: [
          { from: './src/static', to: '.' },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          include: __dirname + '/src',
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]'
          }
        },
        {
          test: /\.(png|jpe?g|svg)$/i,
          use: [
            {
              loader: "responsive-loader",
              options: {
                outputPath: '/images',
                publicPath: '/images',
                name: '[name].[ext]?[hash:6]',
                adapter: require("responsive-loader/sharp"),
                placeholder: true,
                placeholderSize: 20,
                quality: 60, // quality for webp and avif
              },
            }
          ],
        }
      ]
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
      ],
    },
    devServer: {
      watchFiles: [
        'src/**/*.html',
        'src/*.scss',
        'src/images/*'
      ],
      static: ['dist'],
      compress: true,
      port: 9000,
      https: true,
      open: false,
    },
  }
};