### Element-UI theme监听

```shell
# 启动监听
# 在项目根目录，执行
./node_modules/.bin/et  --watch
```

#### 依赖包

```shell
npm install element-theme --save-dev
npm install element-theme-chalk --save-dev
```

#### 主题配置
>  package.json中新增配置项。

```javascript
"element-theme": {
  "browsers": ["ie > 9", "last 2 versions"],
  "out": "./libs/element/theme",
  "config": "./libs/element/element-variables.scss",
  "theme": "element-theme-chalk",
  "minimize": false
}
```
