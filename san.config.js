/**
 * @file san config
 * @author luoyi06 <luoyi06@baidu.com>
 *
 * 环境变量, scripts/preview.js脚本中定义
 * COM_PAGE: 组件类型默认情况下, 组件路径是src/components; 值为src/pages中有效目录时, 路径为src/pages/$COM_PAGE/components
 * COM_NAME: 组件名称, 默认avatar
 */

// 静态文件域名
const CDN = 'https://s.bdstatic.com/';
// 生产环境下的静态目录
const STATIC_PRO = 'static/san-form-validate';
// 生产环境下模板目录

const path = require('path');

const resolve = pathname => path.resolve(__dirname, pathname);
// 这个是 release 目录，打包机器只能支持 output，所以谨慎修改
const outputDir = 'output';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    assetsDir: isProduction ? STATIC_PRO : 'static',
    publicPath: isProduction ? CDN : '/',
    outputDir,
    filenameHashing: isProduction,
    // 这是多页面配置
    pages: {
        index: {
            entry: './examples/pages/index.js',
            template: './pages.template.ejs',
            filename: 'index/index.html'
        }
    },
    transpileDependencies: ['@baidu/nano'],
    css: {
        sourceMap: isProduction,
        cssPreprocessor: 'less'
    },
    splitChunks: {
        cacheGroups: {
            vendors: {
                name: 'vendors',
                test: /[\\/]node_modules(?!\/@baidu)[\\/]/,
                // minChunks: 1,
                priority: -10
            },
            common: {
                name: 'common',
                test: /([\/]src\/components(-open)?|[\\/]node_modules\/@baidu\/nano)/,
                priority: -20,
                minChunks: 1,
                chunks: 'initial'
            }
        }
    },
    alias: {
        '@assets': resolve('examples/assets'),
        '@components': resolve('examples/components'),
        '@app': resolve('examples/lib/App.js'),
        '@store': resolve('examples/lib/Store.js'),
        '@src': resolve('src')
    },
    chainWebpack: config => {
        // 这里可以用来扩展 webpack 的配置，使用的是 webpack-chain 语法

        // config.module.rule('img')
        //     .test(/\.(png|jpe?g|gif)(\?.*)?$/)
        //     .use('url-loader').loader(require.resolve('url-loader'))
        //     .options({
        //         limit: 1000,
        //         name: STATIC_PRO + '/img/[name].[hash:7].[ext]',
        //         publicPath: isProduction ? CDN : ''
        //     });
    },
    sourceMap: isProduction
};
