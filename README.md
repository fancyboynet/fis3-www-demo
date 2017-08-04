# 基于fis3的PC端纯静态解决方案

## 采用fis3-hook-node_modules的组件方案

[fis3-hook-node_modules](https://github.com/fex-team/fis3-hook-node_modules)

## 准备

    $ npm install -g fis3
    $ npm install
    

   
## 安装第三方模块时请同时写入配置文件  

    $ npm install jquery@2.1.0 --save
   
    
## 安装私有模块(采用私有仓库,简单易用,以bitbucket为例)

    $ npm install git+ssh://git@bitbucket.org:ngfe/device.git --save
    
    let device = require('ngfe-widget-device');
    
## 开始开发
   
    $ npm start
    
   
## 打包dev版资源
  
    $ npm run dev
  
## 打包prod版资源

    $ npm run prd
    
## 打包带hash的prod版资源

    $ npm run prod-with-hash
   
## 构建说明
   1. 全局安装[fis3](http://fex-team.github.io/fis3/index.html) `npm install -g fis3`
   2. 执行 `npm install` 安装依赖
   3. 资源文件采取百度的[fis3](https://github.com/fex-team/fis3)构建，维护之前请参考相关资料
   4. 构建输出目录为根目录下的**output**目录
   
   
## 目录说明
[参考1](https://github.com/fex-team/fis3/blob/master/doc/docs/api/config-commonly-used.md)
[参考2](https://github.com/fex-team/fis3-solutions/blob/master/intro.md#目录规范-1)

### 源码目录

```
├── scripts
│   └── develop.js
│   └── product.js
├── config
│   └── build.json  //构建配置
├── mock
│   └── POST_LIST.json
├── page
│   └── index.html
├── static
│   └── lib
├── test
├── widget
│   ├── header
│   ├── nav
│   └── ui
├── components
│   ├── jquery
│   └── normalize.css
└── node_modules
    ├── jquery
    └── normalize.css   
 
```

1. page 放置页面模板
2. components fis-components生态组件,尽量用npm生态
3. node_modules npm生态组件
4. widget 应用内组件
5. test 一些测试数据、用例
6. static 放一些非组件化的公用的静态资源
7. static/lib 放置一些非模块化公共库，例如 mod.js 等
8. config 配置目录
9. mock 本地模拟数据目录，只在本地开发环境时才存在
10. scripts 工具类目录，只在本地开发环境时才存在

### 编译产出目录

```
├── static/
├── templates/
└── test
```


1. static 对应服务端的static目录
2. template 对应服务端的template目录
3. test 还是一些测试数据、用例

### 问题
目前暂时仍然使用babel-5.x进行转译,对es6中内置对象新增的方法还不支持

### 升级到babel-6.x前要解决的问题

1. 去掉'use strict'的方法
2. "transform-runtime"产生的脚本默认会比jquery更早加载,会导致原来的业务脚本打包时分成两个文件
