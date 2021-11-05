const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    mode: 'development',
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
        }),
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
    ],
    module: {
        rules: [
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
            },
            {
                test: /\.(png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: '/images',
                            publicPath: '/images',
                            name: '[name].[hash:6].[ext]',
                            esModule: false,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                enabled: false,
                            },
                            webp: {
                                quality: 75
                            },
                        }
                    },
                ],
            }
        ]
    },
    devServer: {
        watchFiles: [
            'src/*.html',
            'src/*.scss'
        ],
        static: ['dist'],
        compress: true,
        port: 9000,
        https: true,
        open: true,
    },
};