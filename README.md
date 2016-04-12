# 基于fis3的PC端纯静态解决方案

## 准备

    ```
    $ npm install -g fis3
    $ npm install
   
    ```

   
## 安装第三方模块时请同时写入配置文件  

    ```
    fis3 install jquery@1.11.3 --save
    
    ```
    
## 开始开发
   
    ```
    $ npm start
    
    ```
   
## 打包dev版资源
  
    ```
    $ npm run dev
    
    ```
  
## 打包prod版资源

    ```
    $ npm run prd
    
    ```
   
## 构建说明
   1. 全局安装[fis3](http://fex-team.github.io/fis3/index.html) `npm install -g fis3`
   2. 执行 `npm install` 安装依赖
   3. 资源文件采取百度的[fis3](https://github.com/fex-team/fis3)构建，维护之前请参考相关资料
   4. 构建输出目录为根目录下的**output**目录
   
## 构建注意
   新增文件时可能需要重新运行develop.sh来对新增的文件增加监听
   
## 关于自适应
   1. 效果图统一给1080p;
   2. 采用rem的自适应方式，注意查看头部的相关脚本
   3. css中按效果图量出的尺寸除以100设置，例如效果图量的某宽度是500px,则css中设置5rem;
   
## 目录说明
[参考](https://github.com/fex-team/fis3/blob/master/doc/docs/api/config-commonly-used.md)

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
├── common
│   └── lib
├── test
├── components
│   ├── header
│   ├── nav
│   └── ui
└── node_modules
    ├── jquery
    └── normalize.css   
 
```

1. page 放置页面模板
2. components 应用内组件
3. node_modules npm 生态组件
4. test 一些测试数据、用例
5. common 放一些组件公用的静态资源
6. common/lib 放置一些非模块化公共库，例如 mod.js 等
7. config 配置目录
8. mock 本地模拟数据目录，只在本地开发环境时才存在
9. scripts 工具类目录，只在本地开发环境时才存在

### 编译产出目录

```
├── static/
├── templates/
└── test
```


1. static 对应服务端的static目录
2. template 对应服务端的template目录
3. test 还是一些测试数据、用例
