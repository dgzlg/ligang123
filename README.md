<h2 align="center">共享交换平台-前端</h2>

<h3 align="left">0.1.0</h3>
<p>项目基础（与云管理平台相同）</p>

<h3 align="left">框架</h3>

1.打包工具：[webpack](https://github.com/webpack/webpak)

2.js框架：[React](https://github.com/facebook/react)、[ReactRouter](https://github.com/ReactTraining/react-router)、[Redux](https://github.com/reduxjs/redux)、[React-Redux](https://github.com/reduxjs/react-redux)、[ConnectedReactRouter](https://github.com/supasate/connected-react-router)

3.UI框架：[antd](https://github.com/ant-design/ant-design)


<h3 align="left">开发</h3>
```bash
npm start
```

<p>通过浏览器访问http://localhost:3000</p>

<h3 align="left">发布</h3>

```bash
npm run build
```
生成的build文件夹内的文件即为发布后的页面文件

<h3 align="left">其他</h3>

1.Less全局变量：由config目录下的less.js定义（主要用于重置antd的全局变量）

2.本地Node服务：由local-service目录下index.js定义（用于开发模式下的前端数据模拟）

3.热更新：默认关闭，可修改webpack.config.js开启
```js
config.devServer = {
    //...
    hot: true
    //...
}
```
4.开发模式下node端口，配置方式同热更新，修改port的值


