"use strict";

let configBuild = require('./config/build.json');

let staticRoot = configBuild.static_root; //实际静态资源根目录
let tplRoot = configBuild.tpl_root; //模版根目录

fis.hook('commonjs', {
    packages: [
        {
            name: 'app',
            location: './components/app'
        }
    ]
});


//排除不需要产出的目录
fis.set('project.ignore', fis.get('project.ignore').concat([
    'doc/**',
    'config/**',
    'scripts/**',
    'component.json',
    'package.json',
    'test/**'
]));

// 所有的文件产出到 {staticRoot} 目录下
fis.match('*', {
    release: staticRoot + '$0',
    useHash : false
});

//排除不需要产出的文件
fis
    .match('*.{sh,md,log,scss}', {
        release: false
    })
    .match('.gitignore', {
        release: false
    });


//npm 组件
fis.match('/{node_modules,components,widget}/**.js', {
    isMod: true,
    useSameNameRequire: true
});

fis.match('/page/**', {
    isMod: true,
    useSameNameRequire: true
});

fis.match('/static/**', {
    isMod: false,
    useSameNameRequire: false
});

// 本地模拟数据产出到根test目录下，否则无法模拟动态数据
fis.match('/mock/**', {
    release: '/test/$0'
});

// fis模拟配置文件
fis.match('/mock/server.conf', {
    release: '/config/server.conf'
});

// 所有模板放到 {tplRoot} 目录下
fis.match('*.html', {
    release: tplRoot + '$0',
    parser: fis.plugin('html-uri')
});

// 前端模板
fis.match('**.tpl', {
    release : false,
    parser: fis.plugin('utc'), // invoke `fis-parser-utc`,
    isJsLike: true,
    isMod:false //避免被当作组件包装
});

//autoprefixer
fis.match('**.css', {
    postprocessor: fis.plugin('autoprefixer', {
        "browsers": ["last 2 versions", "ie 8"]
    })
});

// 添加css和image加载支持
fis.match('*.js', {
    preprocessor: [
        fis.plugin('js-require-css'),
        fis.plugin('js-require-file', {
            useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
        })
    ]
});

// // 用 node-sass 解析
// fis.match('*.scss', {
//     parser: [
//         fis.plugin('node-sass', {
//             includePaths: [
//                 'components'
//             ] || [],
//             sourceMap : true
//         })
//     ],
//     postprocessor: fis.plugin('autoprefixer')
// });
// fis.match('**/_*.scss', {
//     release : false
// });


fis.match('::packager', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true // 资源映射表内嵌
    })
});

//数据接口增加实际前缀
fis.match('/components/app/api/config.js', {
    parser: function (content, file, opt) {
        // 只对 html 类文件进行处理
        if (!file.isJsLike){
            return content;
        }
        return content.replace(/\{static_url_prefix\}/g, function(all, value) {
            return configBuild.static_url_prefix ;
        });
    }
});


// 禁用components
fis.unhook('components');
fis.hook('node_modules', {
    useDev: false
});

//生产环境

// optimize
fis.media('prod')
    //暂时关闭hash值，因为还没想好前端页面hash变化后，服务端页面如何更好地做对应更改
    //.match('*.{css,js}', {
    //    useHash : true
    //})
    //.match('image', {
    //    useHash: true
    //})
    .match('*.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                expect: ['require', 'define'] //不想被压的
            }
        })
    })
    .match('*.css', {
        useSprite: true,
        optimizer: fis.plugin('clean-css', {
            'keepSpecialComments': 0
        })
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor') // 用 fis-optimizer-png-compressor 压缩 png 图片
    })
    .match('*.{png,gif,jpg,jpeg}', { //图片引用增加url前缀
        url : configBuild.static_url_prefix  + staticRoot + '$0'
    });

// pack
fis.media('prod')
    // 启用打包插件，必须匹配 ::packager
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: {
                ignore: 'node_modules/jquery/**'
            }
        }),
        packager: fis.plugin('map'),
        spriter: fis.plugin('csssprites', {
            layout: 'matrix',
            margin: '15'
        })
    });

