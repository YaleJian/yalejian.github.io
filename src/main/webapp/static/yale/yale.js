/**
 * 工具JS
 * type:Dev
 * version:1.0.0
 * 仅提供常见业务解决方案，方法本身不规定业务内容，每个方法对其他方法无依赖
 * Created by yalejian on 2017/2/23.
 */

//这种方式是为了减少全局变量的定义，防止定义了重复名称的变量或者方法引发的冲突
var yale = yale || {};//先查找全局是否有定义yale，如果有定义则赋值为{}，防止被覆盖
yale.console = false;//工具JS全局console方法
yale.count = {
    tree: {
        all: 0,
        sortData: 0
    }
};

/**
 * 全局常量
 */
yale.name = {};

/**
 * 全局异常
 */
yale.exception = {};

/**
 * 操作DOM
 */
yale.innerEl = yale.innerEl || {};//yale.这种方式可以查看到所有的方法
yale.innerEl = {
    /**
     *  获取模板，拼接页面（循环数据+模板）
     *  参数：param
     */
    jointTags: function (param) {

        //此方法内console开关
        function _console(arrayData) {
            if (param.consoleON || "" === true || yale.console === true) console.log(arrayData);
        }

        //校验数据&输出错误
        function undefinedThrow(name) {
            _console(name + " " + message.UndefinedParameters || "参数未定义");
            throw name + " " + message.UndefinedParameters || "参数未定义";

        }

        //基础参数分离
        var tagObj = param.tagObj || undefinedThrow("tagObj");//模板对象
        var arrayData = param.arrayData || undefinedThrow("arrayData");//数据

        //扩展参数分离
        var vTag = param.vTag || ["{", "}"];//动态值标签的包裹标识，不设置时动态值包裹标识默认使用"{ }"

        var addData = param.addData || ""; //额外数据
        var addDataKeys = [];
        for (var key in addData[0]) {
            addDataKeys.push(key);
        }

        var pageName = param.pageName || "count";
        var pageCurrent = param.pageCurrent || 1;//不设置时默认为第一页
        var pageNum = param.pageNum || 10;//不设置时默认为每页10条

        //生成模板
        var template = tagObj.innerHTML;
        /*//提取模板的动态值key（包裹标签内的变量名称）
         try {
         var values = template.match(/\{(.*?)\}/gi).join();//待修改！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
         } catch (e) {
         _console(message.DynamicValueIsNotDefinedInTheTemplate || "在模板中没有定义动态值");
         return message.DynamicValueIsNotDefinedInTheTemplate || "在模板中没有定义动态值";
         }*/

        //修改动态值并拼接
        var tags = "";
        for (var j in arrayData) {
            var tag = template;//初始化页面模板

            for (var a = 0; a < addDataKeys.length; a++) {//合并数据
                var addDataKey = addDataKeys[a];
                arrayData[j][addDataKey] = addData[j % addDataKeys.length][addDataKey];
            }
            for (var key in arrayData[j]) {//循环每个对象
                if (key === pageName) {
                    if (key === "count") {
                        _console("count" + message.Invalid + ",arrayData" + message.DataAlreadyExistsInThisName || "无效，arrayData数据中已存在此名称");
                        return "count" + message.Invalid + ",arrayData" + message.DataAlreadyExistsInThisName || "无效，arrayData数据中已存在此名称";
                    } else {
                        _console("pageName:" + key + (message.Invalid + ",arrayData" + message.DataAlreadyExistsInThisName) || "无效，arrayData数据中已存在此名称");
                        return "pageName:" + key + (message.Invalid + ",arrayData" + message.DataAlreadyExistsInThisName) || "无效，arrayData数据中已存在此名称";
                    }
                }
                // if (values.indexOf(key) > 0) {//动态值替换校验：每个对象的属性，在模板中被使用时，才会去替换
                tag = tag.replace(new RegExp(vTag[0] + key + vTag[1], "g"), arrayData[j][key]);//修改模板所有的动态值
                tag = tag.replace(new RegExp(vTag[0] + "." + pageName + vTag[1], "g"), parseInt(j) +
                    (pageCurrent - 1) * pageNum + 1);//序号，点号用于区分这是页码
                // }
            }
            tags = tags + tag;//生成的所有标签
        }

        // tagObj.innerHTML = tags;
        return tags;
    }
};

/**
 * 生成树结构
 */
yale.tree = yale.tree || {};
yale.tree = {
    param: {
        consoleON: false,
        data: [],//数据
        tree: {},//生成树的区域
        //节点模版
        nodeTemplate: '<div id="nodeTemp">' +
        '   <div class="node" id="node_{id}" parentId="{parentId}">' +
        '       <span class="expandIcon {expandIcon}"></span>' +
        '       <input type="checkbox" checkboxId="{id}">' +
        '       <span id="nodeName_{id}">{nodeName}</span>' +
        '       <div id="child_{id}"></div>' +
        '   </div>' +
        '</div>'
    },
    console: function (param) {//此方法的日志开关
        if (yale.tree.param.consoleON === true) console.log(param);
    },

    jsonData: [],
    arrayData: [],//排序好的数据（数组对象格式）
    parentIds: [],//存储所有父节点ID
    info: {
        rootNode: {},//根节点
        endNode: {},//结尾节点
    },
    selectIds: [],

    createTree: function () {
        console.time("createTree");

        yale.tree.optimizeData();//数据优化
        yale.tree.createRootNode();//展示根节点
        yale.tree.addEvents();//为标签绑定事件

        console.timeEnd("createTree");

    },
    //数据优化
    optimizeData: function () {

        var data = yale.tree.param.data;
        var jsonData = [];
        var rootNode = data[0];
        var endNode = data[0];

        // 转换为json格式
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            var parentId = data[i].parentId;

            //获取根节点
            if (id < rootNode.id) {
                rootNode = data[i];
            }

            //获取结尾节点
            if (id > endNode.id) {
                endNode = data[i];
            }

            //防止父id和子id相等造成的死循环
            if (data[i].id === data[i].parentId) {
                throw "参数有误，存在相同id和parentId，id为：" + data[0].id;
            }

            data[i].nodeName = yale.tree.param.data[i].text;
            data[i].childNodeIds = [];
            data[i].grade = 0;
            data[i].open = false;
            data[i].selected = false;
            jsonData[data[i].id] = data[i];

        }

        yale.tree.info.rootNode = rootNode;
        yale.tree.info.endNode = endNode;


        for (var key = 0; key < jsonData.length; key++) {

            //容错，当节点ID不连贯时,补全缺失的节点
            if (jsonData[key] == undefined) {
                var noNode = {
                    id: key,
                    parentId: key - 1,
                    nodeName: "此节点缺失",
                    grade: 0,
                    open: false,
                    selected: false
                };
                jsonData[key] = noNode;
            }

            //生成层级数据、记录节点的子节点ID
            var grade = 1;
            var parentId = jsonData[key].parentId;
            while (parentId > 0 || parentId === null || parentId === undefined || parentId === "") {
                grade++;
                parentId = jsonData[parentId].parentId;//获取上一个父级
            }
            jsonData[key].grade = grade;

            //记录每个节点的子节点
            var nowNodeParentId = jsonData[key].parentId;
            if (nowNodeParentId > 0) jsonData[nowNodeParentId].childNodeIds.push(jsonData[key].id);
        }

        yale.tree.jsonData = jsonData;
    },


    //创建根节点
    createRootNode: function () {
        var nodeTemplate = yale.tree.param.nodeTemplate;
        var rootNode = yale.tree.info.rootNode;

        //判断根节点是否有子节点，有就给图标
        var expandIcon = yale.tree.param.expandIcon || ["fa fa-angle-right", "fa fa-angle-down"];
        if (rootNode.childNodeIds.length > 0) {
            rootNode.expandIcon = expandIcon[0];
        }
        var param = {
            tagObj: nodeTemplate,
            arrayData: [rootNode]
        };
        var tag = yale.innerEl.jointTags(param);

        yale.tree.param.tree.html(tag);
        return tag;
    },

    //创建父节点的子级标签
    createChildTags: function (id) {

        var nodeTemplate = yale.tree.param.nodeTemplate;
        var jsonData = yale.tree.jsonData;
        var tags = "";
        var childNodeIds = jsonData[id].childNodeIds;

        for (var i in childNodeIds) {
            var node = jsonData[childNodeIds[i]];
            var expandIcon = yale.tree.param.expandIcon || ["fa fa-angle-right", "fa fa-angle-down"];
            if (node.childNodeIds.length > 0) node.expandIcon = expandIcon[0];//有子级

            var param = {
                tagObj: nodeTemplate,
                arrayData: [node]
            };
            tags = tags + yale.innerEl.jointTags(param);

        }

        return tags;
    },

    /**
     * 绑定树事件
     * @param param
     */
    addEvents: function () {
        var param = yale.tree.param;

        //此方法内console开关
        function _console(data) {
            if (param.consoleON || "" === true || yale.console === true) console.log(data);
        }

        var tree = param.tree;

        //默认使用自带的复选框、单选样式，可选自定义
        /**
         * 展开事件
         */
        tree.on("click", ".node", function (e) {
            var id = parseInt($(this).attr("nodeId"));

            var node = yale.tree.jsonData[id];
            var childNodeNum = node.childNodeIds.length;
            var childNodes = $("#child_" + id);
            var expandIcon = $(this).find(".expandIcon").first();

            //父节点变化
            if (childNodes.css("display") === "none" && childNodeNum > 0) {
                //已关闭
                expandIcon.removeClass("fa-angle-right").addClass("fa-angle-down");
                childNodes.css("display", "block");
            } else if (childNodeNum > 0) {
                //已展开
                expandIcon.removeClass("fa-angle-down").addClass("fa-angle-right");
                childNodes.css("display", "none");
            }

            //子节点变化
            if (childNodes.html() === "" && childNodeNum > 0) {//当有子节点 且 未生成过子节点
                var nextNodeTag = yale.tree.createChildTags(id);
                childNodes.append(nextNodeTag);

                //为下级增加缩进
                var icon_margin_left = parseInt($(this).find(".expandIcon").css('marginLeft'));
                childNodes.find(".expandIcon").css("marginLeft", icon_margin_left + 12 + "px");

                //记录已展开的节点

                //当前父级的图标改为展开
                $(this).find(".expandIcon").first().removeClass("fa-angle-right").addClass("fa-angle-down");

                //处理当前节点已选中，子节点全部选中
                if (node.selected) {
                    //选中全部子节点
                    for (var i in node.childNodeIds) {
                        yale.tree.jsonData[node.childNodeIds[i]].selected = true;
                    }

                    $("#node_" + id).find("input[type='checkbox']").prop("checked", true);
                }

            }


            e.stopPropagation();

        });


        /**
         * 复选框事件
         */
        tree.on("click", "input[type='checkbox']", function (e) {

            var jsonData = yale.tree.jsonData;
            var id = parseInt($(this).attr("nodeId"));
            var node = jsonData[id];
            var parentId = node.parentId;
            var selectId = id;
            if ($(this).is(':checked')) {

                //页面变化
                //向下变化：选中全部子节点
                $("#node_" + id).find("input[type='checkbox']").prop("checked", true);
                var childNode =  $("#node_" + id).find("input[type='checkbox']:checked");
                for(var i=0;i<childNode.length;i++){
                    var nodeId = $(childNode[i]).attr("nodeId");
                    removeFromArray(parseInt(nodeId),yale.tree.selectIds);
                    jsonData[nodeId].selected = true;
                }

                //向上变化：子节点都选中，自动选中父级
                var thisParentId = parentId;
                while (thisParentId > 0) {
                    var nowChildSelectedNum = $("input[parentId=" + thisParentId + "]:checked");//当前选中的数量
                    if (jsonData[thisParentId].childNodeIds.length === nowChildSelectedNum.length) {
                        $("#checkbox_" + thisParentId).prop("checked", true);
                        yale.tree.jsonData[thisParentId].selected = true;

                        //存储父节点
                        selectId = thisParentId;

                        //去除父节点的子节点在选中数据中的ID，只保存全选的最高节点ID
                        var selectedChildCheckboxs = $("#node_"+thisParentId).find("input[type='checkbox']:checked");
                        for(var i=0;i< selectedChildCheckboxs.length;i++){
                            var nodeId = $(selectedChildCheckboxs[i]).attr("nodeId");
                            var nodeIdIndex = $.inArray(parseInt(nodeId),yale.tree.selectIds);
                            if(nodeIdIndex != -1) {
                                yale.tree.selectIds.splice(nodeIdIndex, 1);
                                jsonData[nodeIdIndex].selected = false;
                            }
                        }



                    }
                    thisParentId = jsonData[thisParentId].parentId;
                }

                //当前节点数据设置为选中
                node.selected = true;
                //存点选的节点数据
                yale.tree.selectIds.push(parseInt(selectId));


            } else {

                //页面变化
                //向下变化：取消选中全部子节点
                var childNode =  $("#node_" + id).find("input[type='checkbox']:checked");
                for(var i=0;i<childNode.length;i++){
                    var nodeId = $(childNode[i]).attr("nodeId");
                    removeFromArray(parseInt(nodeId),yale.tree.selectIds);
                }
                $("#node_" + id).find("input[type='checkbox']").prop("checked", false);

                //向上变化：子节点都选中，自动取消选中父级
                var thisParentId = parentId;
                var deselected = [];
                while ($("#checkbox_" + thisParentId).is(':checked')) {
                    var nowChildSelectedNum = $("input[parentId=" + thisParentId + "]:checked");//当前选中的数量
                    if (jsonData[thisParentId].childNodeIds.length !== nowChildSelectedNum.length) {
                            $("#checkbox_" + thisParentId).prop("checked", false);
                            yale.tree.jsonData[thisParentId].selected = false;
                            deselected.push(thisParentId);

                            //存储当前操作节点的父节点的全部子节点、去除选择数据中的父节点ID
                            var thisChildIds = yale.tree.jsonData[thisParentId].childNodeIds;
                            var selectedChild = thisChildIds.concat();

                            yale.tree.selectIds =yale.tree.selectIds.concat(selectedChild);


                    }
                    thisParentId = jsonData[thisParentId].parentId;
                }

                //去除取消的父级ID
                for(var d in deselected){
                    removeFromArray(deselected[d],yale.tree.selectIds);
                }


                ///当前节点数据设置为不选中
                node.selected = false;
                //去除点选的节点数据
                removeFromArray(id,yale.tree.selectIds);


            }


            _console(yale.tree.selectIds);
            e.stopPropagation();

            //从数组中移除方法
            function removeFromArray(param , arrayList){
                var nodeIdIndex = $.inArray(param, arrayList);
                if (nodeIdIndex != -1) {
                    arrayList.splice(nodeIdIndex, 1);
                }
            }

        });
    }



};

/**
 * 排序
 */
yale.arrySort = {
    /**
     冒泡排序
     */
    bubbleSort: function (array) {
        var len = array.length, i, j, d;
        for (i = len; i--;) {
            for (j = 0; j < i; j++) {
                var z = j + 1;
                if (array[j] > array[z]) {
                    d = array[j];
                    array[j] = array[z];
                    array[z] = d;
                }
            }
        }
        return array;
    },
    /**
     鸡尾酒
     */
    cocktailSort: function (array) {

        var len = array.length;
        var item = array[0];
        var i = 0;
        var j = len;
        var k = 0;
        var index = 0;
        var ischange = false;

        while (j - i > 1) {
            //寻找最大
            ischange = false;
            item = array[i];
            index = i;
            for (k = i; k < j; k++) {
                if (item > array[k]) {
                    array[index] = array[k];
                    array[k] = item;
                    ischange = true;
                } else {
                    item = array[k];

                }
                index = k;
            }
            j--;

            //寻找最小
            item = array[j];
            index = j;
            for (k = j; k > i - 1; k--) {
                if (item < array[k]) {
                    array[index] = array[k];
                    array[k] = item;
                    ischange = true;
                } else {
                    item = array[k];

                }
                index = k;
            }

            i++;
            //没有任何交换跳出
            if (ischange == false) {
                break;
            }
        }

        return array;
    },
    /**
     梳排序
     */
    combSort: function (list) {
        var len = list.length;
        var gap = len;
        var swapped = true;

        while (gap > 1 || swapped) {
            if (gap > 1) {
                gap = Math.floor(gap / 1.3); //获取排序间隔
            }

            var i = 0;
            swapped = false;
            while (i + gap < len) {
                if (list[i] - list[i + gap] > 0) { //如果为正数,交换位置
                    var tmp = list[i];
                    list[i] = list[i + gap];
                    list[i + gap] = tmp;
                    swapped = true;
                }
                i++;
            }
        }
        return list;
    },
    /**
     * 插入排序
     * @param array
     * @returns {*}
     */
    insertSort: function (array) {

        var i = 1, j, step, key,
            len = array.length;

        for (; i < len; i++) {
            step = j = i;
            key = array[j];
            while (--j > -1) {
                if (array[j] > key) {
                    array[j + 1] = array[j];
                } else {
                    break;
                }
            }
            array[j + 1] = key;
        }

        return array;
    },
    /**
     奇偶
     */
    oddEvenSort: function (list) {
        var len = list.length;
        var sorted = true;

        while (sorted) {
            sorted = false;

            for (var i = 1; i < len - 1; i += 2) {
                if (list[i] > list[i + 1]) {
                    var t = list[i];
                    list[i] = list[i + 1];
                    list[i + 1] = t;
                    sorted = true;
                }
            }

            for (var i = 0; i < len; i += 2) {

                if (list[i] > list[i + 1]) {
                    var tmp = list[i];
                    list[i] = list[i + 1];
                    list[i + 1] = tmp;
                    sorted = true;
                }
            }
        }
    },
    /**
     快速排序
     */
    quickSort: function (array) {
        if (array.length == 0) {
            return array;
        }
        var i = 0;
        var j = array.length - 1;
        var Sort = function (i, j) {

            // 结束条件
            if (i == j) {
                return;
            }

            var key = array[i];
            var stepi = i; // 记录开始位置
            var stepj = j; // 记录结束位置

            while (j > i) {
                // j <<-------------- 向前查找
                if (array[j] >= key) {
                    j--;
                } else {

                    array[i] = array[j]
                    //i++ ------------>>向后查找
                    while (j > ++i) {
                        if (array[i] > key) {
                            array[j] = array[i];
                            break;
                        }

                    }
                }

            }

            // 如果第一个取出的 key 是最小的数
            if (stepi == i) {
                Sort(++i, stepj);
                return;
            }

            // 最后一个空位留给 key
            array[i] = key;


            // 递归
            Sort(stepi, i);
            Sort(j, stepj);
        }

        Sort(i, j);

        return array;
    },
    /**
     选择排序
     */
    selectionSort: function (array) {
        var len = array.length;
        var index = 0;
        var k;
        var item;
        var c;
        for (var i = 0; i < len; i++) {

            item = array[i];
            index = i;
            //寻找最小的数位置
            for (j = i + 1; j < len; j++) {
                if (array[j] < item) {
                    index = j;
                    item = array[j];
                }
            }
            if (index != i) {
                c = array[i];
                array[i] = array[index];
                array[index] = c;
            }
        }
        return array;
    },
    /**
     希尔
     */
    shellSort: function (array) {

        var stepArr = [1031612713, 217378076, 45806244, 9651787, 2034035, 428481, 90358, 19001, 4025, 1750, 836, 701, 301, 132, 57, 23, 10, 4, 1]; // reverse() 在维基上看到这个最优的步长 较小数组
        var i = 0;
        var stepArrLength = stepArr.length;
        var len = array.length;
        var len2 = parseInt(len / 2);

        for (; i < stepArrLength; i++) {
            if (stepArr[i] > len2) {
                continue;
            }
            stepSort(stepArr[i]);
        }

        // 排序一个步长
        function stepSort(step) {

            //console.log(step) 使用的步长统计

            var i = 0, j = 0, f, tem, key;


            for (; i < step; i++) {// 依次循环列
                for (j = 1; step * j + i < len; j++) {//依次循环每列的每行
                    tem = f = step * j + i;
                    key = array[f];
                    while ((tem -= step) >= 0) {// 依次向上查找
                        if (array[tem] > key) {
                            array[tem + step] = array[tem];
                        } else {
                            break;
                        }
                    }
                    array[tem + step] = key;
                }
            }

        }

        return array;

    }


};