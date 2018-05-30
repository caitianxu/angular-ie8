# box-web
 
*为兼容IE8 angularjs 降级使用最后一个兼容IE8的版本。 
*如需要使用jQuery，lib目录下的jQuery也为兼容IE8的版本。

## 目录结构

```
src   主目录
    - iamges 静态资源文件
    - js 核心模块
    - json 模拟接口文件
    - lib 静态引用的框架和组件
    - views 业务模块
    - main.js webpack工程入口文件
    - main.html html模版文件
    
css
    -public.css 公共样式文件
    - reset.css 网页重置样式文件

dist 生产内容

webpack.config.js  工程配置文件
compress.js        独立压缩业务模块js，css文件配置
```


### 安装

```
npm i 
```

### 开发

```
npm run dev
```

### 发布调试

```
npm run build
```

### 发布部署

```
dev 开发模式可直接在现代浏览器中运行， IE8中可以先编译然后运行dist/index.html文件

```