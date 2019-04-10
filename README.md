# 第一个vue小项目
## 总体概述：
### 该项目是一个集购物demo，新闻demo，评论demo一体的练习性项目。包括一些常见的轮播图，导航条，缩略图。
## 运用插件：
### Mint-ui、mui、图片预览插件vuepreview、处理HTTP请求的插件VueResource、路由vue-router、数据仓库vuex
## 项目具体介绍：
### 制作首页App组件和首页组件：
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html，点击该区域图标相应的切换路由地址
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件。因为时一个路由组件，所以当页面切换添加动画时注意用transition包裹路由组件
4. 轮播图用到mui，因为多处运用到轮播图，因此独立组件，并由父组件向子组件传参来设置对应图片地址。（父组件标签 :arrlist="...",子组件：props["arrlist"]接收）。
* 轮播图数据：
  * 获取数据， 如何获取呢， 使用 vue-resource
  * 使用 vue-resource 的 this.$http.get 获取数据
  * 获取到的数据，要保存到 data 身上
  * 使用 v-for 循环渲染 每个 item 项
5. 六宫格采用mui
### 制作新闻资讯：
#### 新闻资讯表单页面
1. 路由导航的方法这里用的是router-link to导航的
2. 绘制界面,使用 MUI 中的 media-list.html
3. 使用 vue-resource 获取数据
4. 渲染真实数据
5. 全局时间过滤器
#### 新闻资讯详情页面
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面  NewsInfo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来
4. 单独封装一个 comment.vue 评论子组件
  * 先创建一个 单独的 comment.vue 组件模板
  * 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
  * `import comment from './comment.vue'`
  * 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
  * 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可
  * <mt-button type="primary" size="large">使用mui创建发表评论按钮样式。<mt-button type="danger" size="large">创建加载更多样式
  * textarea设置最大长度maxlength=120,并且双向绑定输入框内容。
  * 点击发表评论，把内容通过post传给服务器，同时自定义一个评论时间、评论人信息的数据，然后通过unshift装到评论内容的前面。为了使最新评论数据在最前面展示，且不覆盖老数据，从服务器获取评论数据的时候使用数组的concat方法拼接获取到的评论数组
  * 加载更多：pageindex++的同时，
### 制作图片区域
#### 全部图片————头部导航滑动条
> 开始踩坑---制作顶部滑动条的坑：
 1. 需要借助于 MUI 中的 tab-top-webview-main.html 
 2. 需要把 slider 区域的 mui-fullscreen 类去掉
 3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
  + 导入 mui.js 
  + 调用官方提供的 方式 去初始化：
  ```
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
  4. 在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
  + 经过我们合理的推测，觉得，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是， webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
  + 解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 2. 把 webpack 打包时候的严格模式禁用掉；
  + 最终，我们选择了 plan B  移除严格模式： 使用这个插件 babel-plugin-transform-remove-strict-mode
 5. 刚进入 图片分享页面的时候， 滑动条无法正常工作， 经过我们认真的分析，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中；
 6. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item` 重新改一下名字；
 7. 获取所有分类，并渲染 分类列表；
### 坑中总结：
#### 1.时刻相信自己代码没有错，错的极大可能是引用组件中缺少了什么其他相关代码以及组件中某些class的串用，于是我们查官方文档极有可能解决此坑。2.此外极有可能是浏览器渲染页面先来后到问题，可根据生命周期函数解决掉他们
8. 制作图片列表区域：
* 图片列表需要使用懒加载技术，使用 Mint-UI 提供的现成的 组件 `lazy-load`。`lazy-load`的使用文档走起
9. 点击图片跳转到图片详情页面
* 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为 哪种元素
### 图片详情区域：
1. 实现 图片详情中 缩略图的功能
* 使用 插件 vue-preview 这个缩略图插件
* 获取到所有的图片列表，然后使用 v-for 指令渲染数据
* 注意： img标签上的class不能去掉
* 注意： 每个 图片数据对象中，必须有 w 和 h ，msrc属性
## 日常操作猛如虎之调试代码：
1. 在手机上 去进行项目的预览和测试
* 要保证 手机 和 开发项目的电脑 处于同一个 WIFI 环境中，也就是说 手机 可以 访问到 电脑的 IP
* 打开自己的 项目中 package.json 文件，在 dev 脚本中，添加一个 --host 指令， 把 当前 电脑的 WIFI IP地址， 设置为 --host 的指令值；
 + 如何查看自己电脑所处 WIFI 的IP呢， 在 cmd 终端中运行 `ipconfig` ， 查看 无线网的 ip 地址
### 商品购买：
#### 全部商品页面和前面的很像，没什么可说的，为了显示他有什么好说的就只能从路由下手了
>使用js形式实现路由导航:
```
  //方法1：
  // this.$router.push("/home/goodsinfo/" + id);
  //方法2： 传递对象
  // this.$router.push({path:"/home/goodsinfo/" + id});
  //方法3： 传递命名的路由
  this.$router.push({name:"goodslist",params:{id}});
```
### 商品详情页面：
1. 轮播图组件，注意我这里不能设置宽高都为100%，因为图片超丑，于是从轮播图组件下手， :class="{full:isfull}，然后子组件接收通过父组件传过来的isfull的值即可轻松更改样式
2. 购物车之小球
* 点击加入购物车时，实现小球动画，用到了半场动画，以及this.$refs.ball.getBoundingClientRect()来获取小球基于页面可视区域的位置，这样我们就知道translate到底设置成什么了。
3. 购买数量：
  * 这里的框框引用了mui的numbox，并且另外建了一个子组件存放他，此时注意因为库存量的关系，购买数量的这个框框最大值限制，但是最大值是通过父组件给的，父组件传递的时候，浏览器解析到:max=“goodsdetail.stock_quantity”时可能还没有解析到goodsdetail，毕竟这货需要请求服务器后才有数据，所以为了防止max=undefined情况，框框组件采用watch监听max，生活始终归于插件文档： mui(".mui-numbox").numbox().setOption("max",newVal);
4. 生活终于要对真正的购物车庞大数据关联下手了（vuex）
#### 因为涉及到非父子组件的数据互相利用，于是引入vuex
1. 安装并注册vuex
2. 点击加入购物车，把商品信息保存到store中的car中.信息从哪来呢，当然是从goodsinfo中获取到了，把价格，id,count,selected统统传给他，因为购物车页面需要这些值。当然注意如果本身我已经有某项产品在购物车，我再把他加入购物车就只需要更改count就行，不用push所有
3. 把count总共的数量传给小红球，通过vuex
4. 注意每次更改car后本地存储随之更改
5. 真正的购物车页面，也是vuex的各种传值，时刻保持car,本地存储，购物车页面数据一致。
# 总体的总结
## 踩坑不算很多，坑来坑去大部分都是可以通过官方文档解决，关于方法的实践和运用这些思维还是要多练习收获比较多，慢慢想吧，注意坑是不是浏览器渲染问题，注意生命周期。感觉vue组件化开发很干净，有了vuex也不怕数据访问了，嗯。。。不想说话只想看倚天屠龙记！！！我终于编完了！！！！！！！！！！！！！
