# box-web
 
*为兼容IE8 angularjs 降级使用最后一个兼容IE8的版本。 如无特殊功能要求， 工程中无需加载jQuery使用。
*jQuery在index.html引用， 如需要可以打开代码注释

## 目录结构

```
src                 主目录
    - iamges 静态资源文件
    - js 核心模块
    - json 模拟接口文件
    - lib 静态引用的框架和组件
    - lib 业务模块
    - loginCallback.html 第三方登录回调页面
    - style.css 公共样式文件

config
    - main.js  开发环境代理地址    
    - main.html 生成主页面模版
```


### 安装

```
npm install 
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
测试环境：`build` 之后将 `dist` 中的内容完全拷贝到SVN发布目录中
https://svn-repo.stnts.com/repo/lolbox/frontend/trunk/box-web

真实环境：
```