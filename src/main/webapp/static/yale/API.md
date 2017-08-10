#JS插件API &nbsp;&nbsp;V1.0 
> 作者：YaleJian  &nbsp;&nbsp;初次创建：2017/03/17

## 核心思想
>此插件仅提供解决方法,对常用方法进行原生JS封装，不生产数据，只处理数据

## 使用方法
> 1.页面引入yale.js </br>
>  2.使用yale.方法来调用

## 1.渲染批量动态标签：innerTags(param)
> 新增时间：2017/03/17 17:09

###适用场景
>通过循环展现的页面部分</br>

### 示例
> html的body内容：

```
<div id="datas">
    <div style="background: #cae5ff ;width: 80px;">这是后面</div>
    <div class="name">姓名为：{username}<span>&nbsp;年龄是：{age}</span></div>
    <div style="background: #a4ef93 ;width: 80px;">这是后面</div>
</div>


```
>JS内容：

```
var data = [
        {
            username: "小张",
            age: 20
        },
        {
            username: "小马",
            age: 21
        },
        {
            username: "小红",
            age: 23
        }
    ];
var tagObj = document.getElementById("datas");
var valueStyle = ["{", "}"];
var param = {
        tagObj: tagObj,//模板对象
        data: data,//js对象数组
        //扩展参数
        valueStyle: valueStyle,//动态值包裹的左右标识
        previousTag: "<div>hello</div>",//前标签字符串或对象
        nextTag: "<div>world</div>"//后标签字符串或者对象
    };
```
###参数说明：

参数名称 | 数据格式 | 解释 | 是否必备
---|---|---|---
param | JS对象 | 参数集合的对象 | 是

>param参数对象配置说明：

参数名称 | 数据格式 | 解释 | 是否必备|例子
---|---|---|---|---
tagObj | 标签对象 | 模板对象 | 是|document.getElementById("datas")
data | JS对象数组 | 需要循环的数据|是|参照示例
valueStyle | 字符串数组 | 包裹动态值的标识，用长度为2的数组表示|否|["{", "}"]
previousTag |标签对象或字符串| 模板前增加标签成新模板|否|参照示例
nextTag |标签对象或字符串| 模板后增加标签成新模板|否|参照示例

###使用方法
>基础方法：</br>
 1.首先页面需要一个已经设计好的**模板**</br>
 2.准备数据，例如使用AJAX从后台请求来的**对象数据**List</br>
 3.在JS中使用选择器获取这个模板</br>
 4.将数据对象数组和标签对象作为参数param的属性</br>
 5.调用方法并**传入参数**对象</br>
 
-
 
>自定义动态值包裹标识:
 在param参数对象中配置valueStyle属性，valueStyle属性为一个长度为2的字符串数组，例如["{","}"]
 
-
>修改模板：
 当需要在模板前增加固定的一个html标签内容时，在param参数对象中配置previousTag属性，previousTag属性可以为html标签对象也可以是字符串的html标签，要在模板后增加一个固定的html标签内容，在param参数对象中配置nextTag属性。

 
 


