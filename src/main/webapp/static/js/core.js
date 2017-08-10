/**
 * 基本工具类 常用页面工具 事件 等
 */

(function(window, jQuery) {
	// js严格校验
	if (typeof jQuery === "undefined") {
		throw new Error("需要jQuery");
	}
	if (window["core.js is loadded"]) {
		console.log("core.js is loadded");
		return;
	}
	window["core.js is loadded"] = true;
	var core = window.core || new Object();
	// 声明命名空间 以便全局使用
	window.core = core;

	// 当前项目路径
	core.getRootPath = function() {

		var curWwwPath = window.document.location.href;
		var pathName = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathName);
		var localhostPaht = curWwwPath.substring(0, pos);
		if (pathName != null) {
			pathName = pathName.replace(/\/+/g, "/");
		}
		if (typeof (basePath) != 'undefined' && basePath != null && (basePath == '' || basePath == '/')) {
			var httpName = curWwwPath.split('://')[0];
			var httpPath = curWwwPath.split('://')[1];
			localhostPaht = httpName + '://' + (httpPath.substring(0, httpPath.indexOf("/")));
			return (localhostPaht) + "/";
		} else {
			var projectName = pathName.substring(0, pathName.substr(1).indexOf("/") + 1);
			return (localhostPaht + projectName) + "/";
		}
	};

	// 当前项目路径
	window.basePath = core.basePath = core.getRootPath();
	window.webSocketPath = core.webSocketPath = basePath.replace('http://', 'ws://').replace('https://', 'ws://');
	core.getBrowser = function() {
		var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
		var isOpera = userAgent.indexOf("Opera") > -1;
		// 判断是否Opera浏览器
		if (isOpera) {
			return "Opera"
		}
		// 判断是否Firefox浏览器
		if (userAgent.indexOf("Firefox") > -1) {
			return "FF";
		}
		// 判断是否Chrome浏览器
		if (userAgent.indexOf("Chrome") > -1) {
			return "Chrome";
		}
		// 判断是否Safari浏览器
		if (userAgent.indexOf("Safari") > -1) {
			return "Safari";
		}
		if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
			return "IE";
		}
		// 判断是否IE浏览器
	}
	var browserInfo = core.getBrowser();
	core.isIE = function() {
		if (browserInfo == 'IE') {
			return true;
		}
		return false;
	};
	core.setTitle = function(arg) {
		$('head title').html(arg);
	};
	core.error = function(code, message, object) {
		var result = {};
		result.core = code;
		result.message = message;
		result.object = object;
		return result;
	}
	core.config =
	{
		// 开启单页面
		openSinglePage : false,
		// 开启单页面动画
		openSinglePageAnimation : false,
		openUploadProgress : true,
		post :
		{
			errcode : "data.errcode",
			errmsg : "data.errmsg",
			result : "data.result",
			successcode : 0
		},
		action :
		{
			toIndex : "index/toIndex.do",
			toLogin : "login/toLogin.do",
			doLogin : "login/doLogin.do",
			doUpload : "core/file/file.upload",
			uploadProgress : "core/file/file.progress",
			coreSocket : "core/socket/web.socket",
			error :
			{
				404 : "error/404.do",
				500 : "error/500.do",
				toNoAccess : "error/toNoAccess.do",
				toNotOnline : "error/toNotOnline.do"
			}
		},
		page :
		{
			frame :
			{
				content : "#page-body-content",
				oldContent : "#page-body-content-old"
			}
		},
		label :
		{
			define : "确定",
			cancel : "取消",
			title : "标题",
			alertBoxTitle : "提示信息",
			confirmBoxTitle : "确认信息",
			search : "搜索",
			searchInputPlaceholder : "请输入搜索内容",
			confirmChecked : "是否选中"
		},
		error :
		{
			// 全局错误
			connectionTimedOut :
			{
				code : 10001,
				info : "链接超时",
				show : "链接超时，请检查网络环境！"
			},
			noNetwork :
			{
				code : 10002,
				info : "无网络",
				show : "无法连接服务器，请检查网络环境！"
			},

			// 表单元素验证错误
			isNull :
			{
				code : 30001,
				info : "输入值为空",
				show : "$label值不能为空！"
			},
			patternMismatch :
			{
				code : 30002,
				info : "输入值格式不匹配",
				show : "请输入正确$label格式！"
			},
			isLong :
			{
				code : 30003,
				info : "输入值太长",
				show : "$label的字符数不能超过$maxlength个字符！"
			},
			isShort :
			{
				code : 30004,
				info : "输入值太短",
				show : "$label的字符数不能少于$minlength个字符！"
			},
			isMin :
			{
				code : 30005,
				info : "输入值太小",
				show : "$label不能小于$min！"
			},
			isMax :
			{
				code : 30006,
				info : "输入值太大",
				show : "$label不能大于$max！"
			},
			isNotUrl :
			{
				code : 30007,
				info : "输入值不是有效的链接",
				show : "$label请输入正确的链接！"
			},
			isNotMail :
			{
				code : 30008,
				info : "输入值不是有效的邮箱",
				show : "$label请输入正确的邮箱！"
			},
			isNotNumber :
			{
				code : 30009,
				info : "输入值不是有效的数字",
				show : "$label请输入正确的数字！"
			},
			isNotInteger :
			{
				code : 30010,
				info : "输入值不是有效的整数",
				show : "$label请输入正确的整数！"
			},
			isNotDate :
			{
				code : 30011,
				info : "输入值不是有效的日期",
				show : "$label请输入正确的日期！"
			},
			isNotDatetime :
			{
				code : 30012,
				info : "输入值不是有效的日期时间",
				show : "$label请输入正确的日期时间！"
			},
			isNotPhone :
			{
				code : 30013,
				info : "输入值不是有效的手机号",
				show : "$label请输入正确的手机号码！"
			},
			isNotIDCard :
			{
				code : 30014,
				info : "输入值不是有效的身份证",
				show : "$label请输入正确的身份证！"
			},
			isNotTel :
			{
				code : 30015,
				info : "输入值不是有效的座机",
				show : "$label请输入正确的座机号码！"
			},
			isNotTime :
			{
				code : 30016,
				info : "输入值不是有效的时间",
				show : "$label请输入正确的时间！"
			},
			isNotImageFile :
			{
				code : 30017,
				info : "无效的图片文件",
				show : "$label请上传正确的图片文件！"
			},
			isNotAudioFile :
			{
				code : 30018,
				info : "无效的音频文件",
				show : "$label请上传正确的音频文件！"
			},
			isNotVideoFile :
			{
				code : 30019,
				info : "无效的视频文件",
				show : "$label请上传正确的视频文件！"
			},
			isNotOtherFile :
			{
				code : 30020,
				info : "请上传格式为$filetype类型的文件",
				show : "$label请上传正确的视频文件！"
			},
			isToLongFile :
			{
				code : 30021,
				info : "文件不能大于$maxfilelengthM",
				show : "$label文件不能大于$maxfilelengthM"
			},
			notEq :
			{
				code : 300022,
				info : "输入值不等于$eq",
				show : "$label必须等于$eq！"
			},
			notGt :
			{
				code : 300023,
				info : "输入值必须大于$gt",
				show : "$label不能小于等于$gt！"
			},
			notGte :
			{
				code : 300023,
				info : "输入值必须大于等于$gte",
				show : "$label不能小于$gte！"
			},
			notLt :
			{
				code : 300023,
				info : "输入值必须小于$lt",
				show : "$label不能大于等于$lt！"
			},
			notLte :
			{
				code : 300023,
				info : "输入值必须小于等于$lte",
				show : "$label不能大于$lte！"
			}
		},
		server :
		{
			fileServerUrl : basePath + "upload/file"
		},
		images :
		{
			loading : basePath + "/core/images/image/loading.gif",
			noimg : basePath + "/core/images/image/noimage.png",
			notfindimg : basePath + "/core/images/image/notfindimage.png",
			clickupload : basePath + "/core/images/image/clickupload.png",
			s : ""
		},
		plugins :
		{
			jquery_datetimepicker :
			{
				js : [ "jquery/js/jquery.datetimepicker.js" ],
				css : [ "jquery/css/jquery.datetimepicker.css" ]
			},
			mobiscroll :
			{
				js : [ "mobiscroll/js/mobiscroll.custom-2.5.2.min.js" ],
				css : [ "mobiscroll/css/mobiscroll.custom-2.5.2.min.css" ]
			},
			bootstrap :
			{
				js : [ "bootstrap/js/bootstrap.min.js" ],
				css : [ "bootstrap/css/bootstrap.min.css" ]
			},
			bootstrap_switch :
			{
				js : [ "bootstrap-switch/bootstrap-switch.min.js" ],
				css : [ "bootstrap-switch/bootstrap-switch.css" ]
			},
			bootstrap_wizard :
			{
				js : [ "bootstrap-wizard/jquery.bootstrap.wizard.min.js" ],
				css : []
			},
			bootstrap_slider :
			{
				js : [ "bootstrap-slider/bootstrap-slider.js" ],
				css : [ "bootstrap-slider/bootstrap-slider.css" ]
			},
			draggabilly :
			{
				js : [ "Draggabilly/draggabilly.pkgd.js" ],
				css : []
			},
			colorpicker :
			{
				js : [ "colorpicker/colorpicker.js" ],
				css : [ "colorpicker/css/colorpicker.css" ]
			},
			jquery_sortable :
			{
				js : [ "jquery/sortable/jquery-ui.js" ],
				css : []
			},
			kindeditor :
			{
				js : [ "kindeditor/kindeditor.js", "kindeditor/lang/zh_CN.js", "kindeditor/plugins/code/prettify.js" ],
				css : [ "kindeditor/themes/default/default.css", "kindeditor/plugins/code/prettify.css" ],
				themesPath : "kindeditor/themes/"
			},
			data_tables :
			{
				js : [ "dataTables/jquery.dataTables.min.js", "dataTables/dataTables.bootstrap.js" ],
				css : [ "dataTables/css/dataTables.bootstrap.css", "dataTables/css/jquery.dataTables.css" ]
			},
			tags_input :
			{
				js : [ "tagsInput/jquery.tagsinput.min.js" ],
				css : [ "tagsInput/jquery.tagsinput.css" ]
			},
			jquery_autocomplete :
			{
				js : [ "jquery-autocomplete/jquery.autocomplete.js" ],
				css : [ "jquery-autocomplete/jquery.autocomplete.css" ]
			},
			mCustomScrollbar :
			{
				js : [ "mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js" ],
				css : [ "mCustomScrollbar/jquery.mCustomScrollbar.css" ]
			}

		},
		event :
		{
			pageLoadSuccess : function(config) {
				var html = config.html;
				var animation = config.animation;
				var showtype = config.showtype;

				var pageContent = $(core.config.page.frame.content);
				var pageWindow = null;
				var oldContent = $(core.config.page.frame.oldContent);
				oldContent.empty();
				if (core.config.openSinglePageAnimation) {
					pageContent.children().appendTo(oldContent);
				}
				pageContent.empty();
				var $page = $(html);
				$page.appendTo(pageContent);

				core.theme.full($('#core-need-full-page').length > 0 && $('#core-need-full-page').closest('.core-box-window').length == 0);

				if (core.config.openSinglePageAnimation) {
					if (window['istoaction']) {
						animation = 1;
					} else {
						animation = null;
					}
					window['istoaction'] = false;
					if (animation) {
						// 需要执行动画设置统一高度
						var oldHeight = oldContent.height();
						var pageHeight = pageContent.height();
						oldContent.css('height', pageHeight + 'px');

						$('body').removeClass('page-animation-1 page-animation-2');
						window.setTimeout(function() {
							$('body').addClass('page-animation-' + animation);
						}, 100);
					}
				}

				var hash = '' + window.location.hash;
				hash = decodeURIComponent(hash);
				if (!core.isEmpty(hash)) {
					var $element = pageContent.find(hash);
					if ($element.length > 0) {
						var top = $element.offset().top;
						$("body").animate(
						{
							scrollTop : top
						}, 300);
					}
				}

			}
		}
	};
	core.config.model =
	{
		html :
		{
			cover : " <div id='window-core-cover' style='position: fixed;z-index: 99;left: 0px;right: 0px;bottom: 0px;top: 0px;background-color: black;opacity: 0.5;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=50);font-size: 30px;text-align: center;color: white;' >" + "</div>",
			loading : "  <div id='window-core-loading' style='position: fixed;z-index: 100;left: 0px;right: 0px;bottom: 0px;top: 0px;font-size: 30px;text-align: center;color: white;' >" + "	<div class='mask-div' style='border-radius: 5px;background-color: black;position: fixed;width: 100px;height: 100px;'>" + "		<img class='load-icon' src='" + core.config.images.loading + "' style='margin: 20px auto;width: 30px;'/>" + "		<div style='margin-top: -5px;font-size: 13px;'>加载中" + "			<span class='loadding-font-end' style='position: absolute;width: 30px;text-align: left;'></span>" + "		</div>" + "	</div>" + "</div>",
			uploading : "  <div id='window-core-uploading' style='position: fixed;z-index: 100;left: 0px;right: 0px;bottom: 0px;top: 0px;font-size: 30px;text-align: center;color: white;' >" + "	<div class='mask-div' style='position: fixed;border-radius: 5px;background-color: black;width: 200px;height: 100px;'>" + "		<div style='margin-top: 43px;width: 100%;height: 2px;'>" + "			<div style='width: 90%;margin-left: 5%;height: 100%;background-color: #ddd;' class='core-upload-progress-div'>" + "				<div style='background-color: #6ec7e0;height: 100%;' class='core-upload-progress'>" + "				</div>" + "			</div>" + "		</div>" + "		<div style='font-size: 13px;    margin-top: 20px;width: 100%;' class='core-upload-text'>上传中"
					+ "			<span class='loadding-font-end' style='position: absolute;width: 30px;text-align: left;'></span>" + "		</div>" + "	</div>" + "</div>"
		},
		style : " <style type=\"text/css\">" + "	@keyframes loaddingFontEnd{0%{content: ''}25%{content: '.'}50%{content: '..'}75%{content: '...'}100%{content: ''}}" + "	.loadding-font-end:before{content: '';animation: loaddingFontEnd 1000ms infinite;}" + "</style>"
	}
	core.config.rules =
	{
		time : /^(\d{2})[:时 ]?(\d{2})[:分 ]?$/,
		date : /^(\d{4})[-\/年 ]?(\d{2})[-\/月 ]?(\d{2})[日]?$/,
		datetime : /^(\d{4})[-\/年 ]?(\d{2})[-\/月 ]?(\d{2})[ |日]?(\d{2})[:时 ]?(\d{2})[:分 ]?$/,
		mailbox : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		url : /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=% :\/~+#]*[\w\-\@?^=% \/~+#])?$/,
		idcard : /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
		phone : /^1[3|4|5|7|8]\d{9}$/,
		tel : /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
	}

	// 是否为空
	core.isEmpty = function(arg) {
		return typeof (arg) == "undefined" || arg == null || arg.length == 0;
	};
	core.isPC = function() {
		var userAgentInfo = navigator.userAgent;
		var Agents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod" ];
		var flag = true;
		for ( var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	};
	// 是否包含字符串
	core.has = function(arg1, arg2) {
		if (this.isEmpty(arg1) || this.isEmpty(arg2)) {
			return false;
		}
		if (arg1.indexOf(arg2) != -1) {
			return true;
		}
		return false;
	}
	core.isArray = function(arg) {
		return jQuery.isArray(arg);
	};
	core.isString = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return typeof (arg) === "string";
	};
	core.isObject = function(arg) {
		return typeof (arg) === "object";
	};
	core.isNumber = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (/^[-]?[0-9]+\.?[0-9]*$/.test(arg));
	};
	core.isFunction = function(arg) {
		return typeof (arg) === "function";
	};
	core.replaceAll = function(arg1, arg2, arg3) {
		if (this.isEmpty(arg1) || this.isEmpty(arg2)) {
			return arg1;
		}
		return ("" + arg1).replace(new RegExp(arg2, 'gm'), arg3);
	};
	core.isBoolean = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return typeof (arg) === "boolean";
	};
	core.isInteger = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (/^-?[0-9]*$/.test(arg));
	}
	core.isPhone = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (core.config.rules.phone.test(arg));
	}
	core.isTel = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (core.config.rules.tel.test(arg));
	}
	core.isIDCard = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (core.config.rules.idcard.test(arg));
	}
	core.isUrl = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (core.config.rules.url.test(arg));
	}
	core.isMailbox = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (core.config.rules.mailbox.test(arg));
	}

	core.isDate = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (core.config.rules.date.test(arg));
	}
	core.isDatetime = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (core.config.rules.datetime.test(arg));
	}
	core.isTime = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (core.config.rules.time.test(arg));
	}

	core.getNowDate = function() {
		return core.date.format(new Date(), "yyyy-MM-dd");
	}
	core.getNowDatetime = function() {
		return core.date.format(new Date(), "yyyy-MM-dd hh:mm");
	}
	core.getNowTime = function() {
		return core.date.format(new Date(), "hh:mm");
	}
	core.isVisible = function(arg) {
		return !($(window).scrollTop() > ($(arg).offset().top + $(arg).outerHeight())) || (($(window).scrollTop() + $(window).height()) < $(arg).offset().top)
	}
	core.isOtherFile = function(arg1, arg2) {
		if (arg2.indexOf('.') < 0) {
			arg2 = "." + arg2;
		}
		var ext = arg1.substring(arg1.lastIndexOf("."), arg1.length).toUpperCase();
		if (ext != arg2.toUpperCase()) {
			return false;
		}
		return true;
	}
	core.isImage = function(arg) {
		var ext = arg.substring(arg.lastIndexOf("."), arg.length).toUpperCase();
		if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
			return false;
		}
		return true;
	}
	core.isVideo = function(arg) {
		var ext = arg.substring(arg.lastIndexOf("."), arg.length).toUpperCase();
		if (ext != ".AIFF" && ext != ".AVI" && ext != ".MOV" && ext != ".MPEG" && ext != ".QT" && ext != ".RAM" && ext != ".VIV" && ext != ".MP4") {
			return false;
		}
		return true;
	}
	core.isAudio = function(arg) {
		var ext = arg.substring(arg.lastIndexOf("."), arg.length).toUpperCase();
		if (ext != ".WMA" && ext != ".MP3" && ext != ".WAV" && ext != ".MP1" && ext != ".MP2" && ext != ".MIDI") {
			return false;
		}
		return true;
	};
	var numberindex = 0;
	core.getNumber = function() {
		numberindex++;
		var thisid = null;
		return new Date().getTime() - 1200000000000 + "" + Math.floor(Math.random() * 9 + 1) + "" + Math.floor(Math.random() * 9 + 1) + "" + numberindex;
	};

	core.clientid = core.getNumber();
	// 加入方法
	core.define = function(arg1, arg2) {
		var names = [ arg1 ];
		if (core.isArray(arg1)) {
			names = arg1;
		}
		var fns = [ arg2 ];
		if (core.isArray(arg2)) {
			fns = arg2;
		}
		$(names).each(function(index, name) {
			var arr = name.split('.');
			var context = core;
			for ( var i = 0; i < arr.length - 1; i++) {
				var str = arr[i];
				if (!context[str]) {
					context[str] = {};
				}
				context = context[str];
			}
			;
			context[arr[arr.length - 1]] = fns[index];
		});
		return this;
	};

	core.showLoadingIndex = 0;
	core.showUploadingIndex = 0;
	core.showCoverIndex = 0;
	core.showCover = function(place) {
		core.initCover();
		core.showCoverIndex++;
		core.cover.css('display', 'block');
	};
	core.hideCover = function(place) {
		core.initCover();
		core.showCoverIndex--;
		if (core.showCoverIndex == 0) {
			core.cover.css('display', 'none');
		}
	};

	core.showLoading = function(place) {
		core.showCover(place);
		core.showLoadingIndex++;
		core.loading.css('display', 'block');
		var maskDiv = core.loading.find('.mask-div');
		var l = ($(window).width() - $(maskDiv).width()) / 2;
		var t = ($(window).height() - $(maskDiv).height()) / 2 - 40;
		maskDiv.css(
		{
			"left" : l + 'px',
			"top" : t + 'px'
		});
	};
	core.hideLoading = function(place) {
		core.showLoadingIndex--;
		if (core.showLoadingIndex == 0) {
			window.setTimeout(function() {
				core.hideCover(place);
				core.loading.css('display', 'none');
			}, 200);
		} else {
			core.hideCover(place);
		}
	};
	core.showUploading = function(place) {
		core.showCover(place);
		core.showUploadingIndex++;
		core.uploading.css('display', 'block');
		core.uploading.find('.core-upload-progress').css('width', '0px');
		var maskDiv = core.uploading.find('.mask-div');
		var l = ($(window).width() - $(maskDiv).width()) / 2;
		var t = ($(window).height() - $(maskDiv).height()) / 2 - 40;
		maskDiv.css(
		{
			"left" : l + 'px',
			"top" : t + 'px'
		});
	};
	core.hideUploading = function(place) {
		core.showUploadingIndex--;
		if (core.showUploadingIndex == 0) {
			window.setTimeout(function() {
				core.hideCover(place);
				core.uploading.css('display', 'none');
			}, 200);
		} else {
			core.hideCover(place);
		}
	};

	var loadJSS = {};
	core.loadJS = function(path, callback) {
		var paths = [ path ];
		if (core.isArray(path)) {
			paths = path;
		}
		var allLoad = true;
		$(paths).each(function(index, path) {
			if (loadJSS[path]) {
			} else {
				allLoad = false;
			}
		})
		if (allLoad) {
			if (callback) {
				callback();
			}
			return;
		}
		function load(index) {
			if (index >= (paths.length)) {
				if (callback) {
					callback();
				}
				return;
			}
			var path = paths[index];
			var url = core.getUrl(path);
			if (loadJSS[path]) {
				load(index + 1);
				return;
			}
			var head = document.getElementsByTagName('head')[0], script = document.createElement('script');
			head.appendChild(script);
			script.src = url;
			script.charset = 'utf-8';
			script.onload = script.onreadystatechange = function() {
				if (!this.readyState || this.readyState === 'loaded') {
					script.onload = script.onreadystatechange = null;
					if ($('[src="' + url + '"]').length > 1) {
						head.removeChild(script);
					}
					loadJSS[path] = true;
					load(index + 1);
				}
			};
		}
		load(0);
	};
	var loadCSSS = {};
	core.loadCSS = function(path, callback) {
		var paths = [ path ];
		if (core.isArray(path)) {
			paths = path;
		}
		var allLoad = true;
		$(paths).each(function(index, path) {
			if (loadCSSS[path]) {
			} else {
				allLoad = false;
			}
		})
		if (allLoad) {
			if (callback) {
				callback();
			}
			return;
		}
		var length = 0;
		$(paths).each(function(index, path) {
			loadCSSS[path] = true;
			var url = core.getUrl(path);
			$('[core-main]').before("<link href='" + url + "' rel='stylesheet' type='text/css'>");

			length++;
			if (length == paths.length) {
				if (callback) {
					callback();
				}
			}
		});
	};

	core.plugins = core.plugins || {};
	core.plugins.add = function(plugin) {
		if (!core.isObject(plugin)) {
			throw new Error("插件格式为{plugin_name: {css: [], js: []}}");
		}
		for ( var name in plugin) {
			core.config.plugins[name] = plugin[name];
		}
	}
	var loadedPlugins = {};
	var loadingPlugins = {};
	var loadingPluginsCallbacks = {};
	function loadPlugin(pluginname, callback) {
		if (loadedPlugins[pluginname]) {
			callback && callback();
			return;
		}
		var plugin = core.config.plugins[pluginname]; // 获取对应的json
		if (plugin == null) {
			throw new Error(pluginname + ' is not defined');
		}
		var callbacks = loadingPluginsCallbacks[pluginname];
		callbacks = callbacks || [];
		callbacks[callbacks.length] = callback;
		if (loadingPlugins[pluginname]) {
			return;
		}
		loadingPlugins[pluginname] = true;
		loadingPluginsCallbacks[pluginname] = callbacks;
		var jss = plugin.js; // 获取js
		var csss = plugin.css; // 获取css
		var head = document.getElementsByTagName('head')[0];
		// 加载csss数组
		$.each(csss, function(index, css) {
			// 如果此css已加载，创建下个css
			if (loadCSSS[css] == true) {
				return true;
			}
			var link = document.createElement('link');
			head.appendChild(link);
			loadCSSS[css] = true;
			link.type = 'text/css';
			link.rel = 'styleSheet';
			if (css.indexOf("http") == 0) {
				link.href = css;
			} else {
				link.href = basePath + css;
			}

		}); // csss each

		// 加载jss数组
		var jsloadsucessindex = 0; // js坐标
		core.loadJS(jss, function() {
			loadedPlugins[pluginname] = true;
			loadingPlugins[pluginname] = false;
			var callbacks = loadingPluginsCallbacks[pluginname];
			loadingPluginsCallbacks[pluginname] = [];
			$.each(callbacks, function(callbackindex, plugincallback) {
				plugincallback && plugincallback(); // 调用回调
			});
		});
	}
	core.plugins.load = function(pluginname, callback) {
		var names = [ pluginname ];
		if (core.isArray(pluginname)) {
			names = pluginname;
		}
		// 遍历插件数组
		var count = names.length;
		var loadedcount = 0;
		function loadCallback() {
			loadedcount++;
			if (loadedcount >= count) {
				callback && callback();
			}
		}
		$.each(names, function(index, name) {
			// 首先判断是否已经加载过
			loadPlugin(name, loadCallback);
		})
	}
	core.date = {};
	core.formatDatetime = function(datetime) {
		var value = datetime || "";
		if (!core.isEmpty(value)) {
			value = value.replace(/-/g, '');
			value = value.replace(/:/g, '');
			value = value.replace(/ /g, '');
			value = value.replace(/\//g, '');
			if (value.length == 4) {
				value = value.substring(0, 2) + ':' + value.substring(2, 4);
			} else if (value.length == 8) {
				value = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
			} else if (value.length >= 12) {
				value = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8) + ' ' + value.substring(8, 10) + ':' + value.substring(10, 12);
			}
		}
		return value;
	}
	core.date.format = function(date, format) {
		format = format || "yyyy-MM-dd hh:mm:ss";
		var o =
		{
			"M+" : date.getMonth() + 1, // month
			"d+" : date.getDate(), // day
			"h+" : date.getHours(), // hour
			"m+" : date.getMinutes(), // minute
			"s+" : date.getSeconds(), // second
			"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
			"S" : date.getMilliseconds()
		// millisecond
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	};
	/**
	 * 加载页面
	 */
	var loadPage = function(config) {
		var action = config.action;
		var callback = config.callback;
		var data = config.data;
		core.showLoading();
		var url = core.getUrl(action);
		if (config.toPage) {
			window.location.href = url;
			return;
		}
		$('.core-box-window').remove();
		$.ajax(
		{
			url : url,
			data : data || {},
			type : 'post',
			dataType : 'html',
			async : true, // 异步请求
			beforeSend : function() {
			},
			success : function(html) {
				core.hideLoading();
				var config_ = config || {};
				var $page = $(html);
				var content = $page.find(core.config.page.frame.content);
				if (content.length == 0) {

				} else {
					html = content.html();
				}

				if (callback != null) {
					if (!validatePage($page, url)) {
						return;
					}
					callback(html);
				} else {
					config_.html = html;
					config_.url = url;
					core.config.event.pageLoadSuccess(config_);

				}
				pageLoadInit();
			},
			complete : function(XMLHttpRequest, textStatus) {
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				core.hideLoading();
				if (XMLHttpRequest.status == 500) {
					if (action.indexOf(core.config.action.error['500']) < 0) {
						window['istoaction'] = true;
						config.action = core.config.action.error['500'];
						loadPage(config);
					}
				} else if (XMLHttpRequest.status == 404) {
					if (action.indexOf(core.config.action.error['404']) < 0) {
						window['istoaction'] = true;
						config.action = core.config.action.error['404'];
						loadPage(config);
					}
				}
			}
		});
	};
	var validatePage = function(html, url) {
		var $page = null;
		try {
			$page = $(html);
		} catch (e) {
			return true;
		}
		var error = 0;
		$page.each(function(index, element) {
			var $element = $(element);
			if ($element.find('#core-is-login-page').length > 0) {
				error = 1;
				return false;
			} else if ($element.find('#core-is-404-page').length > 0) {
				error = 2;
				return false;
			} else if ($element.find('#core-is-500-page').length > 0) {
				error = 3;
				return false;
			} else if ($element.find('#core-is-not-online-page').length > 0) {
				error = 4;
				return false;
			} else if ($element.find('#core-is-no-access-page').length > 0) {
				error = 5;
				return false;
			}
		});
		if (error > 0) {
			var config = {};
			config.toPage = true;
			if (error == 1) {
				config.action = (core.config.action.toLogin);
			} else if (error == 2) {
				config.action = (core.config.action.error['404']);
				core.box.alert(url + " 404 Error!");
				return false;
			} else if (error == 3) {
				config.action = (core.config.action.error['500']);
				core.box.alert(url + " 500 Error!");
				return false;
			} else if (error == 4) {
				config.action = (core.config.action.error.toNotOnline);
			} else if (error == 5) {
				config.action = (core.config.action.error.toNoAccess);
			}
			loadPage(config);
			return false;
		}
		return true;
	};
	core.getPaginationUl = function(model, callback) {
		var currentpage = model.currentpage;
		currentpage = currentpage == null ? 1 : currentpage;
		var totalpages = model.totalpages;
		totalpages = totalpages == null ? 0 : totalpages;
		var totalcount = model.totalcount;
		totalcount = totalcount == null ? 0 : totalcount;
		var pagesize = model.pagesize;
		pagesize = pagesize == null ? 0 : pagesize;
		var uppage = model.uppage;
		uppage = uppage == null ? 0 : uppage;
		var nextpage = model.nextpage;
		nextpage = nextpage == null ? 0 : nextpage;
		var ul = $("<ul class=\"pagination pagination-sm\" ></ul>");
		var li = $("<li ><a href=\"javascript:;\" >|&lt;</a></li>");
		ul.append(li);
		if (currentpage <= 1) {
			li.addClass('disabled');
		}
		if (currentpage > 1) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('pagesize', 1);
			li.find('a').attr('currentpage', 1);
		}
		li = $("<li ><a href=\"javascript:;\" >&lt;</a></li>");
		ul.append(li);
		if (currentpage <= 1) {
			li.addClass('disabled');
		}
		if (currentpage > 1) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('currentpage', uppage);
		}
		if (totalpages > 6) {
			if (currentpage <= 3) {
				var pageIndex = 1;
				for ( var i = 1; i <= 6; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
			}
			if (currentpage > 3 && currentpage < (totalpages - 3)) {
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
				var pageIndex = currentpage - 2;
				for ( var i = 1; i <= 6; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
			}
			if (currentpage >= (totalpages - 3)) {
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
				var pageIndex = totalpages - 5;
				for ( var i = 1; i <= 6; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
			}
		} else {
			if (totalpages <= 6) {
				var pageIndex = 1;
				for ( var i = 1; i <= totalpages; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
			}
		}
		li = $("<li ><a href=\"javascript:;\" >&gt;</a></li>");
		ul.append(li);
		if (currentpage >= totalpages) {
			li.addClass('disabled');
		}
		if (currentpage < totalpages) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('currentpage', nextpage);
		}
		li = $("<li ><a href=\"javascript:;\" >&gt;|</a></li>");
		ul.append(li);
		if (currentpage >= totalpages) {
			li.addClass('disabled');
		}
		if (currentpage < totalpages) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('currentpage', totalpages);
		}
		li = ("<li class=\"disabled\"><a href=\"javascript:;\" >" + currentpage + "/" + totalpages + "</a></li>");
		ul.append(li);
		li = ("<li class=\"disabled\"><a href=\"javascript:;\" >" + pagesize + "条/页</a></li>");
		ul.append(li);
		li = ("<li class=\"disabled\"><a href=\"javascript:;\" >共" + totalcount + "条</a></li>");
		ul.append(li);
		ul.find('.pageSearchBtn').click(function() {
			var currentpage = $(this).attr('currentpage');
			if (callback) {
				callback(currentpage);
			}
		});
		return ul;
	}

	core.bind = {};

	core.getUrl = function(action) {
		if (action == null || action == '') {
			return;
		}
		if (action.indexOf('http') >= 0) {
			return action;
		}

		action = action.replace(/^\/+/g, "/");
		if (action.indexOf('/') == 0) {
			if (basePath.lastIndexOf('/') == basePath.length - 1) {
				action = action.replace(/^\/+/g, "");
			}
		} else {
			if (basePath.lastIndexOf('/') == basePath.length - 1) {
			} else {
				action = "/" + action;
			}
		}
		var url = basePath + action;
		return url;
	};
	core.reload = function() {
		if (core.config.openSinglePage) {
			var action = core.getThisAction();
			var config = {};
			config.action = action;
			loadPage(config);
		} else {
			window.location.reload();
		}
	};
	core.getThisAction = function() {
		var action = '';
		var hash = '' + window.location.hash;
		hash = decodeURIComponent(hash);
		if (hash != '' && hash.length > 7 && hash.indexOf("#action=") == 0) {
			action = hash.replace("#action=", "");
		} else {
			var url = window.location.href;
			var port = window.location.port;
			var hostname = window.location.hostname;
			if (basePath.indexOf('http') >= 0) {
				action = url.split(basePath)[1];
			} else {
				if (port && port != null && port > 0) {
					action = url.split(hostname + ':' + port + basePath)[1];
				} else {
					action = url.split(hostname + basePath)[1];
				}
			}
			if (action == null || action.length < 1 || action == '/') {
				action = core.config.action.toIndex;
			}
		}
		return (action);
	};
	core.getHrefData = function() {
		var data = {};
		var toAction = core.getThisAction();
		if (toAction.indexOf('?') > 0) {
			var toActions = toAction.split('?');
			toAction = toActions[0] + '?1=1';
			var datastr = toActions[1];
			if (datastr.indexOf('&') > 0) {
				var datas = datastr.split('&');
				for ( var i = 0; i < datas.length; i++) {
					if (datas[i].indexOf('=') > 0) {
						var n = datas[i].split('=')[0];
						var v = datas[i].split('=')[1];
						if (data[n] == null) {
							data[n] = v;
						}
					}
				}
			} else {
				if (datastr.indexOf('=') > 0) {
					var n = datastr.split('=')[0];
					var v = datastr.split('=')[1];
					if (data[n] == null) {
						data[n] = v;
					}
				}
			}
		}
		return data;
	};
	core.fullActionData = function(action, data) {
		action = action.replace(/^\/+/g, "/");
		if (data) {
			for ( var n in data) {
				if (action.indexOf('?') < 0) {
					action = action + '?1=1';
				}
				action += '&' + n + '=' + data[n];
			}
		}
		return action;
	};
	core.getRandomNumber = function() {
		var thisid = null;
		core.POST('core/data/getRandomNumber.data', {}, 'json', function(o) {
			thisid = o.data;
		}, false,
		{
			showLoading : false
		});
		return thisid;
	};

	core.POST = function(action, data, type, callback, async, config) {
		config = config || {};
		var showLoading = core.isEmpty(config.showLoading) ? true : config.showLoading;
		if (showLoading) {
			core.showLoading();
		}
		var url = core.getUrl(action);
		var data = data || {};
		var type = type || "json";
		if (typeof (async) == 'undefinde' || async == null) {
			async = true;
		} else {
			if (!core.isBoolean(async)) {
				if (async == 'true') {
					async = true;
				} else {
					async = false;
				}
			}
		}
		var headers = null;
		if (core.isString(data)) {
			headers =
			{
				'Content-Type' : 'application/json'
			};
		}
		$.ajax(
		{
			url : url,
			data : data,
			type : 'post',
			dataType : type,
			async : async,// 异步请求
			headers : headers,
			beforeSend : function() {
			},
			success : function(o) {
				// 可添加完成后处理
				if (showLoading) {
					core.hideLoading();
				}
				var html = o;
				if (!validatePage(html, url)) {
					return;
				}
				if (callback && $.isFunction(callback)) {
					callback(o);
					core.element.init();
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (showLoading) {
					core.hideLoading();
				}
				var status = XMLHttpRequest.status;
				if (!core.isEmpty(status)) {
					if (status >= 500) {
						core.box.alert(url + " " + status + " Error!");
						return;
					}
					if (status >= 400) {
						core.box.alert(url + " " + status + " Error!");
						return;
					}
				}
				if (!validatePage(XMLHttpRequest.responseText, url)) {
					return;
				}
			}
		});
	};
	/** url跳转 */
	core.toUrl = function(action, data) {
		var action = core.fullActionData(action, data);// 组合参数
		var url = core.getUrl(action);
		window.location.href = url;
	};
	/** url跳转 */
	core.openUrl = function(action, data) {
		var action = core.fullActionData(action, data);// 组合参数
		var url = core.getUrl(action);
		window.open(url);
	};

	core.doAction = function(config) {
		var action = config.action;
		var data = config.data;
		var callback = config.callback;
		core.POST(action, data, 'json', function(o) {
			if (callback) {
				callback(o);
			}
		});
	}

	/** get提交 */
	core.toAction = function(config) {
		var action = config.action;
		var data = config.data;
		if ((data && data.$outFile) || action.indexOf('$outFile=true') > 0) {
			data = data || {};
			data.needloadframework = false;
			core.toUrl(action, data);
			return;
		}
		if (action.indexOf('http') != -1) {
			core.toUrl(action, data);
			return;
		} else {

		}
		var toLoginAction = core.config.action['toLogin'];
		if (toLoginAction.indexOf('/') != 0) {
			toLoginAction = "/" + toLoginAction;
		}
		if (action.indexOf('/') != 0) {
			action = "/" + action;
		}
		if (action == toLoginAction) {
			core.toUrl(action, data);
			return;
		}
		action = core.fullActionData(action, data);
		if (action.indexOf(core.config.action.toLogin.replace(/^\//g, "")) < 0) {
			window['istoaction'] = true;
			// document.location.hash = "#action=" + url;
			//
			if (config.callback) {
				loadPage(config);
			} else {
				if (core.isFunction(window.history.pushState) && core.config.openSinglePage) {

					var url = core.getUrl(action);
					var state = {
					// title: "title",
					// url: url,
					// otherkey: othervalue
					};
					window.history.pushState(state, document.title, url);
					executeToThisAction(config);
				} else {
					core.toUrl(action, data);
				}
			}
		} else {
			window['istoaction'] = true;
			loadPage(config);
		}
	};

	core.filterMode = function(arg) {
		if (core.isEmpty(arg)) {
			return arg;
		}
		arg = core.replaceAll(arg, '\<', '&lt;');
		arg = core.replaceAll(arg, '\>', '&gt;');
		arg = core.replaceAll(arg, '\"', '&quot;');
		return arg;
	}
	core.element = {};
	core.element.getForm = function(element) {
		return $(element).closest('form');
	}
	core.element.validate = function(form, element) {
		var data = {};
		data.valid = true;
		var $form = $(form);
		var $element = $(element);
		var name = $element.attr('name');
		data.name = name;
		var pattern = $element.attr('pattern') || false;

		var label = $element.attr('label');
		var re = new RegExp(pattern);
		var $radioGroup = null;
		var $checkboxGroup = null;
		var value = null;
		if ($element.is('[type=checkbox]')) {
			if ($element.data('bootstrapSwitch')) {
				if ($element.val() == 'true' || $element.val() == '1' || $element[0].checked) {
					value = 1;
				} else {
					value = 0;
				}
			} else {

				$checkboxGroup = $form.find('input[name="' + name + '"]');
				$element = $checkboxGroup.first();
				var thisvalue = "";
				$form.find("input[name='" + name + "']:checked").each(function() {
					thisvalue += $(this).val() + ',';
				});
				if (thisvalue.length > 0) {
					thisvalue = thisvalue.substring(0, thisvalue.length - 1);
					value = thisvalue;
				}
				if ($element.attr('isswitch')) {
					if (core.isEmpty(value)) {
						value = 0;
					} else {
						value = 1;
					}
				}
			}
		} else if ($element.is('[type=radio]')) {
			$radioGroup = $form.find('input[name="' + name + '"]');
			$element = $radioGroup.first();
			value = $form.find("input[name='" + name + "']:checked").val();
		} else {
			value = $element.val();
		}
		var filterMode = $element.attr('filterMode');
		if (core.isEmpty(filterMode)) {
			filterMode = false;
		}
		if (core.isString(filterMode)) {
			if (filterMode == 'true' || filterMode == '1') {
				filterMode = true;
			} else {
				filterMode = false;
			}
		}
		if (filterMode) {
			value = core.filterMode(value);
		} else {
		}
		data.value = value;
		var required = ($element.attr('required') !== undefined) && ($element.attr('required') !== 'false') && ($element.attr('required') !== '0');

		var ishidden = $element.is(":hidden");
		var mustvalidate = $element.attr('mustvalidate') != null;
		var isreadonly = $element.attr('readonly') != null;
		var ismailbox = $element.attr('ismailbox') != null;
		var isnumber = $element.attr('isnumber') != null;
		var isphone = $element.attr('isphone') != null;
		var istel = $element.attr('istel') != null;
		var isurl = $element.attr('isurl') != null;
		var isdate = $element.attr('isdate') != null;
		var istime = $element.attr('istime') != null;
		var isdatetime = $element.attr('isdatetime') != null;
		var isinteger = $element.attr('isinteger') != null;
		var isidcard = $element.attr('isidcard') != null;
		var validate = $element.attr('core-validate');
		var minlength = parseInt($element.attr('minlength'), 10);
		var maxlength = parseInt($element.attr('maxlength'), 10);
		var eq = $element.attr('eq');
		var gt = $element.attr('gt');
		var gte = $element.attr('gte');
		var lt = $element.attr('lt');
		var lte = $element.attr('lte');
		var eqTo = $element.data('eqTo');
		var gtTo = $element.attr('gtTo');
		var gteTo = $element.attr('gteTo');
		var ltTo = $element.attr('ltTo');
		var lteTo = $element.attr('lteTo');
		if (eqTo) {
			eq = $(eqTo).val();
		}
		if (gtTo) {
			gt = $(gtTo).val();
		}
		if (gteTo) {
			gte = $(gteTo).val();
		}
		if (ltTo) {
			lt = $(ltTo).val();
		}
		if (lteTo) {
			lte = $(lteTo).val();
		}

		if (eq || gt || gte || lt || lte) {
			var v = core.getNowDate();
			if (isdate) {
				v = core.getNowDate();
			} else if (isdatetime) {
				v = core.getNowDatetime();
			} else if (istime) {
				v = core.getNowTime();
			}
			if (core.has(eq, '$now')) {
				eq = v;
			}
			if (core.has(gt, '$now')) {
				gt = v;
			}
			if (core.has(gte, '$now')) {
				gte = v;
			}
			if (core.has(lt, '$now')) {
				lt = v;
			}
			if (core.has(lte, '$now')) {
				lte = v;
			}
		}
		// 隐藏和不是必须验证的直接返回
		if ((ishidden || isreadonly) && !mustvalidate) {
			data.valid = true;
		} else {
			if (required && core.isEmpty(value)) {
				data.valid = false;
				data.error = core.config.error.isNull;
			} else if (!core.isEmpty(value)) {
				if (pattern && !re.test(value)) {
					data.valid = false;
					data.error = core.config.error.patternMismatch;
				}
				if (value.length > maxlength) {
					data.valid = false;
					data.error = core.config.error.isLong;
				}
				if (value.length < minlength) {
					data.valid = false;
					data.error = core.config.error.isShort;
				}
				if (isurl && !core.isUrl(value)) {
					data.valid = false;
					data.error = core.config.error.isNotUrl;
				}
				if (isphone && !core.isPhone(value)) {
					data.valid = false;
					data.error = core.config.error.isNotPhone;
				}
				if (istel && !core.isTel(value)) {
					data.valid = false;
					data.error = core.config.error.isNotTel;
				}
				if (ismailbox && !core.isMailbox(value)) {
					data.valid = false;
					data.error = core.config.error.isNotMail;
				}
				if (isidcard && !core.isIDCard(value)) {
					data.valid = false;
					data.error = core.config.error.isNotIDCard;
				}
				if (isnumber && !core.isNumber(value)) {
					data.valid = false;
					data.error = core.config.error.isNotNumber;
				}
				if (isinteger && !core.isInteger(value)) {
					data.valid = false;
					data.error = core.config.error.isNotInteger;
				}
				if (isdate && !core.isDate(value)) {
					data.valid = false;
					data.error = core.config.error.isNotDate;
				}
				if (isdatetime && !core.isDatetime(value)) {
					data.valid = false;
					data.error = core.config.error.isNotDatetime;
				}
				if (istime && !core.isTime(value)) {
					data.valid = false;
					data.error = core.config.error.isNotTime;
				}
				var value_ = value;

				var eq_ = eq;
				var gt_ = gt;
				var gte_ = gte;
				var lt_ = lt;
				var lte_ = lte;
				if (isdate || isdatetime || istime) {
					value_ = value.replace(/\D/g, "");
					if (eq_) {
						eq_ = eq_.replace(/\D/g, "");
					}
					if (gt_) {
						gt_ = gt_.replace(/\D/g, "");
					}
					if (gte_) {
						gte_ = gte_.replace(/\D/g, "");
					}
					if (lt_) {
						lt_ = lt_.replace(/\D/g, "");
					}
					if (lte_) {
						lte_ = lte_.replace(/\D/g, "");
					}
				}
				if (eq_ && value_ != eq_) {
					data.valid = false;
					data.error = core.config.error.notEq;
				}
				if (gt_ && Number(value_) <= Number(gt_)) {
					data.valid = false;
					data.error = core.config.error.notGt;
				}
				if (gte_ && Number(value_) < Number(gte_)) {
					data.valid = false;
					data.error = core.config.error.notGte;
				}
				if (lt_ && Number(value_) >= Number(lt_)) {
					data.valid = false;
					data.error = core.config.error.notLt;
				}
				if (lte_ && Number(value_) > Number(lte_)) {
					data.valid = false;
					data.error = core.config.error.notLte;
				}
			}
		}

		if (validate) {
			validate = eval('(' + validate + ')');
			validate(data, $element, $form);
		}

		if (data.error) {
			var error = jQuery.extend(true, {}, {}, data.error);
			var show = error.show;
			show = show.replace(/\$label/g, label).replace(/\$minlength/g, minlength).replace(/\$maxlength/g, maxlength).replace(/\$eq/g, eq).replace(/\$gte/g, gte).replace(/\$gt/g, gt).replace(/\$lte/g, lte).replace(/\$lt/g, lt);

			error.show = show;
			data.error = error;
		}

		return data;
	};
	core.localData =
	{
		hname : location.hostname ? location.hostname : 'localStatus',
		isLocalStorage : window.localStorage ? true : false,
		dataDom : null,

		initDom : function() { // 初始化userData
			if (!this.dataDom) {
				try {
					this.dataDom = document.createElement('input');// 这里使用hidden的input元素
					this.dataDom.type = 'hidden';
					this.dataDom.style.display = "none";
					this.dataDom.addBehavior('#default#userData');// 这是userData的语法
					document.body.appendChild(this.dataDom);
					var exDate = new Date();
					exDate = exDate.getDate() + 30;
					this.dataDom.expires = exDate.toUTCString();// 设定过期时间
				} catch (ex) {
					return false;
				}
			}
			return true;
		},
		set : function(key, value) {
			key = basePath + key;
			if (this.isLocalStorage) {
				window.localStorage.setItem(key, value);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					this.dataDom.setAttribute(key, value);
					this.dataDom.save(this.hname)
				}
			}
		},
		get : function(key) {
			key = basePath + key;
			if (this.isLocalStorage) {
				return window.localStorage.getItem(key);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					return this.dataDom.getAttribute(key);
				}
			}
		},
		remove : function(key) {
			key = basePath + key;
			if (this.isLocalStorage) {
				localStorage.removeItem(key);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					this.dataDom.removeAttribute(key);
					this.dataDom.save(this.hname)
				}
			}
		}
	}
	core.form = {};

	core.form.clear = function(form) {
		var form = $(form);
		var parameters = form.find('.elementparameter,.parameter');
		$(parameters).each(function(index, parameter) {
			parameter = $(parameter);
			if (parameter.attr('not-clear')) {
				return;
			}
			var name = parameter.attr('name');
			var value = parameter.attr('defaultvalue');
			var eles = form.find('[name=' + name + ']');
			if (eles.size() > 0 && eles.get(0).type == 'radio') {
				if (value == true) {
					value = '1';
				}
				if (value == null || value == '' || value == false) {
					value = '0';
				}
				for ( var m = 0; m < eles.length; m++) {
					if (eles[m].value == value) {
						eles[m].checked = 'checked';
					}
				}
			} else {
				if (parameter.data('bootstrapSwitch')) {
					var v = false;
					if (core.isBoolean(value)) {
						v = value;
					} else {
						if (core.isEmpty(value) || value == '0') {
							v = false;
						} else {
							v = true;
						}
					}
					parameter.get(0).checked = v;
					parameter.change();
				} else {
					form.find('[name=' + name + ']').val(value).change();
				}
			}
		});
	};
	core.form.full = function(form, data) {
		data = data || {};
		form = $(form);
		var modelName = form.attr('model-name');
		modelName = modelName || '';

		var elements = form.find('[name].parameter');
		for ( var name in data) {
			var $addModelButton = form.find('[add-model-button="' + name + '"]:first');
			if ($addModelButton.length > 0) {
				var value = data[name];
				if (value != null) {
					var object = value;
					if (core.isString(value)) {
						if (core.isEmpty(value)) {
							continue;
						}
						object = JSON.parse(value);
					}
					var list = [ object ];
					if (core.isArray(object)) {
						list = object;
					}
					$(object).each(function(index, one) {
						$addModelButton.click();
						var $form_ = form.find('[model-name="' + name + '"]').get(index);
						$form_ = $($form_);
						core.form.full($form_, one);
					});

				}
			}

		}
		$(elements).each(function(index, element) {

			element = $(element);
			if (element.closest('[model-name]').length > 0 && element.closest('[model-name]').attr('model-name') != modelName) {
				return;
			}
			var name = element.attr('name');
			var needchange = false;
			var relationelements = form.find('[relationname=' + name + ']');
			if (relationelements.length > 0) {
				needchange = true;
			}
			if (element.attr('need-full-change') == 'true') {
				needchange = true;
			}
			var value = data[name];
			if (element.get(0).type == 'radio') {
				if (value != null) {
					if (typeof (value) == 'boolean') {
						if (value) {
							value = 1;
						} else {
							value = 0;
						}
					}
					var radios = form.find('[name=' + name + ']');
					$(radios).each(function(radioindex, radio) {

						if ($(radio).closest('[model-name]').length > 0 && $(radio).closest('[model-name]').attr('model-name') != modelName) {
							return;
						}
						if (radio.value == value) {
							radio.checked = 'checked';
						} else {
							$(radio).removeAttr('checked');
						}
					})
				}
			} else if (element.get(0).type == 'checkbox') {
				var elements = form.find('[name=' + name + ']');
				$(elements).removeAttr('checked');
				if (value != null) {
					if (element.data('bootstrapSwitch') || element.attr('isswitch')) {
						var v = false;
						if (core.isBoolean(value)) {
							v = value;
						} else {
							if (core.isEmpty(value) || value == '0') {
								v = false;
							} else {
								v = true;
							}
						}
						element.get(0).checked = v;
						element.change();
					} else {
						var values = [];
						if (!core.isEmpty(value)) {
							if (core.isBoolean(value)) {
								values = [ value ];
							} else {
								values = value.split(',');
							}
						}
						$(elements).each(function(index, element) {

							if ($(element).closest('[model-name]').length > 0 && $(element).closest('[model-name]').attr('model-name') != modelName) {
								return;
							}
							var has = false;
							$(values).each(function(index, v) {
								if (core.isEmpty(v)) {
									return;
								}
								if (element.value == v) {
									has = true;
								}
							});
							if (has) {
								element.checked = 'checked';
							} else {
								$(element).removeAttr('checked');
							}
						});
					}

				}
			} else {
				if (value != null) {
					element.val(value);
					if (needchange) {
						element.change();
					}
				} else {
					if (typeof (value) != 'undefined') {
						if (element.get(0).type != 'radio') {
							element.val('');
							if (needchange) {
								element.change();
							}
						}
					}
				}
			}
		});
	}

	function validateFormData(form, showerror) {
		if (core.isEmpty(showerror)) {
			showerror = true;
		}
		form = $(form);
		var data = {};
		var parameters = form.find('.elementparameter,.parameter').removeClass('core-validate-error');
		for ( var i = 0; i < parameters.length; i++) {
			var element = $(parameters[i]);
			if (element.data('not-get-date')) {
				continue;
			}
			var result = core.element.validate(form, element);
			if (!result.valid) {
				// 验证表单错误显示错误信息
				var code = result.error.code;
				var message = result.error.show;

				(element).addClass('core-validate-error');

				var ishidden = element.is(":hidden");
				if (ishidden) {
					if (!core.isVisible(element.parent())) {
						$("body").animate(
						{
							scrollTop : element.parent().offset().top - 100
						}, 200);
					}
				} else {
					if (!core.isVisible(element)) {
						$("body").animate(
						{
							scrollTop : element.offset().top - 100
						}, 200);
					}
				}
				if (showerror) {
					if (core.isPC()) {
						core.box.info(message);
					} else {
						core.box.info(message);
					}
				}
				// 处理验证错误的字符串
				throw core.error(code, message, element);
			} else {
				$(element).removeClass('core-validate-error');
				data[result.name] = result.value;
			}
		}
		return data;
	}
	/**
	 * 验证表单
	 * 
	 * @param form
	 * @returns {Boolean} 验证失败会抛出异常 可以使用e.message e.description
	 */
	core.form.validate = function(form, showerror) {
		if (core.isEmpty(showerror)) {
			showerror = true;
		}
		form = $(form);

		form.find('.elementparameter,.parameter').data('not-get-date', false);
		var models = form.find('[model-name]');
		models.find('.elementparameter,.parameter').data('not-get-date', true);
		var data = validateFormData(form, showerror);
		var models = form.find('[model-name]');
		var modelMap = {};
		$(models).each(function(index, model) {
			model = $(model);
			var modelName = model.attr('model-name');
			modelMap[modelName] = modelName;
		});

		var m = {};
		for ( var modelName in modelMap) {
			var modelForms = form.find('[model-name="' + modelName + '"]');
			var hasParentModel = false;
			for ( var modelName_ in modelMap) {
				if (modelName_ != modelName) {
					var fs = modelForms.closest('[model-name="' + modelName_ + '"]');
					if (fs.length > 0) {
						hasParentModel = true;
					}
				}
			}
			if (!hasParentModel) {
				m[modelName] = modelName;
			}
		}
		for ( var modelName in m) {
			var modelForms = form.find('[model-name="' + modelName + '"]');

			var modelDatas = [];
			var datatype = "ONE";
			var setname = "";
			$(modelForms).each(function(index, modelForm) {
				modelForm = $(modelForm);
				datatype = modelForm.attr('core-data-type') || 'ONE';
				setname = modelForm.attr('model-set-name') || '';
				var modelData = core.form.validate(modelForm, showerror);
				modelDatas[modelDatas.length] = modelData;
			});
			if (datatype == 'ONE') {
				// data['model_' + modelName] = modelDatas[0];
				if (core.isEmpty(setname)) {
					var modelData = modelDatas[0];
					for ( var n in modelData) {
						data[n] = modelData[n];
					}
				} else {
					data[setname] = JSON.stringify(modelDatas[0]);
				}
			} else {

				var coreChildForm = form.find('[model-name="' + modelName + '"]').closest('.core-child-form');
				var deleteDatas = coreChildForm.data('delete-datas');
				if (core.isEmpty(setname)) {
					setname = modelName + '_datas';
				}
				// data['model_' + modelName] = modelDatas;
				data[setname] = JSON.stringify(modelDatas);
				if (deleteDatas && deleteDatas.length > 0) {
					data[modelName + '_for_delete_jsonarray'] = JSON.stringify(deleteDatas);
				}
			}
		}

		return data;
	}

	core.button = {};
	var getButtonConfig = function(button) {
		var config = {};
		button = $(button);
		var successalert = button.attr('successalert');
		var erroralert = button.attr('erroralert');
		var successtodo = button.attr('successtodo');
		var confirm = button.attr('confirm');
		var toAction = button.attr('toAction');
		var showtype = button.attr('showtype');
		var before = button.attr('before');
		var after = button.attr('after');
		if (before) {
			before = eval('(' + before + ')');
			config.before = before;
		}
		if (after) {
			after = eval('(' + after + ')');
			config.after = after;
		}
		var data = core.button.getData(button);
		if (!data) {
			return false;
		}
		config.data = data;
		if (!core.isEmpty(confirm)) {
			config.confirm = confirm;
		}
		if (!core.isEmpty(successalert)) {
			config.successalert = successalert;
		}
		if (!core.isEmpty(erroralert)) {
			config.erroralert = erroralert;
		}
		if (!core.isEmpty(successtodo)) {
			config.successtodo = successtodo;
		}
		if (!core.isEmpty(toAction)) {
			config.toAction = toAction;
		}
		if (!core.isEmpty(showtype)) {
			config.showtype = showtype;
		}

		return config;
	};
	var buttonExecuteBefore = function(config) {
		if (!config) {
			return false;
		}
		if (config.before && !config.before(config)) {
			return false;
		}
		return true;
	};
	var buttonExecuteAfter = function(config) {
		if (config.after) {
			config.after(config);
		} else {
			var successtodo = config.successtodo;

			var errcode = eval('(' + "function(){return config.result." + core.config.post.errcode + ";}" + ')')();
			var errmsg = eval('(' + "function(){return config.result." + core.config.post.errmsg + ";}" + ')')();

			if (config.result && errcode == core.config.post.successcode) {
				if (!core.isEmpty(config.successalert)) {
					core.box.alert(config.successalert);
				}
				if (!core.isEmpty(successtodo)) {
					// 刷新
					if (successtodo == '1') {
						core.reload();
					}
					// 回退
					else if (successtodo == '2') {
						window.history.back();
					}
					// 整个页面刷新
					else if (successtodo == '3') {
						window.location.reload();
					}
				}
			} else {
				if (!core.isEmpty(config.erroralert)) {
					core.box.alert(config.erroralert);
				} else if (!core.isEmpty(errmsg)) {
					core.box.alert(errmsg);
				}
			}
		}
	};
	core.button.getData = function(button) {
		button = $(button);
		var data = {};
		if (button.length > 0) {
			var forms = [];
			var form = button.attr('form');
			if (!core.isEmpty(form)) {
				if (form.indexOf('p:') == 0) {
					form = button.closest(form.replace('p:', ''));
				} else if (form == 'this') {
					form = button.closest('form');
				} else {
					form = $(form);
				}
				if (form != null && form.size() > 0) {
					forms[forms.length] = form;
				}
			}
			for ( var i = 0; i < forms.length; i++) {
				var form = $(forms[i]);
				try {
					var formdatas = core.form.validate(form);
					for ( var name in formdatas) {
						var value = formdatas[name];
						if (value != null && data[name] == null) {
							data[name] = value;
						}
					}
				} catch (e) {
					return false;
				}
			}
			;
		}
		return data;
	};
	core.button.toAction = function(button) {
		button = $(button);
		var config = getButtonConfig(button);
		if (!buttonExecuteBefore(config)) {
			return false;
		}
		var config_ = config;
		function execute() {
			var toAction = config_.toAction;
			var data = config_.data;
			if (toAction != null && toAction != '') {
				var config =
				{
					action : toAction,
					data : data,
					showtype : config_.showtype
				};
				core.toAction(config);
			}
		}
		if (config.confirm) {
			core.box.confirm(config.confirm, function() {
				execute();
			});
		} else {
			execute();
		}
	};
	core.button.doAction = function(button) {
		button = $(button);
		var config = getButtonConfig(button);
		if (!buttonExecuteBefore(config)) {
			return false;
		}
		var config_ = config;

		function execute() {
			var toAction = config_.toAction;
			var data = config_.data;
			if (toAction != null && toAction != '') {
				core.POST(toAction, data, 'json', function(result) {
					config_.result = result;
					buttonExecuteAfter(config_);
				});
			}
		}
		if (config.confirm) {
			core.box.confirm(config.confirm, function() {
				execute();
			});
		} else {
			execute();
		}
	};

	core.getWidth = function(arg1) {
		arg1 = arg1 || window;
		return $(arg1).width();
	}
	core.getHeight = function(arg1) {
		arg1 = arg1 || window;
		return $(arg1).height();
	}
	core.button.reload = function(button) {
		core.reload();
	}
	core.button.back = function(button) {
		button = $(button);
		if (button.closest('.page-window').length > 0) {
			button.closest('.page-window').hide();
		} else {
			window.history.back();
		}
	}
	core.button.upload = function(button) {
		button = $(button);
		var input = $(button.attr("input"));
		var image = $(button.attr("image"));
		core.bind.upload(
		{
			button : button,
			callback : function(files) {

				var path = files[files.length - 1].path;
				var url = files[files.length - 1].url;
				if (input && input.length > 0) {
					input.val(path);
					input.change();
				}
				if (image && image.length > 0) {
					if (image[0].tagName == 'IMG') {
						image[0].src = url;
					} else {
						$(image).css('background-image', 'url("' + url + '")');
					}
				}
			}
		})
	}
	core.button.help = function(button) {
		button = $(button);
		console.log('帮助按钮')
	}

	var thisAction = core.getThisAction();
	var executeToThisAction = function() {
		var action = action || core.getThisAction();
		thisAction = action;
		var config = {};
		config.action = action;
		loadPage(config);
	};

	var loadResource = function() {
		if (core.isEmpty(core.config.resourcePath)) {
			return;
		}
		window.setTimeout(function() {
			core.showLoading();
		}, 1);
		var action = core.config.resourcePath;
		var data = {};
		core.POST(action, data, 'json', function(data) {
			var file = data.file;
			var jsfiles = file.js;
			var cssfiles = file.css;
			cssfiles = cssfiles == null ? [] : cssfiles;
			for ( var i = 0; i < cssfiles.length; i++) {
				var cssfile = cssfiles[i];
				var src = cssfile.src;
				if (!src || src == '')
					continue;
				if (src.indexOf('http') != 0)
					src = basePath + src;
				document.write("<link href='" + src + "' rev='stylesheet' media ='screen' rel='stylesheet' type='text/css'>");
			}
			jsfiles = jsfiles == null ? [] : jsfiles;
			for ( var i = 0; i < jsfiles.length; i++) {
				var jsfile = jsfiles[i];
				var src = jsfile.src;
				if (!src || src == '')
					continue;
				if (src.indexOf('http') != 0)
					src = basePath + src;
				document.write("<script type='text/javascript' src='" + src + "'></script>");
			}
			core.hideLoading();
		}, false);
	}
	document.write(core.config.model.style)
	core.initCover = function() {
		if (core.cover == null) {
			core.cover = $(core.config.model.html.cover);
			core.cover.hide();
			core.loading = $(core.config.model.html.loading);
			core.loading.find('.load-icon').attr('src', core.config.images.loading);

			core.loading.hide();
			core.uploading = $(core.config.model.html.uploading);

			core.uploading.hide();

			var $head = $($('head').get(0));

			$head.before(core.cover);
			$head.before(core.loading);
			$head.before(core.uploading);
		}

	}
	core.initConfig = function(config) {
		core.config = jQuery.extend(true, {}, core.config, config);
	};
	core.init = function(config) {
		core.initConfig(config);

		if (core.inited) {
			return;
		}
		core.inited = true;
		core.initCover();
		if (!core.isEmpty(config.pluginsPath)) {
			var pluginsPath = config.pluginsPath;
			for ( var name in core.config.plugins) {
				var data = core.config.plugins[name];
				var css = data.css;
				var js = data.js;
				$(css).each(function(index, path) {
					css[index] = pluginsPath + "/" + path;
				});
				$(js).each(function(index, path) {
					js[index] = pluginsPath + "/" + path;
				});
				if (!core.isEmpty(data.themesPath)) {
					data.themesPath = pluginsPath + "/" + data.themesPath;
				}
			}
		}

		if (!core.isEmpty(config.resourcePath)) {
			// 加载资源
			loadResource();
		}

	};
	var loadCallbacks = [];
	core.addLoadCallback = function(arg1) {
		loadCallbacks[loadCallbacks.length] = arg1;
	};
	var pageLoadInit = function() {
		core.element.init && core.element.init();
		$(loadCallbacks).each(function(index, loadCallback) {
			if (core.isFunction(loadCallback)) {
				loadCallback();
			}
		});

	};
	var page =
	{
		init : function() {
			this.view.init();
			this.button.init();
		},
		view :
		{
			init : function() {
				core.theme.full($('#core-need-full-page').length > 0 && $('#core-need-full-page').closest('.core-box-window').length == 0);
				// onpopstate
				// 监听浏览器地址
				if (core.isObject(window.onpopstate) && core.config.openSinglePage) {
					$(window).on('popstate', function() {
						var action = core.getThisAction();
						if (core.has(action, "#")) {
							action = action.split('#')[0];
						}
						var oldaction = thisAction;
						if (core.has(oldaction, "#")) {
							oldaction = oldaction.split('#')[0];
						}
						if (oldaction == action || action.indexOf('$outFile') > 0) {

						} else {
							executeToThisAction();
						}
					});
				}
				if (core.config.openSinglePage && $(core.config.page.frame.content).children().length == 0) {
					executeToThisAction();
				} else {
					pageLoadInit();
				}
			}
		},
		button :
		{
			init : function() {
				// 跳转页面
				$('html').on('click', '.coreToActionBtn', function() {
					core.button.toAction(this);
				});
				// 提交表单
				$('html').on('click', '.coreDoActionBtn', function() {
					core.button.doAction(this);
				});
				// 重新加载
				$('html').on('click', '.coreReloadBtn', function() {
					core.button.reload(this);
				});
				$('html').on('click', '.coreHelpBtn', function() {
					core.button.help(this);
				});
				$('html').on('click', '.coreBackBtn', function() {
					core.button.back(this);
				});
				$('html').on('click', '.coreToIndexBtn', function() {
					var action = core.config.action.toIndex;
					core.toAction(
					{
						action : action,
						data : {}
					});
				});
				$('html').on('click', '.core-checkbox-group .label', function() {
					var $label = $(this);
					var $input = $label.prev();
					if ($input.length > 0 && $input[0].type == 'checkbox') {
						$input.click();
					}
				});

				$('html').on('click', '.core-radio-group .label', function() {
					var $label = $(this);
					var $input = $label.prev();
					if ($input.length > 0 && $input[0].type == 'radio') {
						$input.click();
					}
				});
			}
		}
	};

	$(function() {
		page.init();
	});

	// TODO append content


/**
 * 表单元素渲染和事件
 */
(function(window, core) {
	var html = '<div class="core-column-12 core-panel" >' + '<div class="core-panel-header bordered">' + '<h3 class="core-panel-title"> </h3>' + '<div class="core-panel-menu">' + '<div class=" core-menu baseMinimizeBtn"> ' + '<i class="fa fa-minus"></i> ' + '</div>	' + '<div class=" core-menu removePanelBtn"> ' + '<i class="fa fa-remove"></i> ' + '</div>' + '</div>' + '</div>' + '' + '<div class="core-panel-body">' + '</div>' + '' + '</div>';

	core.element.initElementPanel = function(content) {
		content = content || $('body');
		// 获取所有需要组合的元素
		var elements = $(content).find('.core-need-init-panel');
		elements.each(function(index, element) {
			if (core.element.isInited(element, 'core-need-init-panel')) {
				return;
			}
			element = $(element);
			var type = element.attr('core-panel-type');
			// 列尺寸
			var columnsize = element.attr('column-size');
			var coreheight = element.attr('core-height');
			var corewidth = element.attr('core-width');

			columnsize = columnsize || 12;
			columnsize = columnsize > 12 ? 12 : columnsize;
			var title = element.attr('core-title');
			var panelClass = element.attr('core-panel-class');
			var panelHeaderClass = element.attr('core-panel-header-class');
			var panelBodyClass = element.attr('core-panel-body-class');
			if (core.isEmpty(type)) {
				type = 1;
			}
			var panel = $(html);
			var content = panel.find('.core-panel-body');
			if (!core.isEmpty(coreheight)) {
				content.css("height", coreheight);
				panel.addClass("fixed-height");
			}
			if (!core.isEmpty(corewidth)) {
				panel.css("width", corewidth);
				panel.addClass("fixed-width");
			}
			panel.find('.core-panel-title').text(title);
			if (type == 1) {
				panel.addClass('core-panel-light core-panel-bd-top');
			} else if (type == 2) {
				panel.addClass('core-panel-light ');
			} else if (type == 3) {
				panel.find('.core-panel-header ').hide();
			} else if (type == 4) {
				panel.addClass('core-panel-light ');
				panel.find('.core-panel-header ').removeClass('bordered');
				panel.find('.core-panel-title').html('&nbsp;');
			}
			panel.addClass('core-column-' + columnsize);
			if (!core.isEmpty(panelClass)) {
				panel.addClass(panelClass);
			}
			if (!core.isEmpty(panelHeaderClass)) {
				panel.find('.core-panel-header ').addClass(panelHeaderClass);
			}
			if (!core.isEmpty(panelBodyClass)) {
				panel.find('.core-panel-body ').addClass(panelBodyClass);
			}
			element.before(panel);
			element.appendTo(content);

		});
	}

	$(function() {
		$('html').on('click', '.core-panel .removePanelBtn', function(e) {
			$(this).closest('.core-panel').remove();
		});
		$('html').on('click', '.coreSetPanelColorBtn', function(e) {
			var $panel = $(this).closest('.core-panel');
			var place = $(this).attr('core-place');
			var color = $(this).attr('core-color');
			place = core.isEmpty(place) ? '' : place;
			var places = place.split(',');
			var hasBody = false;
			$(places).each(function(index, place) {
				var $content = null;
				if (place == 'header') {
					$content = $panel.find('.core-panel-header:first');
				} else if (place == 'body') {
					$content = $panel.find('.core-panel-body:first');
					hasBody = true;
				} else {
					$content = $panel;
				}
				$content.removeClass('core-bg-red core-bg-green core-bg-grey core-bg-blue core-bg-yellow  ');
				$content.addClass(color);
			});
			if (hasBody) {
				$panel.addClass('core-panel-dark').removeClass('core-panel-light');
			}
		});

		$('html').on('click', '.core-panel .baseMinimizeBtn', function(e) {
			var content = $(this).closest('.core-panel').find('.core-panel-body');
			var $panel = $(this).closest('.core-panel');
			if ((content).is(":hidden")) {
				content.slideDown('fast');
			} else {
				content.slideUp('fast');
			}
		});
	});
})(window, core);
/**
 * 表单元素渲染和事件
 */
(function(window, core) {

	core.element.initFile = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-file');
		elements.each(function(index, element) {
			if (core.element.isInited(element, 'inputtype-file')) {
				return;
			}
			element = $(element);
			var design = element.attr('design');
			design = design != null && design == 'true' ? true : false;
			var search = element.attr('search');
			search = search != null && search == 'true' ? true : false;
			var isreadonly = element.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;

			var needfilegroup = element.attr('need-file-group') != null;
			var maxfilelength = element.attr('maxfilelength');
			var filecount = element.attr('file-count');
			filecount = filecount == null || filecount == '' ? 1 : filecount;
			var inputgroup = element.closest('.core-input-group');
			if (needfilegroup) {

			}
			// group.addClass('file-upload-content');
			// var btn = $('<span class="input-group-addon vd_btn vd_black "><i
			// class="fa fa-upload"></i></span>');
			// if(!isreadonly){
			// element.after(btn);
			// }
			element.addClass('core-file-input');
			var filetype = element.attr('core-file-type');
			filetype = filetype == null || filetype == '' ? 'file' : filetype;
			var coreinput = inputgroup.find('.core-input');
			var uploadbtn = $("<span class=\"core-input-addon \"><i class=\"fa fa-upload\"></i></span>");
			if (maxfilelength) {
				uploadbtn.attr('maxfilelength', maxfilelength);
			}
			if (needfilegroup) {
				if (!core.isEmpty(element.attr('file-type'))) {

					uploadbtn.attr('file-type', element.attr('file-type'));
				}
				if (filetype == 'image') {
					var filepaths = {};
					var imagegroup = "<div class=\"core-image-group\">" + "</div>";
					imagegroup = $(imagegroup);
					var uploadimg = "<div class=\"core-image \">" + "	<img src='" + core.config.images.clickupload + "'>" + "</div>";

					uploadimg = $(uploadimg);
					imagegroup.append(uploadimg);
					element.before(imagegroup);
					if (isreadonly) {
						uploadimg.hide();
					}
					uploadimg.attr('file-type', 'image');
					if (maxfilelength) {
						uploadimg.attr('maxfilelength', maxfilelength);
					}
					core.bind.upload(
					{
						button : uploadimg,
						callback : function(files) {
							var path = files[files.length - 1].path;
							var value = element.val();
							if (filecount == 1) {
								value = path;
							} else {
								if (value != null && value != '') {
									value = value + ',' + path;
								} else {
									value = path;
								}
							}
							element.val(value);
							element.change();
						}
					});
					var addImage = function(url) {
						var image = $('<div class="core-image one"><img class="core-need-init-image" /></div>');
						var remove = $('<div class="core-image-remove"></div>');
						if (!isreadonly) {
							image.find('img').before(remove);
						}
						image.find('img').attr('path', url);
						if (url.indexOf('http') == 0) {
						} else {
							url = core.config.server.fileServerUrl + url;
						}
						image.find('img').attr('core-path', url);
						uploadimg.before(image);
						core.element.initImage(image);
						remove.click(function() {
							var thispath = $(this).next('img').attr('path');
							var thisvalue = element.val();
							if (thisvalue != null && thisvalue != '') {
								var urls = thisvalue.split(',');
								thisvalue = '';
								for ( var i = 0; i < urls.length; i++) {
									var url = urls[i];
									if (url != null && url != '' && url != thispath) {
										thisvalue += url + ',';
									}
								}
							}
							if (thisvalue != '' && thisvalue.indexOf(',') > 0) {
								thisvalue = thisvalue.substring(0, thisvalue.length - 1);
							}
							element.val(thisvalue);
							$(this).parent().remove();
							element.change();
						});
						bindUpload(image);
					}
					var bindUpload = function(image) {
						if (isreadonly) {
							return;
						}
						var image = $(image);
						var oldpath = image.find('img').attr('path');
						image.attr('file-type', 'image');
						if (maxfilelength) {
							image.attr('maxfilelength', maxfilelength);
						}
						core.bind.upload(
						{
							button : image,
							callback : function(files) {
								var thispath = files[files.length - 1].path;
								var url = element.val();
								var thisvalue = '';
								if (url != null && url != '') {
									var urls = url.split(',');
									$(urls).each(function(index, url) {
										if (url == oldpath) {
											thisvalue += thispath + ",";
										} else {
											thisvalue += url + ",";
										}
									});
								} else {
									thisvalue = thispath;
								}
								if (thisvalue != '' && thisvalue.indexOf(',') > 0) {
									thisvalue = thisvalue.substring(0, thisvalue.length - 1);
								}
								element.val(thisvalue);
								element.change();
							}
						});
					}
					element.change(function() {
						var url = $(this).val();
						imagegroup.find('.one').remove();
						if (url != null && url != '') {
							var urls = url.split(',');
							var count = 0;
							$(urls).each(function(index, url) {
								if (!core.isEmpty(url)) {
									count++;
									addImage(url);
								}
							});
							if (filecount <= count) {
								uploadimg.hide();
							} else {
								uploadimg.show();
							}
						} else {
							uploadimg.show();
						}
					});

					element.change();
				} else if (filetype == 'file') {
					element.after(uploadbtn);
					core.bind.upload(
					{
						button : uploadbtn,
						callback : function(files) {
							var path = files[files.length - 1].path;
							var value = element.val();
							if (filecount == 1) {
								value = path;
							} else {
								if (value != null && value != '') {
									value = value + ',' + path;
								} else {
									value = path;
								}
							}
							element.val(value);
							element.change();
						}
					});
				} else if (filetype == 'video') {
					element.after(uploadbtn);
					uploadbtn.attr('file-type', 'video');
					core.bind.upload(
					{
						button : uploadbtn,
						callback : function(files) {
							var path = files[files.length - 1].path;
							var value = element.val();
							if (filecount == 1) {
								value = path;
							} else {
								if (value != null && value != '') {
									value = value + ',' + path;
								} else {
									value = path;
								}
							}
							element.val(value);
							element.change();
						}
					});

				} else if (filetype == 'audio') {
					element.after(uploadbtn);
					uploadbtn.attr('file-type', 'audio');
					core.bind.upload(
					{
						button : uploadbtn,
						callback : function(files) {
							var path = files[files.length - 1].path;
							var value = element.val();
							if (filecount == 1) {
								value = path;
							} else {
								if (value != null && value != '') {
									value = value + ',' + path;
								} else {
									value = path;
								}
							}
							element.val(value);
							element.change();
						}
					});

				}
			}

		});

	}

	core.element.initFileUpload = function(content) {
		content = content || $('body');
		var elements = $(content).find('.core-need-init-file-upload').removeClass('core-need-init-file-upload');
		elements.each(function(index, element) {
			element = $(element);
			core.button.upload(element);

		});
	};
	var uploadBindIndex = 0;
	core.bind.upload = function(config) {
		var button = $(config.button);
		var callback = config.callback;
		var url = config.url || core.config.action.doUpload;
		var progressUrl = config.progressUrl || core.config.action.uploadProgress;
		url = core.getUrl(url);
		button.find('.core-button-upload-form-div').remove();
		uploadBindIndex++;
		var maxfilelength = button.attr('maxfilelength');
		var inputid = "core-file-upload-input-" + uploadBindIndex;

		var formDiv = $('<span class="core-button-upload-form-div" style="position: absolute;left: 0px;top: 0px;width: 100%;height: 100%;padding: 0px;margin: 0px;overflow: hidden;"/>');

		button.prepend(formDiv);

		button.css('position', 'relative');
		var filename = "";
		var filetype = button.attr('file-type');
		function refreshUpload() {
			bindFileInput();
		}
		var uploadid = core.getNumber();
		var fileUploaded = false;
		var fileuploadaction = "";
		function bindFileInput() {
			fileUploaded = false;
			uploadid = core.getNumber();
			var action = url;
			if (!core.has(action, "?")) {
				action += "?1=1";
			}
			action += "&uploadid=" + uploadid;
			if (maxfilelength) {
				action += "&maxfilelength=" + maxfilelength;
			}
			fileuploadaction = action;
			var input = $('<input id="' + inputid + '" style="position: absolute;z-index: 1;left: 0px;width: 100%;height: 100%;padding: 0px;margin: 0px;font-size: 100000px;opacity: 0.0;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);cursor: pointer;" class="core-file-upload-input" name="file"  type="file" />');
			if (!core.isIE()) {
				input.css('border', '1000px solid gray');
			}
			formDiv.empty();
			formDiv.append(input);
			input.change(function() {
				var filePath = this.value;
				var fileSize = null;
				if (this.files && this.files.length > 0) {
					var f = this.files[0];
					if (f.size) {
						fileSize = f.size;
					} else if (f.fileSize) {
						fileSize = f.fileSize;
					}
				}
				if (filetype != null && filetype != '') {
					if (filetype == 'image') {
						if (!core.isImage(filePath)) {
							core.box.info(core.config.error.isNotImageFile.info);
							refreshUpload();
							return;
						}
					} else if (filetype == 'audio') {
						if (!core.isAudio(filePath)) {
							core.box.info(core.config.error.isNotAudioFile.info);
							refreshUpload();
							return;
						}
					} else if (filetype == 'video') {
						if (!core.isVideo(filePath)) {
							core.box.info(core.config.error.isNotVideoFile.info);
							refreshUpload();
							return;
						}
					} else {

						var filetypes = filetype.split(',');
						var success = false;
						for ( var m = 0; m < filetypes.length; m++) {
							if (core.isOtherFile(filePath, filetypes[m])) {
								success = true;
								break;
							}
						}
						if (!success) {
							var infoStr = core.config.error.isNotOtherFile.info;
							infoStr = infoStr.replace(/\$filetype/g, filetype)
							core.box.info(infoStr);
							refreshUpload();
							return;
						}
					}
				}
				if (fileSize != null && fileSize > (maxfilelength * 1024 * 1024)) {
					var infoStr = core.config.error.isToLongFile.info;
					infoStr = infoStr.replace(/\$maxfilelength/g, maxfilelength)
					core.box.info(infoStr);
					refreshUpload();
					return;
				}
				core.showUploading('file upload');
				// document.getElementById(formid).submit();
				core.ajaxFileUpload(
				{
					url : fileuploadaction, // 用于文件上传的服务器端请求地址
					secureuri : false, // 一般设置为false
					fileElementId : inputid, // 文件上传控件的id属性 <input
					// type="file" id="file"
					// name="file" /> 注意，这里一定要有name值
					// $("form").serialize(),表单序列化。指把所有元素的ID，NAME 等全部发过去
					dataType : 'json',// 返回值类型 一般设置为json
					complete : function() {// 只要完成即执行，最后执行
					},
					success : function(data, status) // 服务器成功响应处理函数
					{
						if (data.code == 0) {
							var files = data.value;
							if (callback != null) {
								callback(files, data);
							}
						} else {
							if (data.code == core.config.error.isToLongFile.code) {

								var infoStr = core.config.error.isToLongFile.info;
								infoStr = infoStr.replace(/\$maxfilelength/g, maxfilelength)
								core.box.info(infoStr);
							} else {
								core.box.info(data.message);
							}
						}

						if (core.config.openUploadProgress) {
							fileUploaded = true;
						} else {

							core.hideUploading('file upload');
							refreshUpload();
						}
					},
					error : function(data, status, e)// 服务器响应失败处理函数
					{
						core.hideUploading('file upload');
						core.box.info("upload file " + status);
						fileUploaded = true;
					}
				});
				if (core.config.openUploadProgress) {
					uploadProgress();
					core.uploading.find('.core-upload-progress-div').show();
					core.uploading.find('.core-upload-text').css('margin-top', '20px');
				} else {

					core.uploading.find('.core-upload-progress-div').hide();
					core.uploading.find('.core-upload-text').css('margin-top', '0px');
				}

			});
		}
		var uploadProgress = function() {
			var data = {};
			data.uploadid = uploadid;
			core.POST(progressUrl, data, 'json', function(o) {
				core.uploading.find('.core-upload-progress').css('width', (o * 100) + '%');
				if (fileUploaded) {
					refreshUpload();
					core.uploading.find('.core-upload-progress').css('width', '100%');
					core.hideUploading('file upload');
				} else {
					window.setTimeout(function() {
						uploadProgress();
					}, 50);
				}
			}, true,
			{
				showLoading : false
			});
		};
		bindFileInput();

	};
	core.handleError = function(s, xhr, status, e) {
		// If a local callback was specified, fire it
		if (s.error) {
			s.error.call(s.context || s, xhr, status, e);
		}

		// Fire the global callback
		if (s.global) {
			(s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [ xhr, s, e ]);
		}
	};
	core.ajaxFileUpload = function(s) {// 这里s是个json对象，传入一些ajax的参数
		// TODO introduce global settings, allowing the client to modify them
		// for all requests, not only timeout
		s = jQuery.extend(true, {}, jQuery.ajaxSettings, s); // 此时的s对象是由jQuery.ajaxSettings和原s对象扩展后的对象
		var id = new Date().getTime(); // 取当前系统时间，目的是得到一个独一无二的数字
		var form = createUploadForm(id, s.fileElementId, (typeof (s.data) == 'undefined' ? false : s.data)); // 创建动态form
		var io = createUploadIframe(id, s.secureuri); // 创建动态iframe
		var frameId = 'jUploadFrame' + id; // 动态iframe的id
		var formId = 'jUploadForm' + id; // 动态form的id
		// Watch for a new set of requests
		if (s.global && !jQuery.active++) {// 当jQuery开始一个ajax请求时发生
			jQuery.event.trigger("ajaxStart"); // 触发ajaxStart方法
		}
		var requestDone = false; // 请求完成标志
		// Create the request object
		var xml = {};
		if (s.global)
			jQuery.event.trigger("ajaxSend", [ xml, s ]); // 触发ajaxSend方法
		// Wait for a response to come back
		var uploadCallback = function(isTimeout) {// 回调函数
			var io = document.getElementById(frameId); // 得到iframe对象
			try {
				if (io.contentWindow) {// 动态iframe所在窗口对象是否存在
					xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
					xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;
				} else if (io.contentDocument) {// 动态iframe的文档对象是否存在
					xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
					xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
				}
			} catch (e) {
				core.handleError(s, xml, null, e);
			}
			if (xml || isTimeout == "timeout") {// xml变量被赋值或者isTimeout ==
				// "timeout"都表示请求发出，并且有响应
				requestDone = true; // 请求完成
				var status;
				try {
					status = isTimeout != "timeout" ? "success" : "error"; // 如果不是“超时”，表示请求成功
					// Make sure that the request was successful or notmodified
					if (status != "error") { // process the data (runs the
						// xml through httpData
						// regardless of callback)
						var data = uploadHttpData(xml, s.dataType); // 根据传送的type类型，返回json对象，此时返回的data就是后台操作后的返回结果
						// If a local callback was specified, fire it and pass
						// it the data
						if (s.success)
							s.success(data, status); // 执行上传成功的操作
						// Fire the global callback
						if (s.global)
							jQuery.event.trigger("ajaxSuccess", [ xml, s ]);
					} else
						core.handleError(s, xml, status);
				} catch (e) {
					status = "error";
					core.handleError(s, xml, status, e);
				} // The request was completed
				if (s.global)
					jQuery.event.trigger("ajaxComplete", [ xml, s ]); // Handle
				// the
				// global
				// AJAX
				// counter
				if (s.global && !--jQuery.active)
					jQuery.event.trigger("ajaxStop"); // Process result
				if (s.complete)
					s.complete(xml, status);
				jQuery(io).unbind();// 移除iframe的事件处理程序
				setTimeout(function() {// 设置超时时间
					try {
						jQuery(io).remove();// 移除动态iframe
						jQuery(form).remove();// 移除动态form
					} catch (e) {
						core.handleError(s, xml, null, e);
					}
				}, 100)
				xml = null
			}
		} // Timeout checker
		if (s.timeout > 0) {// 超时检测
			setTimeout(function() { // Check to see if the request is still
				// happening
				if (!requestDone)
					uploadCallback("timeout");// 如果请求仍未完成，就发送超时信号
			}, s.timeout);
		}
		try {
			var form = jQuery('#' + formId);
			jQuery(form).attr('action', s.url);// 传入的ajax页面导向url
			jQuery(form).attr('method', 'POST');// 设置提交表单方式
			jQuery(form).attr('target', frameId);// 返回的目标iframe，就是创建的动态iframe
			if (form.encoding) {// 选择编码方式
				jQuery(form).attr('encoding', 'multipart/form-data');
			} else {
				jQuery(form).attr('enctype', 'multipart/form-data');
			}
			jQuery(form).submit();// 提交form表单
		} catch (e) {
			core.handleError(s, xml, null, e);
		}
		jQuery('#' + frameId).load(uploadCallback); // ajax 请求从服务器加载数据，同时传入回调函数
		var result = {};
		result.abort = function() {
		};
		return result;
	};

	var createUploadIframe = function(id, uri) {// id为当前系统时间字符串，uri是外部传入的json对象的一个参数
		// create frame
		var frameId = 'jUploadFrame' + id; // 给iframe添加一个独一无二的id
		var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"'; // 创建iframe元素
		if (window.ActiveXObject) {// 判断浏览器是否支持ActiveX控件
			if (typeof uri == 'boolean') {
				iframeHtml += ' src="' + 'javascript:false' + '"';
			} else if (typeof uri == 'string') {
				iframeHtml += ' src="' + uri + '"';
			}
		}
		iframeHtml += ' />';
		jQuery(iframeHtml).appendTo(document.body); // 将动态iframe追加到body中
		return jQuery('#' + frameId).get(0); // 返回iframe对象
	};
	var createUploadForm = function(id, fileElementId, data) {// id为当前系统时间字符串，fileElementId为页面<input
		// type='file'
		// />的id，data的值需要根据传入json的键来决定
		// create form
		var formId = 'jUploadForm' + id; // 给form添加一个独一无二的id
		var fileId = 'jUploadFile' + id; // 给<input type='file' />添加一个独一无二的id
		var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data" ></form>'); // 创建form元素
		if (data) {// 通常为false
			for ( var i in data) {
				jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form); // 根据data的内容，创建隐藏域，这部分我还不知道是什么时候用到。估计是传入json的时候，如果默认传一些参数的话要用到。
			}
		}
		var oldElement = jQuery('#' + fileElementId); // 得到页面中的<input
		// type='file' />对象
		var newElement = jQuery(oldElement).clone(); // 克隆页面中的<input
		// type='file' />对象
		jQuery(oldElement).attr('id', fileId); // 修改原对象的id
		jQuery(oldElement).before(newElement); // 在原对象前插入克隆对象
		jQuery(oldElement).appendTo(form); // 把原对象插入到动态form的结尾处
		// set attributes
		jQuery(form).css('position', 'absolute'); // 给动态form添加样式，使其浮动起来，
		jQuery(form).css('top', '-1200px');
		jQuery(form).css('left', '-1200px');
		jQuery(form).appendTo('body'); // 把动态form插入到body中
		return form;
	};
	var uploadHttpData = function(r, type) {
		var data = !type;
		data = type == "xml" || data ? r.responseXML : r.responseText; // If
		// the
		// type
		// is
		// "script",
		// eval
		// it in
		// global
		// context
		if (type == "script")
			jQuery.globalEval(data); // Get the JavaScript object, if JSON is
		// used.
		if (type == "json")
			eval("data = " + data); // evaluate scripts within html
		if (type == "html")
			jQuery("<div>").html(data).evalScripts();
		return data;
	};
})(window, core);
/**
 * 基本工具类 常用页面工具 事件 等
 */

(function(window, jQuery) {

	core.message = {};

	var CoreMessage = function(config) {
		this.config = config;
		this.init();
		return this;
	}
	CoreMessage.prototype.init = function() {
		// 标题
		this.title = this.config.title;
		// 内容代码
		this.html = this.config.html;
		// 按钮
		this.buttons = this.config.buttons;
		// 关闭回调
		this.cancelCallback = this.config.cancelCallback;
		// 用户自定义宽高
		this.width = this.config.width;
		this.height = this.config.height;
		this.build();
	};

	core.message.create = function(config) {
		return new CoreMessage(config);
	}
	function addMessage(message) {
		$(".core-message-toggle-number").text(Number($(".core-message-toggle-number").text()) + 1);
		$('.core-message-toggle .icon ').addClass('core-shake');
	}
	return;
	$(function() {
		$('.core-message-toggle').mouseover(function() {
			$(this).find('.icon ').removeClass('core-shake');
		});
		window.setTimeout(function() {
			addMessage({});
		}, 2000);
		window.setTimeout(function() {
			addMessage({});
		}, 5000);
	});
})(window, jQuery);
/**
 * 表单元素渲染和事件
 */
(function(window, core) {
	core.wizard = core.wizard || {};
	var defaultConfig = {};
	defaultConfig.selector = {};
	defaultConfig.selector.pills = ".core-wizard-pills>li";
	defaultConfig.selector.spans = ".core-wizard-spans>.core-wizard-span";
	defaultConfig.selector.prev = ".core-wizard-button-prev";
	defaultConfig.selector.next = ".core-wizard-button-next";
	defaultConfig.selector.finish = ".core-wizard-button-finish";
	defaultConfig.selector.bar = ".core-progress-bar";

	var Wizard = function(config) {
		config = jQuery.extend(true, {}, config, defaultConfig);

		this.$wizard = $(config.wizard);
		this.$next = this.$wizard.find(config.selector.next);
		this.$prev = this.$wizard.find(config.selector.prev);
		this.$finish = this.$wizard.find(config.selector.finish);
		this.$pills = this.$wizard.find(config.selector.pills);
		this.$spans = this.$wizard.find(config.selector.spans);
		this.$bar = this.$wizard.find(config.selector.bar);
		var activeindex = 0;
		this.$pills.each(function(index, $pill) {
			if ($($pill).hasClass('active')) {
				activeindex = index;
			}
		});
		this.bindClick();
		this.beforeChange = function(activeindex, $pills, $spans) {
			if (core.isFunction(config.beforeChange)) {
				var v = config.beforeChange(activeindex, $pills, $spans);
				if (core.isBoolean(v)) {
					return v;
				}
			}
			return true;
		}
		this.afterChange = function(activeindex, $pills, $spans) {

			if (core.isFunction(config.afterChange)) {
				var v = config.afterChange(activeindex, $pills, $spans);
				if (core.isBoolean(v)) {
					return v;
				}
			}
			return true;
		}
		this.onFinish = function() {

			if (core.isFunction(config.onFinish)) {
				config.onFinish();
			}
		}
		this.setActive(activeindex);
		return this;
	}
	Wizard.prototype.setActive = function(activeindex) {
		if (activeindex < 0) {
			return;
		}
		if (activeindex >= this.$pills.length) {
			return;
		}
		if (!this.beforeChange(activeindex, this.$pills, this.$spans)) {
			return;
		}
		this.$pills.each(function(index, $pill) {
			$pill = $($pill);
			if (index <= activeindex) {
				$pill.addClass('active');
			} else {

				$pill.removeClass('active');
			}
		});

		this.$spans.each(function(index, $span) {
			$span = $($span);
			if (index == activeindex) {
				$span.addClass('active');
			} else {
				$span.removeClass('active');
			}
		});
		this.$bar.css('width', (100 * (activeindex + 1) / this.$pills.length) + '%');
		this.activeindex = activeindex;

		this.initButton();
		if (!this.afterChange(activeindex, this.$pills, this.$spans)) {
			return;
		}
	}

	Wizard.prototype.bindClick = function() {
		if (this.binded) {
			return;
		}
		this.binded = true;
		var this_ = this;
		this.$prev.click(function() {
			if ($(this).hasClass('disabled')) {
				return;
			}
			var activeindex = this_.activeindex;
			this_.setActive(activeindex - 1);
		});
		this.$next.click(function() {
			if ($(this).hasClass('disabled')) {
				return;
			}
			var activeindex = this_.activeindex;
			this_.setActive(activeindex + 1);
		});
		this.$finish.click(function() {
			if ($(this).hasClass('disabled')) {
				return;
			}
			this_.onFinish();
		});
	}
	Wizard.prototype.initButton = function() {
		if (this.hasPrev()) {
			this.$prev.removeClass('disabled');
		} else {
			this.$prev.addClass('disabled');
		}
		this.$finish.addClass('disabled');
		if (this.hasNext()) {
			this.$next.removeClass('disabled');
		} else {
			this.$next.addClass('disabled');
			this.$finish.removeClass('disabled');

		}
	}
	Wizard.prototype.hasPrev = function() {
		if (this.activeindex > 0) {
			return true;
		}
		return false;
	}
	Wizard.prototype.hasNext = function() {
		if (this.activeindex < (this.$pills.length - 1)) {
			return true;
		}
		return false;
	}
	core.wizard.init = function(config) {
		return new Wizard(config);
	}

})(window, core);
/**
 * 表单元素渲染和事件
 */
(function(window, core) {

	core.element.initSelect = function(content) {
		content = content || $('body');
		// 下拉框
		var elements = $(content).find('.inputtype-select');
		$(elements).each(function(index, element) {
			if (core.element.isInited(element, 'inputtype-select')) {
				return;
			}
			var element = $(element);
			var isreadonly = element.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
			if (isreadonly) {
				return;
			}
			var design = element.attr('design');
			design = design != null && design == 'true' ? true : false;
			var search = element.attr('search');
			search = search != null && search == 'true' ? true : false;
			var relationname = element.attr('relationname');
			var ischeckbox = element.attr('ischeckbox');
			ischeckbox = ischeckbox != null && ischeckbox == 'true' ? true : false;
			if ((element.attr('need-addon') != null) || (ischeckbox)) {
				var btn = $('<span class="core-input-addon core-input-addon-after core-pointer" ><i class="fa fa-search"></i></span>');
				element.after(btn);
				var showelement = null;
				if (ischeckbox) {
					// 复制
					showelement = element.clone().removeClass('inputtype-select core-need-init-group');
					var options = element.parent().find('select.core-select-option').find('option');
					function initShowText(value) {
						if (value != null && value != '') {
							var values = value.split(',');
							var valuemap = {};
							options.each(function(index, one) {
								one = $(one);
								valuemap[one.attr('value')] = one.text();
							});
							var showvalue = '';
							$(values).each(function(index, one) {
								if (!core.isEmpty(one)) {
									showvalue += valuemap[one] + ",";
								}
							});
							if (showvalue != '' && showvalue.indexOf(',') > 0) {
								showvalue = showvalue.substring(0, showvalue.length - 1);
							}
							showelement.val(showvalue);
						}
					}
					var value = showelement.val();
					initShowText(value);
					showelement.attr('name', showelement.attr('name') + '_text');
					element.after(showelement);
					element.hide();
					showelement.click(function() {
						selectWindowView();
					});
					btn.click(function() {
						selectWindowView();
					});
					element.change(function() {
						initShowText(this.value);
					})
				} else {
					btn.click(function() {
						selectWindowView();
					});
				}
				var options = element.find('option');
				if (ischeckbox) {
					options = element.parent().find('select.core-select-option option');
				}
				var datas = [];
				$(options).each(function(index, option) {
					var text = $(option).text();
					var value = $(option).attr('value');
					var image = $(option).attr('image');
					var parent = $(option).attr('parent');
					var data = {};
					data.text = text;
					data.value = value;
					data.image = image;
					data.parent = parent;
					datas[datas.length] = data;
				});
				var selectWindowView = function() {

					var config = {};
					config.title = "选择" + element.attr('label');
					config.datas = datas;
					if (ischeckbox) {
						var value = element.val();
						if (!core.isEmpty(value)) {
							config.values = value.split(',');
						} else {
							config.values = [];
						}
						config.isradio = false;
					} else {
						config.value = element.val();
					}
					config.callback = function(values, texts) {
						var value = '';
						var text = '';
						for ( var i = 0; i < values.length; i++) {
							value += values[i] + ',';
						}
						for ( var i = 0; i < texts.length; i++) {
							text += texts[i] + ',';
						}
						if (!core.isEmpty(value) && core.has(value, ',')) {
							value = value.substring(0, value.length - 1);
						}
						if (!core.isEmpty(text) && core.has(text, ',')) {
							text = text.substring(0, text.length - 1);
						}
						element.val(value);
						if (showelement) {
							showelement.val(text);
						}
						element.change();
					}
					core.box.selectWindow(config);
				}
			}
			if (!design) {
				// 组合级联菜单
				if (relationname != null) {
					initSelectChild(element);
				}
			}
		});
	}
	core.element.initInputSelect = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-input-select');
		if (elements.length < 1) {
			return;
		}
		core.plugins.load("jquery_autocomplete", function() {

			elements.each(function(index, element) {
				if (core.element.isInited(element, 'inputtype-input-select')) {
					return;
				}
				element = $(element);
				var isreadonly = element.attr('isreadonly');
				isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
				if (isreadonly) {
					return;
				}
				var options = $(element).parent().find('select.core-select-option option');
				var datas = [];
				if (options) {
					var texts = [];
					for ( var i = 0; i < options.length; i++) {
						var option = $(options[i]);
						var text = option.text();
						var value = option.attr('value');
						var image = option.attr('image');
						var data = {};
						data.text = text;
						data.value = value;
						data.image = image;
						datas[datas.length] = data;
					}
					$(element).autocomplete(datas,
					{
						autoFill : false,
						formatItem : function(row, i, max) {
							var html = "";
							if (!core.isEmpty(row.image)) {
								var url = core.getUrl(row.image);
								html = "<img src='" + url + "' />" + row.text;
							} else {
								html = row.text;
							}
							return html;
						},
						formatMatch : function(row, i, max) {
							return row.text;
						},
						formatResult : function(row) {

							if (!core.isEmpty(row.value)) {
								return row.value;
							}
							return row.text;
						}
					});
				}
			});
		});
	}

	function initSelectChild(element) {
		var thiselement = $(element);
		var id = thiselement.attr('id');
		var thisvalue = thiselement.val();
		var relationname = thiselement.attr('relationname');
		var thisoptions = thiselement.find('option');
		var relation = null;
		if (thiselement.closest('.core-form').length < 1) {
			relation = thiselement.closest('form').find('[name="' + relationname + '"]');
		} else {
			relation = thiselement.closest('.core-form').find('[name="' + relationname + '"]');
		}
		var relationvalue = relation.val();
		if (relationvalue == null || relationvalue == '') {
			thiselement.html('<option value="">请选择</option>');
		} else {
			thiselement.html('<option value="">请选择</option>');
			for ( var i = 0; i < thisoptions.length; i++) {
				var option = $(thisoptions[i]);
				if (option.attr('relationvalue') == relationvalue) {
					thiselement.append(option);
				}
			}
			thiselement.val(thisvalue);
		}
		relation.change(function() {
			thisvalue = thiselement.val();
			var relationvalue = $(this).val();
			if (relationvalue == null || relationvalue == '') {
				thiselement.html('<option value="">请选择</option>');
			} else {
				thiselement.html('<option value="">请选择</option>');
				var have = false;
				for ( var i = 0; i < thisoptions.length; i++) {
					var option = $(thisoptions[i]);
					if (option.attr('relationvalue') == relationvalue) {
						thiselement.append(option);
						if (option.attr('value') == thisvalue) {
							have = true;
						}
					}
				}
				if (have) {
					thiselement.val(thisvalue);
				} else {
					if (thisoptions.length > 0) {
						$(thiselement.find('option').get(0)).attr('selected', 'selected');
					}
				}
			}
			thiselement.change();
		});
	}

})(window, core);
$(function() {
	var WebSocket = window.WebSocket;
	if (window.MozWebSocket) {
		if (window.MozWebSocket) {
			// Firefox.
			WebSocket = MozWebSocket;
		}
	}
	function createMessage(data) {
		var message = {};
		message.type = 0;
		if (core.isObject(data)) {
			message.type = 1;
		} else {
		}
		message.data = data;
		return message;
	}
	core.websocket = {};
	var CoreSocket = function(config, callback) {
		this.config = config;
		if (!WebSocket) {
			throw new Error('此浏览器暂不支持WebSocket');
			return null;
		}
		var url = config.url;

		var websocket = new WebSocket(url);
		var onopen = config.onopen;
		var onerror = config.onerror;
		var onclose = config.onclose;
		var onmessage = config.onmessage;
		this.name = config.name;
		var this_ = this;
		websocket.onopen = function() {
			// 连接成功
			if (onopen) {
				onopen();
			}
			if (callback) {
				callback(this_);
			}
		}
		websocket.onerror = function() {
			// 连接失败
			if (onerror) {
				onerror();
			}
		}
		websocket.onclose = function() {
			// 连接断开
			if (onclose) {
				onclose();
			}
		}
		// 消息接收
		websocket.onmessage = function(messageEvent) {
			if (onmessage) {
				onmessage(messageEvent.data, messageEvent);
			}
		}
		this.send = function(message) {
			var messagestr = JSON.stringify(message);
			if (core.isObject(message)) {
				messagestr = JSON.stringify(message);
			}
			websocket.send(messagestr);
		}
	}
	var CoreSocketCatch = {};

	core.websocket.build = function(config, callback) {
		var name = config.name;
		var socket = null;
		if (!core.isEmpty(name)) {
			socket = CoreSocketCatch[name];
		}
		if (socket == null) {
			new CoreSocket(config, function(coreSocket) {
				CoreSocketCatch[name] = coreSocket;
				callback && callback(coreSocket);
			});
		} else {
			callback && callback(socket);
		}

	}
	var coreWebSocket = null;
	var coreWebSocketConfig = {};
	coreWebSocketConfig.name = "CORE_WEB_SOCKET";
	coreWebSocketConfig.onmessage = function(messagestr) {
		var message = JSON.parse(messagestr);
		var model_name = message.model_name;
		var method_name = message.method_name;
		var model = noticeModel[model_name];
		if (model != null) {
			var method = model[method_name];
			if (method != null) {
				method(message.message);
			}
		}
	};
	coreWebSocketConfig.onopen = function() {
		console.log(coreWebSocketConfig.name + "开启");
	};
	coreWebSocketConfig.onclose = function() {
		console.log(coreWebSocketConfig.name + "关闭");
	};
	core.websocket.init = function(callback) {
		if (coreWebSocket == null) {
			coreWebSocketConfig.url = core.webSocketPath + "/"
					+ core.config.action.coreSocket;
			if (!core.has(coreWebSocketConfig.url, "?")) {
				coreWebSocketConfig.url += "?1=1";
			}
			coreWebSocketConfig.url += "&clientid=" + core.clientid;
			core.websocket.build(coreWebSocketConfig, function(coreSocket) {
				coreWebSocket = coreSocket;
				coreWebSocket.sendMessage = function(message, model_name,
						method_name) {
					var model = {};
					model.model_name = model_name;
					model.method_name = method_name;
					model.clientid = core.websocket.clientid;
					model.message = createMessage(message);
					this.send(model);
				}
				callback && callback(coreWebSocket);
			});
		} else {
			callback && callback(coreWebSocket);
		}
	}
	core.websocket.bind = function(config) {
		bind(config);
	}
	var noticeModel = {};

	var bind = function(config) {
		var name = config.name;
		var model = noticeModel[name];
		if (model == null) {
			model = config;
			model.send = function(receive_method, message) {
				coreWebSocket.sendMessage(message, name, receive_method);
			}
			noticeModel[name] = model;

		}

	}

}());/**
 * 表单元素渲染和事件
 */
(function(window, core) {
	core.element.initTablist = function(content) {
		content = content || $('body');
		// 下拉框
		var actives = $(content).find('.core-tab-buttons > li.active');
		$(actives).each(function(index, active) {
			chooseOne($(active));
		});
	};
	function chooseOne($li) {
		var $li = $($li);
		var core_tag = $li.closest('.core-tab');
		var core_tag_spans = core_tag.find('>.core-tab-spans');
		var core_tag_buttons = core_tag.find('>.core-tab-buttons');
		var core_target = core_tag.find($li.attr('core-target'));
		var $lis = core_tag_buttons.find('>li');
		var $spans = core_tag_spans.find('>.core-tab-span');
		if ($li.length == 0 || core_target.length == 0) {
			return;
		}
		$lis.each(function(index, li) {
			if (li == $li[0]) {
				$li.addClass('active');
			} else {
				$(li).removeClass('active');
			}
		});
		$spans.each(function(index, span) {
			if (span == core_target[0]) {
				core_target.addClass('active');
			} else {
				$(span).removeClass('active');
			}
		});
	}
	$(function() {
		$('html').on('click', '.core-tab-buttons>li', function() {
			var $this = $(this);
			chooseOne($this);
		});
	})
})(window, core);
(function(window, jQuery) {

	core.view = {};
	
})(window, jQuery);
/**
 * 表单元素渲染和事件
 */
(function(window, core) {
	var groupModel =
	{
		// 两行显示无提示
		1 :
		{
			html : "<div class='core-input-group core-column-$column-size'>" + "	<label class='core-column-12 core-label text-left'>$label</label>" + "	<div class='core-column-12 core-input'>" + "		<div class='element'></div>" + "	</div>" + "</div>"
		},
		// 两行显示有提示
		2 :
		{
			html : "<div class='core-input-group core-column-$column-size'>" + "	<label class='core-column-12 core-label text-left'>$label</label>" + "	<div class='core-column-12 core-input'>" + "		<div class='element'></div>" + "		<span class='core-help'>$help-info</span>" + "	</div>" + "</div>"
		},
		// 一行显示无提示
		3 :
		{
			html : "<div class='core-input-group core-column-$column-size'>" + "	<label class='core-column-$label-size core-label'>$label</label>" + "	<div class='core-column-$input-size core-input'>" + "		<div class='element'></div>" + "	</div>" + "</div>"
		},
		// 一行显示有提示
		4 :
		{
			html : "<div class='core-input-group core-column-$column-size'>" + "	<label class='core-column-$label-size core-label'>$label</label>" + "	<div class='core-column-$input-size core-input'>" + "		<div class='element'></div>" + "		<span class='core-help'>$help-info</span>" + "	</div>" + "</div>"
		},
		// 三行显示有提示
		5 :
		{
			html : "<div class='core-input-group core-column-$column-size'>" + "	<label class='core-column-12 core-label text-left'>$label</label>" + "	<div class='core-column-12 core-input'>" + "		<div class='element'></div>" + "	</div>" + "	<span class='core-help'>$help-info</span>" + "</div>"
		}
	}

	core.element.initElementGroup = function(content) {
		content = content || $('body');
		// 获取所有需要组合的元素
		var elements = $(content).find('.core-need-init-group');
		elements.each(function(index, element) {
			if (core.element.isInited(element, 'core-need-init-group')) {
				return;
			}
			element = $(element);
			var value = element.attr('value');
			if (core.isEmpty(value)) {
				if (!core.isEmpty(element.val())) {
					value = element.val();
				}
			}
			var display = element.attr('display');
			var addClass = element.attr('addClass');
			display = display == null || display == 'true' || display == '1' ? true : false;
			var isreadonly = element.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
			var cannull = element.attr('cannull');

			cannull = cannull == null || cannull == 'true' || cannull == '1' ? true : false;
			var search = element.attr('search');
			search = search != null && search == 'true' || search == '1' ? true : false;
			var design = element.attr('design');
			design = design != null && design == 'true' || design == '1' ? true : false;

			// 选项
			var coreselectoption = element.next('select.core-select-option');
			// 标签
			var label = element.attr('label');
			label = label || "";
			// 标签长度
			var labelsize = element.attr('label-size');
			labelsize = labelsize || 3;
			labelsize = labelsize > 12 ? 12 : labelsize;

			var beforeaddon = element.attr('before-addon');
			var afteraddon = element.attr('after-addon');
			var inputsize = 12 - labelsize;
			// 提示信息
			var helpinfo = element.attr('help-info');
			helpinfo = helpinfo || label;
			var inputgrouptype = element.attr('input-group-type');
			inputgrouptype = inputgrouptype || element.attr('inputgrouptype');
			inputgrouptype = inputgrouptype || 3;
			// 列尺寸
			var columnsize = element.attr('column-size');
			columnsize = columnsize || element.attr('columnsize');
			columnsize = columnsize || 12;
			columnsize = columnsize > 12 ? 12 : columnsize;
			var html = groupModel[inputgrouptype].html;
			html = html.replace(/\$column-size/, columnsize);
			html = html.replace(/\$label-size/, labelsize);
			html = html.replace(/\$input-size/, inputsize);
			html = html.replace(/\$help-info/, helpinfo);
			html = html.replace(/\$label/, label);
			// 元素组合组
			var coreinputgroup = $(html);
			if (labelsize <= 0) {
				coreinputgroup.find('.core-label').remove();
			}
			if (addClass) {
				coreinputgroup.addClass(addClass);
			}

			if (!display) {
				coreinputgroup.hide();
				coreinputgroup.removeClass('core-column-' + columnsize);
				coreinputgroup.addClass('core-column-3');
				coreinputgroup.addClass('needhidden');
			}
			var elementid = element.attr('elementid');
			if (elementid != null && elementid != '') {
				coreinputgroup.attr('elementid', elementid);
			}
			coreinputgroup.attr('cannull', cannull);
			coreinputgroup.attr('display', display);
			if (core.isEmpty(element.attr('placeholder'))) {
				element.attr('placeholder', helpinfo);
			}
			element.before(coreinputgroup);
			element.data('hideGroup', function() {
				coreinputgroup.hide();
			});
			element.data('showGroup', function() {
				coreinputgroup.show();
			});
			var groupElement = coreinputgroup.find('.element');
			groupElement.before(element);
			groupElement.remove();
			element.before(coreselectoption);

			if (inputgrouptype == 2 || inputgrouptype == 4) {
				element.addClass('width-50');
			}
			if (!core.isEmpty(beforeaddon)) {
				var beforeIcon = $('<span class="core-input-addon core-input-addon-before " ></span>');

				if (beforeaddon.indexOf('icon') != -1) {
					beforeIcon.addClass(beforeaddon);
				} else {
					beforeIcon.append(beforeaddon);
				}
				if (element.attr('before-addon-no-bg')) {
					beforeIcon.addClass('core-no-bg');
				}
				element.before(beforeIcon);
			}
			if (afteraddon) {

				var afterIcon = $('<span class="core-input-addon core-input-addon-after " ></span>');

				if (afteraddon.indexOf('icon') != -1) {
					afterIcon.addClass(afteraddon);
				} else {
					afterIcon.append(afteraddon);
				}
				if (element.attr('after-addon-no-bg')) {
					afterIcon.addClass('core-no-bg');
				}
				element.after(afterIcon);
			}

			var corelabel = coreinputgroup.find('.core-label');
			// 必须的
			var required = false;
			if (element.attr('required') == undefined) {
				if (cannull == null || cannull == 'true' || cannull == '1') {
					required = false;
				} else {
					required = true;
				}
			} else {
				if (element.attr('cannull') == undefined) {
					required = true;
				} else {
					required = !cannull;
				}
			}
			if (required) {
				element.attr('required', required);
			} else {
				element.removeAttr('required');
			}
			if (isreadonly) {
				element.attr('readonly', "readonly");
			} else {
			}
			// 是必填项
			if (required) {
				if (!isreadonly) {
					corelabel.append("<span class=\"core-red\">*</span>");
				} else {
					corelabel.append("<span class=\"core-red\">&nbsp;</span>");
				}
			} else {
				corelabel.append("<span class=\"core-red\">&nbsp;</span>");
			}

			var options = coreselectoption.find('option');
			options.each(function(index, one) {
				one = $(one);
				if (one.text() == null || one.text() == '') {
					one.text(one.attr('text'));
				}
			});
			var inputtype = 'text';
			if (element.get(0).tagName == "textarea") {
				inputtype = "TEXTAREA";
			}
			if (element.hasClass('inputtype-switch')) {
				inputtype = "switch";
			} else if (element.hasClass('inputtype-select')) {
				inputtype = "select";
			} else if (element.hasClass('inputtype-editor')) {
				inputtype = "editor";
			} else if (element.hasClass('inputtype-file')) {
				if (element.attr('filetype') == 'image') {
					inputtype = "image";
				} else {
					inputtype = "file";
				}
			}

			if (inputtype == null || inputtype == '') {

			} else if (inputtype == "text") {

			} else if (inputtype == "switch") {
				if (value != null && (value == 'true' || value == '1')) {
					element.attr('checked', 'checked');
				}
				element.attr('isswitch', true);
				element.attr('data-size', 'mini');
				element.attr('data-wrapper-class', 'yellow');
				element.attr('type', 'checkbox');
			} else if (inputtype == "select") {
				if (element.attr('ischeckbox') && element.attr('ischeckbox') == 'true') {

				} else {
					if(element.find('[value=""]').length == 0){
						element.append("<option value=''>请选择</option>");
					}
					options.each(function(index, one) {
						one = $(one);
						element.append(one);
					});
				}
			} else if (!search && inputtype == "textarea") {
				element.css('height', '160px');
			} else if (inputtype == "editor") {
				element.css('height', '370px');
				element.css('width', '100%');

			} else if (inputtype == "file") {

			}
			if (inputtype != "textarea" && inputtype != "editor") {

				element.val(value);
			}
			if (isreadonly) {
				element.css('background-color', 'white');
				element.attr('disabled', true);
				var showvalue = element.attr('showvalue');
				if (core.isEmpty(showvalue)) {
					if (core.isEmpty(showvalue)) {
						if (!core.isEmpty(value)) {
							showvalue = value;
						}
					}
				}
				if (element.closest('.table-content').length < 1) {
					if ((inputtype == 'text' || inputtype == "image" || inputtype == "images" || inputtype == "file")) {
						// console.log(showvalue)
						// element.val(showvalue);
					} else if (inputtype == 'select') {
						showvalue = showvalue == null || showvalue == '' || showvalue == 'null' ? '空' : showvalue;
						var showInput = $('<input class=" " readonly="readonly" />');
						showInput.css('background-color', 'white')
						showInput.val(showvalue);
						element.before(showInput);
						element.hide();
					} else {
						showvalue = showvalue == null || showvalue == '' || showvalue == 'null' ? '空' : showvalue;
						var showDiv = $('<div class=" " style="height: auto;overflow: hidden;border: 1px solid #ddd;padding: 7px 10px 6px;"></div>');
						showDiv.html(showvalue);
						element.before(showDiv);
						element.hide();
					}
				} else {
					showvalue = showvalue == null || showvalue == '' || showvalue == 'null' ? '空' : showvalue;
					var showDiv = $('<div class=" " style="height: auto;overflow: hidden;border: 1px solid #ddd;padding: 7px 10px 6px;"></div>');
					showDiv.html(showvalue);
					element.before(showDiv);
					element.hide();
				}

			}
		});
	}

})(window, core);
/**
 * 表单元素渲染和事件
 */
(function(window, core) {
	var defaultConfig =
	{
		property :
		{
			id : "id",
			parentid : "parentid",
			text : "text",
			icon : "icon",
			image : "image",
			title : "title"
		},
		topid : null,
		content : null,
		$content : null,
		showWindow : false,
		hasCheckbox : false,
		hasRadio : false,
		hasSearch : false,
		hasLoadChild : false,
		showLevel : true,
		showLevelLine : false,
		checkboxDisabled : false, // 复选框禁用,
		radioDisabled : false, // 单选框禁用
		openSingleLevel : false,
		openHalfCheck : false,
		// 子项全部选中时候 自动选中父级是否需要确认
		findParentCheckNeedConfirm : false,
		// 搜索时候选中父级 当子项不匹配时候 自动选择之前需要确认 如果取消 则父级不能选中
		findMismatchChildNeedConfirm : false,
		size : 15,
		needSortable : false,
		noChildTextIcon : "",
		tablename : '',
		tableid : '',
		openLevel : '',
		buttons : [],
		checkedIds : [],
		checkedDeleteIds : [],
		checkedDeleteDatas : [],
		onClick : function() {

		},
		onLoadChild : function() {

		}
	};
	var TreeDataModel = function(topid, datas, property) {
		this.topid = topid;
		this.datas = datas;
		this.property = property;
		this.init();
		return this;
	}
	TreeDataModel.prototype.init = function() {
		this.initBeans();
		this.initTopBeans();
		this.initChildBeans();
	}
	TreeDataModel.prototype.initBeans = function() {
		var topid = this.topid;
		var hasTopid = !core.isEmpty(topid);
		var datas = this.datas;
		var property = this.property;
		var beans = [];
		var cacheBeans = [];
		var topBean = null;
		var idBeanMap = {};
		var parentidBeansMap = {};
		for ( var i = 0; i < datas.length; i++) {

			var data = datas[i];
			if (data == null) {
				continue;
			}
			var id = data[property.id];

			if (core.isEmpty(id)) {
				continue;
			}
			var parentid = data[property.parentid];
			var bean = {};
			bean.data = data;
			bean.id = id;
			bean.parentid = parentid;
			beans[beans.length] = bean;
			idBeanMap[id] = bean;
			if (!core.isEmpty(parentid) && id != parentid) {
				var parentidBeans = parentidBeansMap[parentid];
				parentidBeans = parentidBeans || [];
				parentidBeans[parentidBeans.length] = bean;
				parentidBeansMap[parentid] = parentidBeans;
			}
			if (hasTopid && id == topid) {
				topBean = bean;
				continue;
			} else {
				cacheBeans[cacheBeans.length] = bean;
			}
		}
		this.topBean = topBean;
		this.beans = beans;
		this.cacheBeans = cacheBeans;
		this.idBeanMap = idBeanMap;
		this.parentidBeansMap = parentidBeansMap;
	}
	TreeDataModel.prototype.initTopBeans = function() {
		var beans = this.beans;
		var cacheBeans = this.cacheBeans;
		var topBean = this.topBean;
		var idBeanMap = this.idBeanMap;
		var parentidBeansMap = this.parentidBeanMap;
		var topBeans = [];
		var cacheBeans_ = [];
		if (topBean != null) {
			for ( var i = 0; i < cacheBeans.length; i++) {
				var bean = cacheBeans[i];
				var id = bean.id;
				var parentid = bean.parentid;
				// 父ID为空 或者父不存在 或者 父编号和编号相同
				if (core.isEmpty(parentid) || idBeanMap[parentid] == null || id == parentid || parentid == topBean.id) {
					topBeans[topBeans.length] = bean;
				} else {
					cacheBeans_[cacheBeans_.length] = bean;
				}
			}
		} else {
			for ( var i = 0; i < cacheBeans.length; i++) {
				var bean = cacheBeans[i];
				var id = bean.id;
				var parentid = bean.parentid;
				if (core.isEmpty(parentid) || idBeanMap[parentid] == null || id == parentid) {
					topBeans[topBeans.length] = bean;
				} else {
					cacheBeans_[cacheBeans_.length] = bean;
				}
			}
		}
		this.topBeans = topBeans;
		this.cacheBeans = cacheBeans_;
	}

	TreeDataModel.prototype.initChildBeans = function() {
		var topBeans = this.topBeans;
		for ( var i = 0; i < topBeans.length; i++) {
			var bean = topBeans[i];
			this.initChildBean(bean);

		}
	}
	TreeDataModel.prototype.initChildBean = function(bean) {
		if (bean == null) {
			return;
		}
		var cacheBeans = this.cacheBeans;
		var parentidBeansMap = this.parentidBeansMap;
		var cacheBeans_ = [];
		var id = bean.id;
		var parentidBeans = parentidBeansMap[id];
		if (parentidBeans != null) {
			bean.childBeans = parentidBeans;
			for ( var i = 0; i < bean.childBeans.length; i++) {
				this.initChildBean(bean.childBeans[i]);
			}
		}

	}
	TreeDataModel.prototype.getData = function(beans) {
		if (core.isArray(beans)) {
			var datas = [];
			for ( var i = 0; i < beans.length; i++) {
				datas[datas.length] = beans[i].data;
			}
			return datas;
		} else {
			return beans.data;
		}
	}
	var Tree = function(config) {
		defaultConfig.radioName = core.getNumber();
		this.config = jQuery.extend(true, {}, defaultConfig, config);
		var config = this.config;
		this.init();
		this.onClick = function($li) {
			if (config.onClick) {
				var data = $li.data('data');
				var hasChild = $li.find('ul').length > 0;
				config.onClick($li, data, hasChild);
			}
		}
		var this_ = this;
		this.onSearch = function(searchText, $content) {
			if (config.onSearch) {
				config.onSearch(searchText, $content);
			} else {
				return this_.searchContent(searchText, $content);
			}
		}
		return this;
	};
	/**
	 * TODO 创建UL
	 */
	function createUl(level) {
		level = level || 1;
		var $ul = $('<ul></ul>');
		$ul.attr('ul-level', level);
		return $ul;
	}
	/**
	 * TODO 创建LI
	 */
	function createLi(data, liConfig, level) {
		var hasCheckbox = liConfig.hasCheckbox;
		var hasRadio = liConfig.hasRadio;
		var radioName = liConfig.radioName;
		var buttons = liConfig.buttons;
		var textName = liConfig.property.text;
		var parentidName = liConfig.property.parentid;
		var idName = liConfig.property.id;
		var iconName = liConfig.property.icon;
		var imageName = liConfig.property.image;
		var titleName = liConfig.property.title;
		var addClass = liConfig.addClass;
		var text = data[textName];
		var id = data[idName];
		var parentid = data[parentidName];
		var image = data[imageName];
		var title = data[titleName];
		var icon = data[iconName];
		if (!core.isBoolean(hasCheckbox)) {
			hasCheckbox = false;
		}
		if (!core.isBoolean(hasRadio)) {
			hasRadio = false;
		}
		if (core.isEmpty(radioName)) {
			radioName = core.getNumber();
		}
		var $li = $('<li></li>');
		if (!core.isEmpty(addClass)) {
			$li.addClass(addClass);
		}
		$li.data('config', liConfig);
		$li.attr('core-recordid', id);
		if (!core.isEmpty(parentid)) {
			$li.attr('core-recordparentid', parentid);
		}
		if (level) {
			$li.attr('li-level', level);
		}
		var $div = $('<div class="core-row"></div>');
		var $icon = $('<i class="fa icon li-icon"></i>');
		$div.append($icon);
		if (hasCheckbox) {
			$li.data('hasCheckbox', true);
			var $checkbox = $('<input type="checkbox"/>');
			$div.append($checkbox);
		}
		if (hasRadio) {
			$li.data('hasRadio', true);
			var $radio = $('<input type="radio" name="' + radioName + '"/>');
			$div.append($radio);
		}
		if (!core.isEmpty(icon)) {
			var $dataicon = $('<i class="fa data-icon ' + icon + '"></i>');
			$div.append($dataicon);
		}
		if (!core.isEmpty(image)) {
			var $dataimage = $('<img class="core-need-init-image data-image"/>');
			$dataimage.attr('core-path', image);
			$div.append($dataimage);
		}
		if (!core.isEmpty(title)) {
			$li.attr('title', title);
		}
		var $text = $('<span class="data-text"></span>');
		$div.append($text);
		var $button_group = $('<span class="tree-button-group"></span>');

		$(buttons).each(function(index, button) {
			if (!core.isEmpty(button.showrule)) {
				var showrule = button.showrule;

				var functionstr = 'function(){return ' + showrule + ';}';
				var one = data;
				var f = eval("(" + functionstr + ")")();
				if (!f) {
					return;
				}
			}
			var html = button.html;
			if (core.isEmpty(html)) {
				html = "<a ></a>";
			}
			var $button = $(html);
			if (!core.isEmpty(button.label)) {
				$button.text(button.label);
			}
			$button.addClass('tree-button ');
			$button.click(function() {
				if (button.onClick) {
					button.onClick(data, $li);
				}
			});
			$button_group.append($button);

		});
		$div.append($button_group);
		$li.append($div);
		if (core.isEmpty(text)) {
			text = " ";
		}
		$text.text(text);
		$li.data('data', data);
		$li.data('checked', false);
		return $li;
	}
	/**
	 * TODO 创建子列表
	 */
	function createChildUl($li, beans, property, liConfig, appendFront) {
		appendFront = appendFront || false;
		if (beans == null || beans.length == 0) {

			$li.addClass('core-tree-has-not-child');
			return null;
		}
		var $ul = $li.find('ul:first');
		var level = $li.attr('li-level');
		level = level || 1;
		level++;
		this.maxLevel = this.maxLevel || level;
		if (level > this.maxLevel) {
			this.maxLevel = level;
		}
		var $firstli = null;
		if ($ul.length < 1) {
			$ul = createUl(level);
			$ul.addClass('core-tree-child');
			$li.append($ul);
		} else {
			$firstli = $ul.find('li:first');
			$firstli = $firstli.length < 1 ? null : $firstli;
		}
		var $lis = [];
		$li.addClass('core-tree-has-child');
		$(beans).each(function(index, bean) {
			var $li = createLi(bean.data, liConfig, level);
			$lis[$lis.length] = $li;
			if (!appendFront) {
				$ul.append($li);
			} else {
				if ($firstli == null) {
					$ul.append($li);
				} else {
					$firstli.before($li);
				}
			}
			createChildUl($li, bean.childBeans, property, liConfig);
		});
		return $lis;
	}
	/**
	 * TODO 创建顶级项
	 */
	function createTopLi($ul, topDatas, liConfig) {
		$(topDatas).each(function(index, data) {
			var $li = createLi(data, liConfig);
			$ul.append($li);
		});

	}

	function search(searchText, $content) {
		$content.find('li').removeClass('tree-search-not-find tree-search-find');
		$content.find('li.core-tree-has-child').addClass('open');
		if (core.isEmpty(searchText)) {
			return;
		}
		var $texts = $content.find('li .data-text');
		$($texts).each(function(index, $text) {
			$text = $($text);
			var $li = $text.closest('li');
			var text = $text.text();
			if (core.has(text, searchText)) {
				$li.addClass('tree-search-find');
			} else {
				$li.addClass('tree-search-not-find');
			}
		});
		var $finds = $content.find('.tree-search-find');
		var datas = [];
		$($finds).each(function(index, $find) {
			$find = $($find);
			displayParentForSearch($find);
			datas[datas.length] = $find.data('data');
		});
		return datas;
	}
	/**
	 * TODO 显示搜索到的子项
	 */
	function displayParentForSearch($li) {
		var $parentli = $li.closest('ul').closest('li');
		if ($parentli.length > 0) {
			$parentli.removeClass('tree-search-not-find');
			displayParentForSearch($parentli);
		}
	}

	/**
	 * TODO 选中一个选项
	 */
	var checkLi = function($li, checked) {
		if (!core.isBoolean(checked)) {
			checked = false;
		}
		$li = $($li);
		if ($li.length > 0) {
			var $input = $li.find('.core-row').find('input[type="checkbox"]:first');
			if ($input.length > 0) {
				$input[0].checked = checked;
			}
			var $input = $li.find('.core-row').find('input[type="radio"]:first');
			if ($input.length > 0) {
				$input[0].checked = checked;
			}
		}
		$li.data('checked', checked);
	};
	/**
	 * TODO 选中父级
	 */
	function checkParent($li) {
		$li = $($li);
		var checked = $li.data(checked);
		var $parentLi = $li.closest('ul').closest('li');
		if ($parentLi.length > 0) {
			//
			checkLi($parentLi, checked);
			checkedParent($parentLi);
		}
	}
	/**
	 * TODO 选中子集
	 */
	function checkAllChild($li) {
		$li = $($li);
		var checked = $li.data('checked');

		var $childLis = $li.find('ul li');
		if ($childLis.length > 0) {
			$childLis.each(function(index, $childLi) {
				$childLi = $($childLi);
				checkLi($childLi, checked);
			});
		}
	}
	function validateForCheckParent($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck) {
		var $ul = $li.closest('ul');
		// 判断当前同级是否全部选中
		var $childlis = $ul.find('>li');
		var allChecked = true;
		var hasChecked = false;
		$childlis.each(function(index, $childli) {
			$childli = $($childli);
			if (!$childli.data('checked')) {
				allChecked = false;
			} else {
				hasChecked = true;
			}
		});
		var $parentLi = $ul.closest('li');

		if ($parentLi.length > 0) {
			if (allChecked) {
				if (!$parentLi.find('[type="checkbox"]:first')[0].checked) {
					if (findParentCheckNeedConfirm) {
						core.box.confirm(core.config.label.confirmChecked + $parentLi.find('.data-text:first').text(), function() {
							checkLi($parentLi, true);
							validateForCheckParent($parentLi, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
						});
					} else {
						checkLi($parentLi, true);
						validateForCheckParent($parentLi, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
					}
				}
			} else {
				if (openHalfCheck && hasChecked) {
					checkLi($parentLi, true);
				} else {
					checkLi($parentLi, false);
				}
				validateForCheckParent($parentLi, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
			}
		}
	}
	/**
	 * 复选框值改变
	 */
	function liCheckboxChange($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck) {
		$li = $($li);
		var $input = $li.find('input[type="checkbox"]:first');
		if ($input.length == 0) {
			return;
		}
		var checked = $input[0].checked;
		checkLi($li, checked);
		if (checked) {
			var searchLis = getSearchFindLis($li);
			if (findMismatchChildNeedConfirm && searchLis.length > 0) {
				core.box.confirm("选中该选项，会自动选中该项下的所有未展示子项", function() {
					checkAllChild($li);
					validateForCheckParent($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
				}, function() {
					checkLi($li, false);
				});

			} else {
				checkAllChild($li);
				validateForCheckParent($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
			}
		} else {
			checkAllChild($li);
			validateForCheckParent($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
		}

	}
	function getSearchFindLis($li) {
		return $li.find('ul li.tree-search-find');
	}
	Tree.prototype.createWindow = function() {
		var this_ = this;
		var windowConfig = {};
		if (this.config && this.config.window) {
			windowConfig = this.config.window;
		}
		windowConfig.html = "<div></div>";
		var buttons = windowConfig.buttons || [];
		if (windowConfig.defineCallback) {
			var button = {};
			button.label = core.config.label.define;
			button.className = "core-box-define core-button";
			button.callback = function() {
				var result = this_.getCheckedDatas();
				var result = windowConfig.defineCallback(result);
				if (!core.isBoolean(result) || result) {
					this_.hide();
				}
			}
			buttons[buttons.length] = button;
		}
		windowConfig.buttons = buttons;
		var boxWindow = core.box.window(windowConfig);
		return boxWindow;
	}

	Tree.prototype.show = function() {

		if (this.config.showWindow) {
			this.window.show();
		}
	};
	Tree.prototype.hide = function() {
		if (this.config.showWindow) {
			this.window.hide();
		}
	};
	Tree.prototype.remove = function() {
		if (this.config.showWindow) {
			this.window.remove();
		}
	};
	Tree.prototype.empty = function() {
		this.$content.empty();
	};
	Tree.prototype.destroy = function() {
		this.empty();
		this.remove();
	};
	Tree.prototype.refresh = function(datas) {
		if (datas) {
			this.config.datas = datas;
		}
		this.init();
	};
	/**
	 * TODO 初始化
	 */
	Tree.prototype.init = function() {
		if (this.$content == null) {
			if (this.config.showWindow) {
				this.window = this.createWindow(this.config);
				this.$content = this.window.$content;
			} else {
				this.$content = $(this.config.content);
			}
		} else {
			this.$content.empty();
		}
		var datas = this.config.datas;
		if (!core.isArray(datas)) {
			return;
		}
		this.dataModel = new TreeDataModel(this.config.topid, datas, this.config.property);
		// this.topData = getTopData(datas, this.config.topid,
		// this.config.property);
		// this.topDatas = getTopDatas(datas, this.topData,
		// this.config.property);
		this.checkedIds = this.config.checkedIds;

		this.build();
		this.initLevel();
		this.initEvent();
	};
	Tree.prototype.searchContent = function(searchText, $content) {
		$content = $content || this.$content;
		$content = $content || this.$tree;
		var datas = search(searchText, $content);
		if (core.isEmpty(searchText)) {
			this.$searchInput.val("");
		} else {
			this.$searchInput.val(searchText);
		}
		this.initEvent($content);
		return datas;
	};
	Tree.prototype.search = function(searchText, $content) {
		$content = $content || this.$tree;
		var datas = this.onSearch(searchText, $content);
		return datas;
	};

	Tree.prototype.initLevel = function() {
		var $content = this.$tree;
		if (core.isEmpty(this.closeLevelInited)) {
			this.closeLevelInited = true;
			var count = this.maxLevel || 1;
			if (!core.isEmpty(this.config.openLevel) && this.config.openLevel > 0) {
				count = this.config.openLevel;
			} else {
				count = 0;
			}

			if (count > 0) {
				for ( var i = 1; i <= count; i++) {
					$content.find('[li-level=' + i + '].core-tree-has-child').addClass('open');
				}
			} else {
				$content.find('li.core-tree-has-child').addClass('open');
			}
			var $li = $content.find('li:first');
			$li.find('.li-icon:first').addClass('fa fa-chevron-down');
			this.initSingleLevel($li);
		}
		if (!this.config.showLevelLine) {
			setLiPadding($content, 0);
		}

	};
	function setLiPadding($ul, level) {
		var $lis = $ul.find('>li');
		$lis.each(function(index, $li) {
			$li = $($li);
			$li.find('.core-row').css('padding-left', level * 25);
			setLiPadding($li.find('ul:first'), level + 1);
		});
	}

	Tree.prototype.initIcon = function($content) {
		$content = $content || this.$tree;

	}
	Tree.prototype.initEvent = function($content) {
		$content = $content || this.$tree;

		var $childuls = $content.find('.core-tree-child');
		var this_ = this;
		var noChildTextIcon = this_.config.noChildTextIcon;
		var $icons = $content.find('.li-icon ');
		$icons.removeClass('fa-leaf fa-chevron-down fa-chevron-right fa-circle-o-notch');
		if (!core.isEmpty(noChildTextIcon)) {
			$icons.removeClass(noChildTextIcon);
		}
		$content.find('.core-tree-has-not-child  ').find('.li-icon:first').addClass(noChildTextIcon);
		$content.find('.core-tree-has-child:not(.open)  ').find('.li-icon:first').addClass('fa fa-chevron-right');
		$content.find('.core-tree-has-child.open ').find(' .li-icon:first').addClass('fa fa-chevron-down');
		$($childuls).each(function(liindex, $childul) {
			$childul = $($childul);
			var $icon = $childul.closest('li').find('.li-icon:first');
			if ($childul.find('>li').length == $childul.find('>li.tree-search-not-find').length) {
				$icon.removeClass('fa-leaf fa-chevron-down fa-chevron-right fa-circle-o-notch');
				if (!core.isEmpty(noChildTextIcon)) {
					$icon.addClass(noChildTextIcon);
				}
			}
		});
		$content.find('li .core-row').unbind('click').on('click', function(e) {
			var $target = $(e.target);
			if ($target.closest('[type="checkbox"]').length > 0 || $target.closest('[type="radio"]').length > 0 || $target.closest('.icon').length > 0 || $target.closest('.tree-button-group').length > 0) {
				if ($target.closest('[type="radio"]').length > 0) {

				}
			} else {
				if ($(this).find('[type="radio"]').length > 0) {
					var $radio = $(this).find('[type="radio"]');
					if ($radio[0].checked) {
						$radio[0].checked = false;
					} else {
						$radio[0].checked = true;
					}
				}
				if ($(this).find('[type="checkbox"]').length > 0) {
					var $checkbox = $(this).find('[type="checkbox"]');
					$checkbox.click();
				}
				this_.onClick($(this).closest('li'));
			}
		});
		$content.find('li input[type="checkbox"]').unbind('change').on('change', function() {
			liCheckboxChange($(this).closest('li'), this_.config.findParentCheckNeedConfirm, this_.config.findMismatchChildNeedConfirm, this_.config.openHalfCheck);
			var checkedDeleteIds = [];
			var checkedDeleteDatas = [];
			$(this_.checkedIds).each(function(index, checkedId) {
				var $li = this_.$tree.find('li[core-recordid="' + checkedId + '"]');
				if ($li.length > 0 && !$li.data('checked')) {
					checkedDeleteIds[checkedDeleteIds.length] = checkedId;
					checkedDeleteDatas[checkedDeleteDatas.length] = $li.data('data');
				}
			});
			this_.checkedDeleteIds = checkedDeleteIds;
			this_.checkedDeleteDatas = checkedDeleteDatas;
		});
		$content.find('li input[type="radio"]').unbind('click').on('click', function() {
			var $input = $(this);
		});

		$content.find('li').find('.fa-circle-o-notch').unbind('click').on('click', function(e) {
		});
		$content.find('.li-icon').unbind('click');
		$content.find('li').find('.fa-chevron-down,.fa-chevron-right').unbind('click').on('click', function(e) {
			var $li = $(this).closest('li');
			this_.opendOrCloseLi($li);
			e.stopPropagation();

		});
		if (this.config.checkboxDisabled) {
			$content.find('[type="checkbox"]').attr('disabled', 'disabled');
		}
		if (this.config.radioDisabled) {
			$content.find('[type="radio"]').attr('disabled', 'disabled');
		}

	}
	Tree.prototype.opendOrCloseLi = function($li) {
		var $icon = $li.find('>.core-row>.fa-chevron-down:first,>.core-row>.fa-chevron-right:first');
		if (!this.config.openSingleLevel) {
			$icon.removeClass('fa-chevron-down fa-chevron-right');
			if ($li.hasClass('open')) {
				$li.removeClass('open');
				$icon.addClass('fa fa-chevron-right');
			} else {
				$li.addClass('open');
				$icon.addClass('fa fa-chevron-down');
			}
		} else {
			$li.addClass('open');

			this.initSingleLevel($li);
		}
	};

	Tree.prototype.opendLi = function($li) {
		if (!$li.attr('core-recordid')) {
			return;
		}
		var $icon = $li.find('>.core-row>.fa-chevron-down:first,>.core-row>.fa-chevron-right:first');
		$icon.removeClass('fa-chevron-down fa-chevron-right');
		$li.addClass('open');
		$icon.addClass('fa fa-chevron-down');
		var $parentli = $li.closest('ul').closest('li');
		if ($parentli.length > 0) {
			this.opendLi($parentli);
		}
	};
	Tree.prototype.closeLi = function($li) {

		var $icon = $li.find('>.core-row>.fa-chevron-down:first,>.core-row>.fa-chevron-right:first');
		$icon.removeClass('fa-chevron-down fa-chevron-right');

		$li.removeClass('open');
		$icon.addClass('fa fa-chevron-right');

	};
	Tree.prototype.initSingleLevel = function($li) {
		// 打开单层
		if (this.config.openSingleLevel) {
			var level = getLiLevel($li);
			$li.closest('ul').find('.core-tree-has-child').css('margin-top', -1);
			$li.closest('ul').find('li.open').removeClass('open');
			$li.addClass('open').css('margin-top', '-1px');
			var $ul = $li.find('ul:first');
			var liHeight = $ul.find('>li:first').height();
			if (this.liHeight == null) {
				this.liHeight = 30;
			}
			$li.closest('ul').find('li').hide();
			$li.show();
			$ul.find('>li').show();
			$li.css('margin-top', -this.liHeight * (1) + (1 - 1));

			this.$onLineTree.empty();
			this.$tree.find('li').removeClass('single-level-select');
			$li.addClass('single-level-select');
			appendOnLineTree(this.$onLineTree, $li);
		}
	};
	function appendOnLineTree($onLineTree, $handleLi, flag) {
		if ($handleLi.length < 1) {
			return;
		}
		var data = $handleLi.data('data');
		var config = $handleLi.data('config');
		var $handleUl = $handleLi.closest('ul');
		config.hasCheckbox = false;
		config.hasRadio = false;
		var $li = createLi(data, config);
		$li.find('.tree-button-group').remove();
		if (flag) {
			$li.addClass('can-point');
			$li.click(function() {
				$handleLi.find('.icon:first').click();
			});
		}
		$onLineTree.prepend($li);

		if (!$handleUl.hasClass('core-tree')) {
			var $icon = $('<i class="right-icon fa fa-angle-right"></i>');
			$li.find('.core-row').append($icon);
			appendOnLineTree($onLineTree, $handleUl.closest('li'), true);
		} else {
			var $lis = $onLineTree.find('>li');
			var width = 0;
			var lastLeft = 0;
			$($lis).each(function(index, $li) {
				$li = $($li);
				width += $li.width();
				if (index == ($lis.length - 1)) {
					lastLeft = width;
				}
			});
			$onLineTree.css('min-width', width + 20);
			var $lastLi = $onLineTree.find('>li:last');

			$onLineTree.parent().scrollLeft(lastLeft);
		}
	}
	function getLiLevel($li, level) {
		level = level || 1;
		var $ul = $li.closest('ul');
		if ($ul.hasClass('core-tree')) {
			return level;
		} else {
			return getLiLevel($ul.closest('li'), level + 1);
		}
	}
	Tree.prototype.build = function() {
		var $ul = createUl();
		this.$content.append($ul);
		$ul.addClass('core-tree');
		if (!this.config.showLevelLine) {
			$ul.addClass('core-tree-no-level-line');
		}
		if (!this.config.showLevel) {
			$ul.addClass('core-tree-no-level');
		}

		if (this.config.hasSearch) {
			var $searchContainer = $('<div class="core-tree-search-container"></div>');
			this.$searchInput = $('<input class="core-tree-search-input" />');
			this.$searchInput.attr('placeholder', core.config.label.searchInputPlaceholder);
			this.$searchButton = $('<a class="core-tree-search-button">' + core.config.label.search + '</a>');
			if (!core.isEmpty(this.config.searchButtonText)) {
				this.$searchButton.text(this.config.searchButtonText);
			} else {
				this.$searchButton.html("<i class='fa fa-search'></i>");
			}
			var $onLineTreeContent = $('<div class="core-on-line-container"></div>');
			$searchContainer.append(this.$searchInput);
			$searchContainer.append(this.$searchButton);
			$ul.before($searchContainer);

			var this_ = this;
			this.$searchButton.click(function() {
				var searchText = this_.$searchInput.val();
				this_.search(searchText, this_.$tree);
			});
			this.$searchInput.on('keydown', function(e) {
				var target, code, tag;
				if (!event) {
					event = window.event;
					target = event.srcElement;
					code = event.keyCode;
				} else {
					target = event.target;
					code = event.keyCode;
				}
				if (code == 13) {
					this_.$searchButton.click();
				}

			});

		}
		if (this.config.openSingleLevel) {
			$ul.addClass('core-tree-open-single-level');
			this.$onLineTree = $('<ul class="core-on-line-tree"></ul>');
			var $onLineTreeContent = $('<div class="core-on-line-container"></div>');
			$onLineTreeContent.append(this.$onLineTree);
			$ul.before($onLineTreeContent);
		}
		this.$tree = $ul;
		var datas = this.config.datas;
		var property = this.config.property;
		var liConfig = {};
		liConfig.hasCheckbox = this.config.hasCheckbox;
		liConfig.hasRadio = this.config.hasRadio;
		liConfig.buttons = this.config.buttons;
		liConfig.radioName = this.config.radioName;
		liConfig.property = this.config.property;
		var dataModel = this.dataModel;
		var topBean = dataModel.topBean;
		if (topBean != null) {
			var $li = createLi(topBean.data, liConfig, 1);
			$ul.append($li);
			createChildUl($li, dataModel.topBeans, property, liConfig, false);
		} else {
			$(dataModel.topBeans).each(function(index, topBean) {
				var $li = createLi(topBean.data, liConfig, 1);
				$ul.append($li);
				createChildUl($li, topBean.childBeans, property, liConfig, false);
			});
		}
		core.element.initImage(this.$tree);
		this.initCheckeds();

	};
	Tree.prototype.initCheckeds = function() {
		var $tree = this.$tree;
		var checkedIds = this.config.checkedIds;
		$(checkedIds).each(function(index, checkedId) {
			var $li = $tree.find('li[core-recordid="' + checkedId + '"]');
			checkLi($li, true);
		});
	};
	// 打开选中的节点
	Tree.prototype.openCheckedNode = function() {
		var $checkboxs = this.$tree.find('input[type="checkbox"]');
		var this_ = this;
		$checkboxs.each(function(index, $checkbox) {
			$checkbox = $($checkbox);
			if ($checkbox[0].checked) {
				var $li = $checkbox.closest('li');
				var $parentli = $li.closest('ul').closest('li');
				if ($parentli.length > 0) {
					this_.opendLi($parentli);
				}
			}
		});
	};
	Tree.prototype.append = function($li, datas, config, appendFront) {
		if (!datas || datas.length < 1) {
			return;
		}
		config = config || this.config;
		var property = config.property || this.config.property;
		var liConfig = {};
		liConfig.hasCheckbox = config.hasCheckbox;
		liConfig.addClass = config.addClass;
		liConfig.hasRadio = config.hasRadio;
		liConfig.buttons = config.buttons || this.config.buttons;
		liConfig.radioName = config.radioName || this.config.radioName;
		liConfig.property = property;

		var dataModel = new TreeDataModel(null, datas, property);

		var $lis = createChildUl($li, dataModel.topBeans, property, liConfig, appendFront);
		this.initLevel();
		this.initEvent();
		core.element.initImage($li);
		this.initSingleLevel($li);
		if ($li.hasClass('open')) {

		} else {
			$li.find('.li-icon:first').click();
		}
		return $lis;
	};

	Tree.prototype.getCheckedDatas = function() {
		var result = {};

		var $lis = this.$tree.find('li');
		var $checkboxs = this.$tree.find('input[type="checkbox"]');
		var datas = [];
		$checkboxs.each(function(index, $checkbox) {
			$checkbox = $($checkbox);
			if ($checkbox[0].checked) {
				var $li = $checkbox.closest('li');
				var data = $li.data('data');
				datas[datas.length] = data;
			}
		});
		var $radios = this.$tree.find('input[type="radio"]');
		var checkedData = {};
		$($radios).each(function(index, $radio) {
			$radio = $($radio);
			if ($radio[0].checked) {
				var $li = $radio.closest('li');
				var name = $radio.attr('name');
				checkedData[name] = $li.data('data');
			}
		});
		result.checkedDeleteIds = this.checkedDeleteIds || [];
		result.checkedDeleteDatas = this.checkedDeleteDatas || [];
		result.checkedDatas = datas;
		result.checkedData = checkedData;
		return result;
	};

	core.tree = function(config) {
		var start = new Date().getTime();
		var t = new Tree(config);
		var end = new Date().getTime();
		console.log('耗时：' + (end - start) + 'ms');
		return t;
	};
})(window, core);
(function() {
	var windowHeight = $(window).height();
	core.theme = core.theme || {};
	core.theme.initSize = function() {
		windowHeight = $(window).height();
		var headerHeight = coreHeaderHeight;
		var bodyPaddingTop = coreHeaderHeight;
		if ($('.core-body').hasClass('core-remove-header') || $('.core-body').hasClass('core-full-page')) {
			headerHeight = 0;
			bodyPaddingTop = 0;
		} else {
			// headerHeight = headerHeight;
			if (core.theme.config.body.offset && core.theme.config.body.offset.height) {
				headerHeight = headerHeight + core.theme.config.body.offset.height;
			}
		}
		if (core.theme.config.openFixedHeader) {
			if (!$('.core-body-header').is(":hidden")) {
				$('.core-body').addClass('core-header-fixed');
				$('.core-body.core-header-fixed').css('padding-top', bodyPaddingTop);
			}
		}
		var footerHeight = 50;
		if ($('.core-body-footer').length > 0 && !$('.core-body-footer').is(':hidden')) {
			footerHeight = $('.core-body-footer').outerHeight();
		} else {
			footerHeight = 0;
		}

		var menu_height = $('.core-body-menu-top').outerHeight() + $('.core-body-menu-center').outerHeight();
		var body_height = windowHeight - headerHeight - footerHeight;
		var min_height = (menu_height > body_height) ? menu_height : body_height;
		$('.core-body  .core-body-wrapper').css('min-height', min_height);
		// body_menu.css('min-height', min_height);
		// body_content.css('min-height', min_height);
		checkBackTop();
	}
	core.theme.config = {};
	core.theme.config.menu = {};
	core.theme.config.body = {};
	core.theme.config.header = {};
	core.theme.config.footer = {};
	core.theme.config.menu.place = "top,body";
	core.theme.config.menu.datas = [];
	core.theme.config.menu.getDataAction = null;
	core.theme.config.menu.width = 225;
	core.theme.config.menu.button = {};
	core.theme.config.menu.button.datas = [];
	core.theme.config.body.width = null;
	core.theme.config.body.button = null;
	core.theme.config.header.width = null;
	core.theme.config.header.button = {};
	core.theme.config.header.button.datas = [];
	core.theme.config.footer.width = null;

	function hasParentMenu(thismenu) {
		var menus = core.theme.config.menu.datas;
		var thismenuid = thismenu.menuid;
		var thisparentid = thismenu.parentid;
		var has = false;
		if (!core.isEmpty(thisparentid)) {
			$(menus).each(function(index, menu) {
				if (menu.menuid != thismenuid) {
					if (menu.menuid == thisparentid) {
						has = true;
						return false;
					}
				}
			});
		}
		return has;
	}
	function getTopMenus() {
		var menus = core.theme.config.menu.datas;
		var topmenus = [];
		$(menus).each(function(index, menu) {
			var parentid = menu.parentid;
			if (!hasParentMenu(menu)) {
				topmenus[topmenus.length] = menu;
			}
		});
		return topmenus;
	}

	function getChildMenus(parentmenu) {
		var menus = core.theme.config.menu.datas;
		var childmenus = [];
		$(menus).each(function(index, menu) {
			var parentid = menu.parentid;
			if (!core.isEmpty(parentid) && parentid == parentmenu.menuid) {
				childmenus[childmenus.length] = menu;
			} else {
			}
		});
		return childmenus;
	}
	var thisaction = null;
	core.theme.initMenu = function() {
		var config = core.theme.config;
		thisaction = "/" + (core.getThisAction());
		thisaction = thisaction.replace(/^\/+/g, "/");

		$(config.menu.datas).each(function(index, menu) {
			if (!core.isEmpty(menu.servletpath) && getChildMenus(menu).length == 0) {
				if (core.getThisAction() == menu.servletpath) {
					setCheckedMenuid(menu.menuid);
				}
			}
		});
		var topmenus = getTopMenus();
		if (hasHeaderMenu()) {
			initHeaderMenu(topmenus);
		} else {
			if (hasBodyMenu()) {
				initBodyMenu(topmenus);
			}
		}
	}

	function getMenuLi(menu) {
		var name = menu.name;
		var $menu = $('<li><a></a></li>');
		if (!core.isEmpty(menu.fonticon)) {
			$menu.find('a').append('<i class="icon fa ' + menu.fonticon + '"></i>');
		}
		if (!core.isEmpty(menu.servletpath) && getChildMenus(menu).length == 0) {
			$menu.find('a').addClass('coreToActionBtn');
			$menu.find('a').attr('toAction', menu.servletpath);
			var checkedmenuid = getCheckedMenuid();
			if (!core.isEmpty(checkedmenuid) && checkedmenuid == menu.menuid) {
				$menu.addClass('active');
			}
		}
		$menu.find('a').append('' + name + '');
		$menu.find('a').data("menu", menu);
		return $menu;
	}
	function initHeaderMenu(menus) {
		var $content = $('.core-header-menu ul:first');
		$content.empty();
		var $firstChildMenu = null;

		$(menus).each(function(index, menu) {
			var $menu = getMenuLi(menu);
			if (hasBodyMenu()) {
				var childmenus = getChildMenus(menu);
				if (childmenus.length > 0) {
					$menu.find('a').click(function() {
						$(menus).each(function(index, menu_) {
							removeCheckedParentMenuid(menu_.menuid);
						});
						setCheckedParentMenuid(menu.menuid);
						initBodyMenu(childmenus);
					});
					if (hasCheckedParentMenuid(menu.menuid)) {
						$firstChildMenu = $menu;
					}
					if ($firstChildMenu == null) {
						$firstChildMenu = $menu;
					}
				}
			} else {
				initChildMenu($menu, menu, 'down');
			}
			$content.append($menu);
		});
		if (hasBodyMenu()) {
			if ($firstChildMenu != null) {
				$firstChildMenu.find('a:first').click();
			}

		}
	}
	function openOrCloseLi($li, animation) {
		var menu = $($li).find('a:first').data('menu');
		if ($li.hasClass('core-open')) {
			removeCheckedParentMenuid(menu.menuid);

			var ul_lis = $li.find('>ul>li');
			$(ul_lis).each(function(index, ul_li) {
				ul_li = $(ul_li);
				if (ul_li.hasClass('core-open')) {
					openOrCloseLi(ul_li, animation);
				}
			});
			$li.find('.arrow:first').removeClass('rotate-90');

			if (animation) {
				$li.find('.core-child-menu:first').slideUp(function() {
					$li.removeClass('core-open');
					core.theme.initSize();
				});
			} else {
				$li.find('.core-child-menu:first').show();
				$li.removeClass('core-open');
				core.theme.initSize();
			}
		} else {
			setCheckedParentMenuid(menu.menuid);
			$li.addClass('core-open');

			// 移除选中的同级菜单
			var ul = $li.closest('ul');
			var ul_lis = ul.find('>li');
			$(ul_lis).each(function(index, ul_li) {
				ul_li = $(ul_li);
				if (ul_li.hasClass('core-open') && ul_li[0] != $li[0]) {
					openOrCloseLi(ul_li, animation);
				}
			});
			$li.find('.arrow:first').addClass('rotate-90');
			if (animation) {
				$li.find('.core-child-menu:first').slideDown(function() {
					core.theme.initSize();
				});
			} else {
				$li.find('.core-child-menu:first').show();
				core.theme.initSize();
			}
		}
	}
	function initBodyMenu(menus) {
		var bodycheckparentmenuid = core.localData.get("core.theme.bodycheckparentmenuid");
		var $content = $('.core-body-menu .core-body-menu-center ul:first');
		$content.empty();
		var $firstChildMenu = null;
		$(menus).each(function(index, menu) {
			var $menu = getMenuLi(menu);
			initChildMenu($menu, menu, 'right');
			$content.append($menu);
			var childmenus = getChildMenus(menu);
			if (childmenus.length > 0) {
			}
		});
		$content.find('li a').click(function() {
			var li = $(this).closest('li');
			if (li.find('>.core-child-menu').length > 0) {
				openOrCloseLi(li, true);
			} else {
				var menu = $(this).data('menu');
				setCheckedMenuid(menu.menuid);
				$content.find('li').removeClass('active');
				li.addClass('active');
			}
		});
		var $lis = $content.find('li');
		$($lis).each(function(index, $li) {
			$li = $($li);
			if ($li.find('>.core-child-menu').length > 0) {
				var menu = $li.find('a:first').data('menu');
				if (hasCheckedParentMenuid(menu.menuid)) {
					openOrCloseLi($li, false);
				}
			}
		});

	}
	function setCheckedMenuid(menuid) {
		core.localData.set("core.theme.checkedmenuid", menuid);
	}
	function getCheckedMenuid() {
		return core.localData.get("core.theme.checkedmenuid");
	}
	function setCheckedParentMenuid(menuid) {
		var menuids = getCheckedParentMenuids();
		menuids = menuids || [];
		menuids[menuids.length] = menuid;
		core.localData.set("core.theme.checkedparentmenuids", JSON.stringify(menuids));
	}
	function removeCheckedParentMenuid(menuid) {
		var menuids = getCheckedParentMenuids();
		menuids = menuids || [];
		var newmenuids = [];
		for ( var i = 0; i < menuids.length; i++) {
			if (menuids[i] != menuid) {
				newmenuids[newmenuids.length] = menuids[i];
			}
		}
		core.localData.set("core.theme.checkedparentmenuids", JSON.stringify(newmenuids));
	}
	function hasCheckedParentMenuid(menuid) {
		var menuids = getCheckedParentMenuids();
		menuids = menuids || [];
		for ( var i = 0; i < menuids.length; i++) {
			if (menuids[i] == menuid) {
				return true;
			}
		}
		return false;
	}
	function getCheckedParentMenuids() {
		var menuidsstr = core.localData.get("core.theme.checkedparentmenuids");
		if (core.isEmpty(menuidsstr)) {
			return [];
		}
		return $.parseJSON(menuidsstr);
	}
	function initChildMenu($parentmenu, parentmenu, arrow_icon) {
		var childmenus = getChildMenus(parentmenu);
		var $content = $('<ul class="core-child-menu"></ul>');
		if (childmenus.length > 0) {
			$parentmenu.find('a').append('<i class="arrow fa fa-caret-' + arrow_icon + '"></i>');
			$content.appendTo($parentmenu);
		}
		$(childmenus).each(function(index, childmenu) {
			var $menu = getMenuLi(childmenu);
			initChildMenu($menu, childmenu, "right");
			$content.append($menu);
		});
	}
	function hasHeaderMenu() {
		var menuplaces = core.theme.config.menu.place.toUpperCase().split(',');
		return (jQuery.inArray("HEADER", menuplaces) >= 0)
	}
	function hasBodyMenu() {
		var menuplaces = core.theme.config.menu.place.toUpperCase().split(',');
		return (jQuery.inArray("BODY", menuplaces) >= 0)
	}
	core.theme.build = function(config) {
		core.theme.config = jQuery.extend(true, {}, core.theme.config, config);
		var menuplaces = core.theme.config.menu.place.toUpperCase().split(',');

		if (!hasBodyMenu()) {
			$('.core-body-menu').css('display', 'none');
			$('.core-body-content-wrapper').css('margin-left', 0);
		} else {
			$('.core-body-menu').css('display', 'block');
			if (!core.isEmpty(core.theme.config.menu.width)) {
				$('.core-body-menu').css('width', core.theme.config.menu.width);
				$('.core-header-left').css('width', core.theme.config.menu.width);
				$('.core-body-content-wrapper').css('margin-left', core.theme.config.menu.width);
			}
		}

		if (core.theme.config.body.offset) {
			if (!core.isEmpty(core.theme.config.body.offset.width)) {
				$('.core-header-wrapper, .core-body-wrapper').css('margin-left', core.theme.config.body.offset.width);
				$('.core-header-wrapper, .core-body-wrapper').css('margin-right', core.theme.config.body.offset.width);
			}

			if (!core.isEmpty(core.theme.config.body.offset.height)) {
				$('.core-body-wrapper').css('margin-top', core.theme.config.body.offset.height);
			}
		}
		if (!core.isEmpty(core.theme.config.body.width)) {
			$('.core-header-wrapper, .core-body-wrapper').css('width', core.theme.config.body.width);

		} else {
			$('.core-header-wrapper, .core-body-wrapper').css('width', "auto");
		}
		if (!core.isEmpty(core.theme.config.body.maxwidth)) {
			$('.core-body').css('max-width', core.theme.config.body.maxwidth);
		}
		if (!core.isEmpty(core.theme.config.body.minwidth)) {
			$('.core-body').css('min-width', core.theme.config.body.minwidth);
		}
		var getDataAction = core.theme.config.menu.getDataAction;
		if (!core.isEmpty(getDataAction)) {
			if (menudatasmap[getDataAction] == null) {
				core.POST(getDataAction, {}, 'json', function(data) {
					var errcode = eval('(' + "function(){return " + core.config.post.errcode + ";}" + ')')();
					var errmsg = eval('(' + "function(){return " + core.config.post.errmsg + ";}" + ')')();
					var result = eval('(' + "function(){return " + core.config.post.result + ";}" + ')')();
					if (data) {
						if (errcode != core.config.post.successcode) {
							core.box.alert(errmsg);
						} else {
							if (result != null) {
								menudatasmap[getDataAction] = result;
								core.theme.build();
							} else {
								core.box.alert("菜单数据获取失败！");
							}
						}
					}
				}, true);
				return;
			} else {
				core.theme.config.menu.datas = menudatasmap[getDataAction];
				core.theme.initMenu();
			}
		} else {
			core.theme.initMenu();
		}

		if (hasBodyMenu()) {
			core.theme.initMenuButton();
		}
		core.theme.initHeaderButton();
	}
	core.theme.initHeaderButton = function() {
		var buttons = core.theme.config.header.button.datas;
		var $ul = $('.core-header-button ul:first');
		if (buttons && buttons.length > 0) {
			$ul.empty();
			$(buttons).each(function(index, button) {
				var $li = $('<li></li>');
				var $a = $('<a><i class="icon fa ' + button.fonticon + '"></i></a>');

				$li.append($a);
				$li.appendTo($ul);
			});
			$('.core-header-button').show();
		} else {
			// $('.core-header-button').hide();
		}
	};
	core.theme.full = function(status) {
		if (status) {
			$('.core-body').addClass('core-full-page');
		} else {
			$('.core-body').removeClass('core-full-page');
		}
	};
	core.theme.initMenuButton = function() {
		var buttons = core.theme.config.menu.button.datas;
		var $ul = $('.core-body-menu-top ul:first');
		$ul.empty();
		if (buttons && buttons.length > 0) {
			$(buttons).each(function(index, button) {
				var $li = $('<li></li>');
				var $a = $('<a><i class="icon fa ' + button.fonticon + '"></i></a>');

				$li.append($a);
				$li.appendTo($ul);
			});
			$('.core-body-menu-top').show();
		} else {
			$('.core-body-menu-top').hide();
		}
	};
	var menudatasmap = {};
	var enabled = false;
	core.theme.init = function(config) {
		core.theme.config = jQuery.extend(true, {}, core.theme.config, config);
		enabled = true;
	}
	var themebuilded = false;
	var needFullPage = false;
	var coreHeaderHeight = 0;
	core.addLoadCallback(function() {
		if (coreHeaderHeight < 1) {
			coreHeaderHeight = $('.core-body-header').outerHeight();
		}
		if (enabled && !themebuilded) {
			themebuilded = true;
			core.theme.build();
		}
		core.theme.initSize();
		var action = core.getThisAction();
		if (action.indexOf('/') != 0) {
			action = "/" + action;
		}
		if ($('.core-body-menu-center [toAction="' + action + '"]').length > 0) {
			$('.core-body-menu-center li.active').removeClass('active');
			$('.core-body-menu-center [toAction="' + action + '"]').closest('li').addClass('active');
		}
	});
	function checkBackTop() {
		if ($(window).scrollTop() > coreHeaderHeight) {
			$('.core-back-top').addClass('visible');
		} else if ($(window).scrollTop() <= 0) {
			$('.core-back-top').removeClass('visible');
		}
	}
	$(function() {

		/* 返回顶部 */
		$('html').on('click', '.core-back-top', function(e) {
			e.preventDefault();
			$('body,html').animate(
			{
				scrollTop : 0
			}, 800);
		});
		$('html').on('click', '[core-action="hide-header"]', function(e) {
			if ($('.core-body').hasClass('core-remove-header')) {
				$('.core-body').removeClass('core-remove-header');

			} else {
				$('.core-body').addClass('core-remove-header');
			}
			core.theme.initSize();
		});
		$('html').on('click', '[core-action="hide-body-menu"]', function(e) {
			if ($('.core-body').hasClass('core-remove-body-menu')) {
				$('.core-body').removeClass('core-remove-body-menu');
				$('.core-body-menu').css('margin-left', 0);
				$(this).removeClass('fa-arrows-h').addClass('');
			} else {
				$('.core-body').addClass('core-remove-body-menu');
				$('.core-body-menu').css('margin-left', -core.theme.config.menu.width);
			}
		});
		$('html').on('click', '[core-action="show-header-body-menu"]', function(e) {
			if ($('.core-body').hasClass('core-remove-body-menu') && $('.core-body').hasClass('core-remove-header')) {
				$('.core-body').removeClass('core-remove-body-menu');
				$('.core-body').removeClass('core-remove-header');
				$('.core-body-menu').css('margin-left', 0);
			} else {
				$('.core-body').addClass('core-remove-header');
				$('.core-body').addClass('core-remove-body-menu');
				$('.core-body-menu').css('margin-left', -core.theme.config.menu.width);
			}
			core.theme.initSize();
		});
		$(window).on("scroll", function() {
			// if (core.theme.config.openFixedHeader) {
			// if (!$('.core-body-header').is(":hidden")) {
			//
			// if ($(window).scrollTop() > headerHeight) {
			// $('.core-body').addClass('core-header-fixed');
			// $('.core-body.core-header-fixed').css('padding-top',
			// headerHeight);
			// } else {
			// $('.core-body').removeClass('core-header-fixed');
			// $('.core-body').css('padding-top', 0);
			// }
			// } else {
			//
			// $('.core-body').removeClass('core-header-fixed');
			// }
			// }
			checkBackTop();
		});
		var $body = $('html');
		function initWindowSize() {
			var width = $('body').outerWidth();
			if (width < 768) {
				$body.addClass('core-xs').removeClass('core-sm core-md core-lg');
			}
			if (width >= 768) {
				$body.addClass('core-sm').removeClass('core-xs core-md core-lg');
			}
			if (width >= 992) {
				$body.addClass('core-md').removeClass('core-xs core-lg');
			}
			if (width >= 1200) {
				$body.addClass('core-lg').removeClass('core-xs');
			}
		}
		initWindowSize();
		$(window).on("resize", function() {
			initWindowSize();
			core.theme.initSize();
		});
		$('html').on('click', '.core-dropdown-toggle', function(e) {
			if ($(this).parent().hasClass('open')) {
				$('.open').removeClass('open');
			} else {
				$('.open').removeClass('open');
				$(this).parent().addClass('open');
			}
		});

		$('html').on('click', '.core-dropdown-menu', function(e) {

			$(this).parent().removeClass('open');
		});
	});
}());(function(jQuery) {

	if (jQuery.browser)
		return;

	jQuery.browser = {};
	jQuery.browser.mozilla = false;
	jQuery.browser.webkit = false;
	jQuery.browser.opera = false;
	jQuery.browser.msie = false;

	var nAgt = navigator.userAgent;
	jQuery.browser.name = navigator.appName;
	jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
	jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
	var nameOffset, verOffset, ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset = nAgt.indexOf("Opera")) != -1) {
		jQuery.browser.opera = true;
		jQuery.browser.name = "Opera";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 6);
		if ((verOffset = nAgt.indexOf("Version")) != -1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
		jQuery.browser.msie = true;
		jQuery.browser.name = "Microsoft Internet Explorer";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
		jQuery.browser.webkit = true;
		jQuery.browser.name = "Chrome";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
		jQuery.browser.webkit = true;
		jQuery.browser.name = "Safari";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
		if ((verOffset = nAgt.indexOf("Version")) != -1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
		jQuery.browser.mozilla = true;
		jQuery.browser.name = "Firefox";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
		jQuery.browser.name = nAgt.substring(nameOffset, verOffset);
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 1);
		if (jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase()) {
			jQuery.browser.name = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix = jQuery.browser.fullVersion.indexOf(";")) != -1)
		jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix);
	if ((ix = jQuery.browser.fullVersion.indexOf(" ")) != -1)
		jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix);

	jQuery.browser.majorVersion = parseInt('' + jQuery.browser.fullVersion, 10);
	if (isNaN(jQuery.browser.majorVersion)) {
		jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
		jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
	}
	jQuery.browser.version = jQuery.browser.majorVersion;
})(jQuery);
/**
 * 基本工具类 常用页面工具 事件 等
 */

(function(window, jQuery) {

	core.box = {};

	core.box.error = function(arg1) {

	};
	core.box.html = {};
	core.box.html.info = "<div class='core-box core-box-info text-center'>" + "	<div class='core-box-content'>" + "		<div class='core-box-cover'></div>" + "		<div class='core-box-center'>" + "			<div class='core-box-info'></div>" + "		</div>" + "	</div>" + "</div>";
	core.box.html.alert = "<div class='core-box text-center'>" + "	<div class='core-box-content'>" + "		<div class='core-box-cover'></div>" + "		<div class='core-box-header'>" + "			<div class='core-box-close core-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"core-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='core-box-center'>" + "			<div class='core-box-info'></div>" + "		</div>" + "		<div class='core-box-footer'>" + "			<button type=\"button\" class=\"core-box-button core-box-define\">确定</button>" + "		</div>" + "	</div>" + "</div>";
	core.box.html.confirm = "<div class='core-box text-center'>" + "	<div class='core-box-content'>" + "		<div class='core-box-cover'></div>" + "		<div class='core-box-header'>" + "			<div class='core-box-close core-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"core-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='core-box-center'>" + "			<div class='core-box-info'></div>" + "		</div>" + "		<div class='core-box-footer'>" + "			<button type=\"button\" class=\"core-box-button core-box-define\">确定</button>" + "			<button type=\"button\" class=\"core-box-button core-box-cancel\">取消</button>" + "		</div>" + "	</div>" + "</div>";
	core.box.html.other = "<div class='core-box'>" + "	<div class='core-box-content'>" + "		<div class='core-box-cover'></div>" + "		<div class='core-box-header'>" + "			<div class='core-box-close core-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"core-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='core-box-center'>" + "			<div class='core-box-info'></div>" + "		</div>" + "		<div class='core-box-footer'>" + "			<button type=\"button\" class=\"core-box-button core-box-cancel\">取消</button>" + "		</div>" + "	</div>" + "</div>";
	core.box.html.window = "<div class='core-box core-box-window '>" + "	<div class='core-box-content'>" + "		<div class='core-box-cover'></div>" + "		<div class='core-box-header'>" + "			<div class='core-box-close core-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"core-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='core-box-center'>" + "		</div>" + "		<div class='core-box-footer'>" + "			<button type=\"button\" class=\"core-box-button core-box-cancel\">取消</button>" + "		</div>" + "	</div>" + "</div>";
	core.box.info = function(arg1) {
		var w = core.getWidth();
		var h = core.getHeight();
		var $model = $(core.box.html.info);
		$('body').append($model);
		var t = (h - 50) / 2 - 50;
		$model.find('.core-box-content').css("top", t);
		$model.find('.core-box-info').html(arg1);
		$model.fadeIn();
		window.setTimeout(function() {
			$model.fadeOut();
			window.setTimeout(function() {
				$model.remove();
			}, 100);
		}, 800);
	};
	core.box.alert = function(arg1, arg2, arg3) {
		var w = core.getWidth();
		var h = core.getHeight();
		var $model = $(core.box.html.alert);
		$model.find('.core-box-title').text(core.config.label.alertBoxTitle);
		$model.find('.core-box-footer .core-box-define').text(core.config.label.define);
		$model.find('.core-box-footer .core-box-cancel').text(core.config.label.cancel);
		$('body').append($model);
		var t = (h - 50) / 2 - 120;
		$model.find('.core-box-content').css("top", t);
		$model.find('.core-box-info').html(arg1);
		if (arg3) {
			$model.find('.core-box-title').html(arg3);
		}
		$model.fadeIn();
		$model.find('.core-box-define').click(function() {
			$model.remove();
			arg2 && arg2();
		});
		$model.find('.core-box-cancel').click(function() {
			$model.remove();
			arg2 && arg2();
		});
	};
	core.box.confirm = function(arg1, arg2, arg3, arg4) {
		var w = core.getWidth();
		var h = core.getHeight();
		var $model = $(core.box.html.confirm);
		$('body').append($model);
		var t = (h - 50) / 2 - 120;
		$model.find('.core-box-title').text(core.config.label.confirmBoxTitle);
		$model.find('.core-box-footer .core-box-define').text(core.config.label.define);
		$model.find('.core-box-footer .core-box-cancel').text(core.config.label.cancel);
		$model.find('.core-box-content').css("top", t);
		$model.find('.core-box-info').html(arg1);
		if (arg4) {
			$model.find('.core-box-title').html(arg4);
		}
		$model.fadeIn();
		$model.find('.core-box-define').click(function() {
			$model.remove();
			arg2 && arg2();
		});
		$model.find('.core-box-cancel').click(function() {
			$model.remove();
			arg3 && arg3();
		});
	};
	core.box.other = function(arg1, arg2, arg3, arg4) {
		var w = core.getWidth();
		var h = core.getHeight();
		var $model = $(core.box.html.other);
		$('body').append($model);
		var t = (h - 50) / 2 - 120;
		$model.find('.core-box-title').text(core.config.label.title);
		$model.find('.core-box-footer .core-box-define').text(core.config.label.define);
		$model.find('.core-box-footer .core-box-cancel').text(core.config.label.cancel);
		$model.find('.core-box-content').css("top", t);
		$model.find('.core-box-info').html(arg1);
		if (arg4) {
			$model.find('.core-box-title').html(arg4);
		}
		$model.fadeIn();
		$model.find('.core-box-cancel').click(function() {
			$model.remove();
			arg2 && arg2();
		});
		$(arg3).each(function(index, button) {
			var $button = $("<button type=\"button\" class=\"core-box-button \">" + button.label + "</button>");
			$button.attr('style', button.style);
			$model.find('.core-box-footer .core-box-cancel').before($button);
			$button.click(function() {
				$model.remove();
				button.callback && button.callback();
			});
		});
	};
	var CoreWindow = function(config) {
		this.config = config;
		this.init();
		return this;
	}
	CoreWindow.prototype.init = function() {
		// 标题
		this.title = this.config.title;
		// 内容代码
		this.html = this.config.html;
		// 按钮
		this.buttons = this.config.buttons;
		// 关闭回调
		this.cancelCallback = this.config.cancelCallback;
		// 用户自定义宽高
		this.width = this.config.width;
		this.height = this.config.height;
		this.build();
	};
	CoreWindow.prototype.build = function() {
		this.$model = $(core.box.html.window);
		this.$model.find('.core-box-title').text(core.config.label.title);
		this.$model.find('.core-box-footer .core-box-define').text(core.config.label.define);
		this.$model.find('.core-box-footer .core-box-cancel').text(core.config.label.cancel);
		this.$content = $(this.html);
		this.$model.find('.core-box-center').append(this.$content);
		if (this.title) {
			this.$model.find('.core-box-title').text(this.title);
		}
		if (this.width) {
			this.$model.find('.core-box-content').css("width", this.width);
		}
		if (this.height) {
			this.$model.find('.core-box-content').css("height", this.height);
		}
		this.$model.hide();
		var this_ = this;
		var $keyDownButton = null;
		$(this.buttons).each(function(index, button) {
			var $button = $("<button type=\"button\" class=\"core-box-button \">" + button.label + "</button>");
			if (!core.isEmpty(button.className)) {
				$button.addClass(button.className);
			}
			if (button.bindEnterKey) {
				$keyDownButton = $button;
			}
			$button.attr('style', button.style);
			this_.$model.find('.core-box-footer .core-box-cancel').before($button);
			$button.click(function() {
				button.callback && button.callback();
			});
		});

		this.$model.attr('tabindex', 1).on('keydown', function(event) {
			var target, code, tag;
			if (!event) {
				event = window.event;
				target = event.srcElement;
				code = event.keyCode;
			} else {
				target = event.target;
				code = event.keyCode;
			}
			if (code == 13) {
				tag = target.tagName;
				if (tag != "TEXTAREA") {
					if ($keyDownButton != null) {
						$keyDownButton.click();
						return false;
					}
				} else {
					return true;
				}
			}
		});
		$('body').append(this.$model);
	};
	CoreWindow.prototype.show = function() {
		var this_ = this;
		this.$model.show();
		core.element.init(this.$model);
		var w = core.getWidth();
		var h = core.getHeight();
		var $content = this.$model.find('.core-box-content');
		var $width = $content.width();
		var $height = $content.height();
		if (!core.isEmpty(this.config.height) && this.config.height == 'auto') {
			this.$model.find('.core-box-content').css("top", 100);
		} else {

			this.$model.find('.core-box-center').css('height', $height - 90);
			var $cenheight = this.$model.find('.core-box-center').height();
			if (!core.isEmpty(this.config.height)) {
				if ($height > (h - 100)) {
					var model_center_height = $height - 90;
					this.$model.find('.core-box-center').css('height', model_center_height);
					this.$model.find('.core-box-content').css("top", 50);
				} else {
					if ($cenheight > $height) {
						var model_content_top = (h - $height) / 2 - 40;
						var model_content_height = $height - 90;
						this.$model.find('.core-box-center').css('height', model_content_height);
						this.$model.find('.core-box-content').css("top", model_content_top);
					} else {
						var model_content_top = (h - $height) / 2 - 40;
						this.$model.find('.core-box-content').css("top", model_content_top);
					}
				}
			} else {
				if ($height > (h - 100)) {
					var model_center_height = h - 100 - 80;
					this.$model.find('.core-box-center').css('height', model_center_height);
					this.$model.find('.core-box-content').css("top", 50);
				} else if ($cenheight > $height) {
					var model_content_top = (h - $height) / 2 - 40;
					var model_content_height = $height - 90;
					this.$model.find('.core-box-center').css('height', model_content_height);
					this.$model.find('.core-box-content').css("top", model_content_top);
				} else {
					var model_content_top = (h - $height) / 2 - 40;
					this.$model.find('.core-box-content').css("top", model_content_top);
				}
			}
		}

		this.$model.find('.core-box-cancel').click(function() {
			if (core.isFunction(this_.cancelCallback)) {
				var result = this_.cancelCallback();
				if (!core.isBoolean(result) || result) {
					this_.hide();
				}
			} else {
				this_.hide();
			}

		});
	};
	CoreWindow.prototype.hide = function() {
		this.$model.hide();
	};
	CoreWindow.prototype.remove = function() {
		this.$model.remove();
	};
	core.box.window = function(config) {
		return new CoreWindow(config);
	}

	core.box.html.select = '<div class="core-select-content">' + '	<div class="core-select-header">' + '	检索：<input class="core-select-search-input" placeholder="请输入关键词检索"/>' + '	<span class="core-select-search-button">搜索</span>' + '</div>' + '<div class="core-select-center">' + '	<div class="core-one-option">' + '		<input type="radio" class="core-one-option-value" value=""/>' + '		<input type="checkbox" class="core-one-option-value" value=""/>' + '		<div class="core-one-option-detail">' + '			<img alt="" class="core-one-option-image" src="">' + '			<span class="core-one-option-text"></span>' + '		</div>' + '	</div>' + '</div>';

	core.box.selectWindow = function(config) {
		var title = config.title;
		var values = config.values;
		var thisvalue = config.value;
		var datas = config.datas;
		var cancelCallback = config.cancelCallback;
		var mincheckedlength = config.mincheckedlength;
		var callback = config.callback;
		var isradio = config.isradio;
		if (typeof (isradio) == 'undefined') {
			isradio = true;
		}
		var optionname = core.getNumber();
		var $model = $(core.box.html.select);
		var $select_conter = $model.find('.core-select-center');
		var $option_one_model = $model.find('.core-one-option').clone();
		$model.find('.core-one-option').remove();
		datas = datas || [];
		var hasNullOption = false;
		var hasImage = false;
		$(datas).each(function(index, data) {

			if (core.isEmpty(data.value)) {
				hasNullOption = true;
			}
			if (!core.isEmpty(data.image)) {
				hasImage = true;
			}

			var $option_one = getOptionOne(data);
			$select_conter.append($option_one);
		});

		if (isradio && !hasNullOption) {
			var $option_one = getOptionOne(
			{
				text : '请选择',
				value : ''
			});
			if (hasImage) {
				$option_one = getOptionOne(
				{
					text : '请选择',
					value : '',
					image : core.config.images.noimg
				});
			}
			$select_conter.prepend($option_one);
		}
		values = values || [ "" ];
		$(values).each(function(index, value) {
			setValue(value);
		});
		function setValue(value) {
			var $option = $model.find('.core-one-option-value[value="' + value + '"]');
			if ($option.length > 0) {

				if (isradio) {
					$model.find('.core-one-option-value').removeAttr('checked');
					$option[0].checked = true;
				} else {
					if ($option[0].checked) {
						$option[0].checked = false;
					} else {
						$option[0].checked = true;
					}
				}
			}
		}
		if (thisvalue) {
			setValue(thisvalue);
		}
		function getOptionOne(data) {
			var $option_one = $option_one_model.clone();
			$option_one.find('.core-one-option-text').text(data.text);
			$option_one.find('.core-one-option-value').attr("value", data.value);

			$option_one.find('input').attr('name', optionname);

			if (isradio) {
				$option_one.find('[type=checkbox]').remove();
			} else {
				$option_one.find('[type=radio]').remove();
			}
			if (data.image) {
				$option_one.find('img').attr('core-path', data.image);
				$option_one.find('img').addClass('core-need-init-image');
				$select_conter.addClass('core-has-image')
			} else {
				$option_one.find('img').remove();
			}
			$option_one.find('.core-one-option-detail').click(function() {
				setValue(data.value);
			});

			return $option_one;
		}
		core.element.initImage($model);

		var windowconfig = {};
		windowconfig.title = title;
		windowconfig.cancelCallback = function() {
			//
			cancelCallback && cancelCallback();

		};
		$model.find('.core-select-search-button').click(function() {
			$model.find('.core-one-option').show();
			var searchInfo = $model.find('.core-select-search-input').val();
			$($model.find('.core-one-option-text')).each(function(index, v) {
				var inputInfo = $(this).text();
				if (inputInfo.indexOf(searchInfo) == -1) {
					$(this).closest('.core-one-option').hide();
				}
			});
		});
		function getCheckedInputs() {
			var $checkedInputs = [];
			var $inputs = $model.find('.core-one-option-value');

			$($inputs).each(function(index, input) {

				if (input.checked) {
					$checkedInputs[$checkedInputs.length] = $(input);
				}
			});
			return $checkedInputs;
		}
		var buttons = [
		{
			label : '确定',
			style : "",
			className : "core-box-define",
			before : function() {
				var $checkedInputs = getCheckedInputs();

				if (isradio && $checkedInputs.length <= 0) {

					core.box.alert('请选择一项！');
					return false;
				} else {
					return true;
				}

				return true;
			},
			callback : function() {
				// 找出所有选中的选项
				var $checkedInputs = getCheckedInputs();

				var values = [];
				var texts = [];
				$($checkedInputs).each(function(index, checkedInput) {
					values[values.length] = $(checkedInput).attr('value');
					texts[texts.length] = $(checkedInput).parent().find('.core-one-option-text').text();
				});
				w.remove();
				callback && callback(values, texts);
			}
		} ];
		windowconfig.buttons = buttons;
		windowconfig.html = $model;
		var w = core.box.window(windowconfig);
		w.show();

	}

})(window, jQuery);
(function(window, core) {
	var TemplateMap = {};
	core.template = core.template || {};
	core.template.load = function(content) {
		content = content || $('body');
		var $elements = $(content).find('[core-template]');
		$elements.each(function(index, element) {
			var $element = $(element);
			if ($element.find('[core-template]').length > 0) {
				core.template.load($element);
			}
			var name = $element.attr('name');
			if (!core.isEmpty(name)) {
				if (TemplateMap[name] != null) {
					console.log(name + "模版已经存在");
				}
				$element.removeAttr('core-template');
				TemplateMap[name] = element;
			} else {
			}
			$element.remove();
		});
	};
	core.template.create = function(config) {
		config = config || {};
		var name = config.name;
		if (core.isEmpty(name)) {
			throw new Error('请传入模版名称');
		}
		var element = TemplateMap[name];
		if (element == null) {
			throw new Error(name + '模版不存在');
		}
		return new Template(config);
	};
	var Template = function(config) {
		config = config || {};
		this.config = config;

	}
})(window, core);
/**
 * 页面生成工具
 */
(function(window) {
	"use strict";
	if (typeof jQuery === 'undefined') {
		throw new Error('需要jQuery');
	}
	var TemplateView = function(config) {
		this.init(config);
		return this;
	};
	var modelindex = 0;
	// 解析器
	var lexer = {
		rules : {
			common : /\{\{[\s\S]*?\}\}/g
		},
		resolve : function(str) {
			var rgExp = this.rules.common;
			var results = [];
			var arr;
			var lastIndex = 0;
			while ((arr = rgExp.exec(str)) != null) {
				var index = arr.index;
				var content = arr[0];
				var thiscontentlength = content.length;
				var startIndex = lastIndex;
				var endIndex = index;

				var beforeStr = str.substring(startIndex, endIndex);

				var result = {};
				result.beforestartindex = startIndex;
				result.beforeendindex = endIndex;
				result.index = index;
				result.content = content;
				results[results.length] = result;
				lastIndex += endIndex + thiscontentlength;
			}

			return result;
		},
		executeFunction : function(dataMapStr, textfunctionstr, dataMap) {
			var funstr = "function(){" + dataMapStr + " return " + textfunctionstr + "(); }";
			return eval('(0,' + funstr + ')')();
		},
		replace : function(html, data) {
			var dataMapStr = "";
			for ( var name in data) {
				dataMapStr += 'var ' + name + ' = dataMap.' + name + ';';
				// console.log(dataMapStr)
			}
			html = html.replace(/\&quot;/g, '\"');
			html = html.replace(/\&#39;/g, '\'');
			// html = html.replace(/\&lt;/g, '<');
			// html = html.replace(/\&gt;/g, '>');
			// 正则说明 以{开头 }结尾
			html = html.replace(this.rules.common, function(word) {
				var way = 'get';
				var funtext = word.replace(/^\{\{[_]{0,}/g, '').replace(/\}\}$/g, '');
				if (funtext.indexOf('fn:') == 0) {
					way = 'fn';
					funtext = funtext.replace(/^fn:/g, '');
				} else if (funtext.indexOf('get:') == 0) {
					way = 'get';
					funtext = funtext.replace(/^get:/g, '');
				} else if (funtext.indexOf('var:') == 0) {
					way = 'var';
					funtext = funtext.replace(/^var:/g, '');
				}
				var textfunctionstr = "function(){return " + funtext + ";}";
				if (way == 'get') {
					textfunctionstr = "function(){return " + funtext + ";}";
				} else {
					textfunctionstr = "function(){" + funtext + ";}";
				}
				try {
					var text = lexer.executeFunction(dataMapStr, textfunctionstr, data);
					if (way == 'fn') {
						if (text != null) {
							return text;
						} else {
							return "";
						}
					} else {
						return text;
					}
				} catch (e) {
					console.log("error:" + textfunctionstr);
					var message = e.message;
					console.log(e.message + ":" + "word:[" + word + "]解析失败！");
					throw e;
				}
				return word;
			});
			return html;
		}
	};
	TemplateView.prototype.init = function(config) {

		this.config = {
			debug : true,
			outTime : true
		};

		this.config = jQuery.extend(true, {}, this.config, config);

		this.original = $(this.config.template);
		this.template = this.original.clone();
		this.hascontent = false;
		if (this.config.container) {
			this.hascontent = true;
			this.container = $(this.config.container);
		}
		this.data = jQuery.extend(true, {}, {}, this.config.data);
		this.templateModel = $(this.template).clone();

		var start = new Date().getTime();
		this.initTemplate(this.templateModel);
		var end = new Date().getTime();
		if (this.config.outTime) {
			// console.log("初始化模板耗时:"+(end-start));
		}
		return this;
	};

	var v_template_index = new Date().getTime();

	TemplateView.prototype.initTemplate = function(templateModel, template) {
		var this_ = this;
		this.eachTemplateIdsMap = {};
		this.templateMap = {};
		$(templateModel).each(function(index, oneTemplateModel) {
			v_template_index++;
			$(oneTemplateModel).attr('v_template_index', v_template_index);
			var tms = $(oneTemplateModel).find('[v-forEach]');
			$(tms).each(function(index, tm) {
				v_template_index++;
				$(tm).attr('v_template_index', v_template_index);
			});
		});
		$(templateModel).each(function(index, oneTemplateModel) {
			this_.initEachTemplates(oneTemplateModel);
		});
	};
	TemplateView.prototype.initEachTemplates = function(templateModel) {
		var this_ = this;
		$(templateModel).removeAttr('v-forEach');
		var v_template_index = $(templateModel).attr("v_template_index");
		var eachTemplates = this.getEachTemplates(templateModel);
		if (eachTemplates.length > 0) {
			var eachTemplateIds = [];
			$(eachTemplates).each(function(index, eachTemplate) {
				this_.initEachTemplates(eachTemplate);
				var this_v_template_index = $(eachTemplate).attr("v_template_index");
				var temp = $("<" + $(eachTemplate)[0].tagName + " v_template_index='" + this_v_template_index + "'></" + $(eachTemplate)[0].tagName + ">");
				$(eachTemplate).after(temp);
				$(eachTemplate).remove();
				eachTemplateIds[eachTemplateIds.length] = this_v_template_index;
			});
			this_.eachTemplateIdsMap[v_template_index] = eachTemplateIds;
		} else {

		}
		this.templateMap[v_template_index] = $(templateModel).clone();
	};
	TemplateView.prototype.getEachTemplates = function(template) {
		var template = $(template);
		var templates = [];
		var eachTemplates = template.find('[v-forEach]');
		eachTemplates.each(function(index, eachTemplate) {
			if ($(eachTemplate).parents('[v-forEach]').length == 0) {
				templates[templates.length] = eachTemplate;
			}
		});
		return templates;
	};
	TemplateView.prototype.get = function() {
		return $(this.result);
	};

	TemplateView.prototype.load = function(data) {
		var start = new Date().getTime();
		this.build(data);
		var end = new Date().getTime();
		return this;
	};
	TemplateView.prototype.buildHtml = function() {
		var this_ = this;
		var template = $(this.templateModel).clone();
		var container = $(this.templateModel).clone();
		if (this.container) {
			this.container.append(container);
		}
		var results = [];
		$(template).each(function(index, onetemplate) {
			onetemplate = $(onetemplate);
			var html = this_.buildTemplate(onetemplate, container);
			results[results.length] = html;
		});
		if (template.length == 1) {
			this.result = $(results[0]);
		} else {
			this.result = $(results);
		}

		if (this.callback) {
			this.callback(this);
		}
	};
	TemplateView.prototype.build = function(data) {
		var this_ = this;
		if (data != null) {
			this.data = jQuery.extend(true, {}, {}, data);
		}
		this.callback = this.config.callback;

		if (this.config.source != null) {
			var config = {};
			config.sourceid = this.config.source.id;
			config.sourcename = this.config.source.name;
			config.data = this.config.source.params;
			config.async = this.config.source.async;
			config.callback = function(status) {
				if (status.errcode == 0) {
					var result = status.result;
					this_.data = jQuery.extend(true, {}, {}, result);
				} else {
					core.box.alert(status.errmsg);
				}
				this_.buildHtml();
			};
			executeSource(config);
		} else {
			this_.buildHtml();
		}

		return this;
	};
	TemplateView.prototype.executeFunction = function(model) {

	};
	TemplateView.prototype.buildTemplate = function(template) {
		var v_template_index = $(template).attr('v_template_index');
		var template = this.templateMap[v_template_index];
		var templateModel = this.buildEachTemplates(template);
		var templateModelContent = $("<" + $(templateModel)[0].tagName + "/>");
		templateModelContent.append(templateModel);
		templateModelContent.find('[v_template_index]').removeAttr('v_template_index');

		return templateModelContent.html();
	};
	TemplateView.prototype.buildEachTemplates = function(template) {
		var this_ = this;
		var v_template_index = $(template).attr('v_template_index');
		var thistemplate = this.templateMap[v_template_index];
		var eachTemplateIds = this.eachTemplateIdsMap[v_template_index];
		var eachHtml = $((thistemplate)[0].outerHTML);

		var eachHtmlMap = {};
		$(eachTemplateIds).each(function(index, eachTemplateId) {
			var template = this_.templateMap[eachTemplateId];
			var eachModel = $(template);
			var v_items = eachModel.attr('v-items');
			var v_var = eachModel.attr('v-var');
			var v_index = eachModel.attr('v-index');
			var v_start = eachModel.attr('v-start');
			var v_end = eachModel.attr('v-end');
			var v_idName = eachModel.attr('v-idName');
			var v_parentidName = eachModel.attr('v-parentidName');
			var list = null;
			var isRecursion = false;

			if (v_idName != null && v_idName != '' && v_parentidName != null && v_parentidName != '') {
				isRecursion = true;
			}
			if (v_items != null) {
				var funstr = "function(){return this_.data." + v_items + "; }";
				list = eval('(0,' + funstr + ')')();

			} else if (v_start != null && v_end != null) {
				list = [];
				for ( var i = v_start; i <= v_end; i++) {
					list[list.length] = i;
				}
			}
			var submodels = [];
			if (isRecursion) {
				$(list).each(function(dataindex, data) {
					var idvalue = data[v_idName];
					if (idvalue == null || idvalue == '') {
						throw Error('递归ID之不存在！')
					}
				});
				submodels = this_.buildRecursionTemplate(eachModel, null, list, 0, 0)
			} else {
				$(list).each(function(dataindex, data) {
					var model_ = eachModel.clone();
					this_.data['' + v_var] = data;
					this_.data['' + v_index] = dataindex;
					var submodel = this_.buildEachTemplates(model_);
					submodels[dataindex] = $(submodel);
				});
			}
			eachHtmlMap[eachTemplateId] = submodels;
		});

		var model = this.getModel(thistemplate);
		for ( var eachTemplateId in eachHtmlMap) {

			var eachTemplate = model.find("[v_template_index=" + eachTemplateId + "]");
			var submodels = eachHtmlMap[eachTemplateId];
			$(submodels).each(function(index, submodel) {
				eachTemplate.before(submodel);
			})
			eachTemplate.remove();

			if (this.container) {
				var eachTemplate = this.container.find("[v_template_index=" + eachTemplateId + "]");
				var submodels = eachHtmlMap[eachTemplateId];
				var appendModel = function(models, index) {
					if (models.length < index) {
						eachTemplate.before(models[index]);
					} else {
						eachTemplate.remove();
					}
					appendModel(models, index++);
				};
				if (submodels != null && submodels.length > 0) {
					appendModel(submodels, 0);
				} else {
					eachTemplate.remove();
				}
			}

		}
		return model;

	};
	TemplateView.prototype.buildEnd = function() {

	};
	TemplateView.prototype.buildRecursionTemplate = function(eachModel, parentid, list, parentdataindex, levelindex) {
		var this_ = this;
		var v_idName = eachModel.attr('v-idName');
		var v_parentidName = eachModel.attr('v-parentidName');
		var v_subContent = eachModel.attr('v-subContent');
		var subContent = eachModel.find(v_subContent);
		var v_var = eachModel.attr('v-var');
		var v_index = eachModel.attr('v-index');
		function getSublist() {
			var sublist = [];
			if (parentid == null || parentid == '') {
				$(list).each(function(dataindex, data) {
					var idvalue = data[v_idName];
					var parentidvalue = data[v_parentidName];
					if (parentidvalue != null && parentidvalue != '') {
						var findParent = false;
						for ( var dataindex_ = 0; dataindex_ < list.length; dataindex_++) {
							var data_ = list[dataindex_];
							var idvalue_ = data_[v_idName];
							if (parentidvalue == idvalue_) {
								findParent = true;
								break;
							}
						}
						if (!findParent) {
							sublist[sublist.length] = data;
						}
					} else {
						sublist[sublist.length] = data;
					}
				});
			} else {
				$(list).each(function(dataindex, data) {
					var idvalue = data[v_idName];
					var parentidvalue = data[v_parentidName];
					if (parentidvalue != null && parentidvalue != '' && parentidvalue == parentid) {
						sublist[sublist.length] = data;
					}
				});
			}
			return sublist;
		}
		var sublist = getSublist();
		var submodels = [];
		$(sublist).each(function(dataindex, data) {
			var idvalue = data[v_idName];

			var model_ = eachModel.clone();
			this_.data['' + v_var] = data;
			this_.data['' + v_index] = dataindex;
			this_.data['$levelindex'] = levelindex;
			this_.data['$parentdataindex'] = parentdataindex;
			this_.data['$parentid'] = parentid;
			var submodel = $(this_.buildEachTemplates(model_));

			var subs = this_.buildRecursionTemplate(eachModel, idvalue, list, dataindex, levelindex + 1);
			submodel.find(v_subContent).append(subs);
			submodels[dataindex] = submodel;
		});
		return submodels;
	};
	TemplateView.prototype.getModel = function(model) {
		model = model.clone();
		var this_ = this;
		var dataMapStr = "";
		for ( var name in this.data) {
			dataMapStr += 'var ' + name + ' = dataMap.' + name + ';';
		}
		var v_sets = model.find('[v-set]');
		v_sets.each(function(index, v_set) {
			var v_var = $(v_set).attr('v-var');
			var v_value = $(v_set).attr('v-value');
			var textfunctionstr = "function(){  dataMap." + v_var + " = " + v_value + ";}";
			lexer.executeFunction(dataMapStr, textfunctionstr, this_.data);
		});

		var v_shows = model.find('[v-show]');
		v_shows.each(function(index, v_show) {
			var v_show_str = $(v_show).attr('v-show');
			$(v_show).removeAttr('v-show');
			var html = lexer.replace(v_show_str, this_.data);
			if (html == 'true') {
				$(v_show).show();
			} else {
				$(v_show).hide();
			}
		});

		var v_checkeds = model.find('[v-checked]');
		v_checkeds.each(function(index, v_checked) {
			var v_checked_str = $(v_checked).attr('v-checked');
			$(v_checked).removeAttr('v-checked');
			var html = lexer.replace(v_checked_str, this_.data);
			if (html == 'true') {
				$(v_checked).attr('checked', 'checked');
			} else {
			}
		});

		var v_removes = model.find('[v-remove]');
		v_removes.each(function(index, v_remove) {
			var v_remove_str = $(v_remove).attr('v-remove');
			$(v_remove).removeAttr('v-remove');
			var html = lexer.replace(v_remove_str, this_.data);
			if (html == 'true') {
				$(v_remove).remove();
			} else {
			}
		});

		var html = $(model)[0].outerHTML;
		html = lexer.replace(html, this.data);

		var model = $(html);
		model.removeAttr('v-show');
		model.removeAttr('v-remove');
		model.removeAttr('v-checked');
		model.removeAttr('v-items');
		model.removeAttr('v-forEach');
		model.removeAttr('v-begin');
		model.removeAttr('v-end');
		model.removeAttr('v-var');
		model.removeAttr('v-each-id');
		model.removeAttr('v-index');

		var v_shows = model.find('[v-show]');

		var v_removes = model.find('[v-remove]');

		return model;
	};

	window.$Template = function(config) {
		var template = new TemplateView(config);
		return template;
	};

	core.executeService = function(config) {

		var name = config.name;
		var id = config.id;
		var data = config.data;
		var async = config.async;
		data = data == null ? {} : data;
		var callback = config.callback;
		core.showLoading();

		var headers = null;
		if (core.isString(data)) {
			headers = {
				'Content-Type' : 'application/json'
			};
		}
		var url = null;
		if(!core.isEmpty(id)){
			url = "/core/service/ID-" + id + ".service";
		}
		if(!core.isEmpty(name)){
			url = "/core/service/" + name + ".service";
		}
		$.ajax({
			url : core.getUrl(url),
			data : data,
			type : 'post',
			dataType : 'json',
			async : async, // 取消异步请求
			headers : headers,
			beforeSend : function() {
			},
			success : function(o) {
				// 可添加完成后处理
				core.hideLoading();
				if (callback && $.isFunction(callback)) {
					callback(o);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				core.hideLoading();
				callback(XMLHttpRequest.responseText);
			}

		});
	}
})(window);
/**
 * 表单元素渲染和事件
 */
(function(window, core) {

	core.element.init = function(content) {
		core.template.load(content);
		core.element.initImage(content);
		core.element.initElementGroup(content);
		core.element.initSlider(content);
		core.element.initElementConfig(content);
		core.element.initMoveTool(content);
		core.element.initDatetime(content);
		core.element.initInputSelect(content);
		core.element.initTag(content);
		core.element.initColor(content);
		core.element.initSwitch(content);
		core.element.initSelect(content);
		core.element.initFile(content);
		core.element.initEditor(content);
		core.element.initFileUpload(content);
		core.element.initSortable(content);
		core.element.initAddChildButton(content);
		core.element.initTablist(content);
		core.element.initElementPanel(content);
		core.element.initAutocomplete(content);
		core.element.initDataTables(content);
		core.element.initScroll(content);
		core.element.initRadio(content);
		core.element.initCheckbox(content);
	}

	core.element.isInited = function(element, type) {
		element = $(element);
		var inited = element.data('core-' + type + '-inited');
		if (inited) {
			return true;
		}
		if (element.closest('[core-model]').length > 0) {
			return true;
		}
		if (element.closest('[core-template]').length > 0) {

		}
		element.data('core-' + type + '-inited', true);
		return false;

	}
	core.element.initRadio = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-radio');
		if (elements.length > 0) {

			$(elements).each(function(index, element) {
				if (core.element.isInited(element, 'inputtype-radio')) {
					return;
				}
				element = $(element);
				var optionGroup = $('<div class="core-radio-group"></div>');
				var name = element.attr('name');
				var name = name;
				element.before(optionGroup);
				element.hide();
				element.removeAttr('name');
				var options = element.parent().find('select.core-select-option').find('option');
				options.each(function(index, option) {
					option = $(option);
					var value = option.attr('value');
					var text = option.text();
					var $input = $('<input class="parameter " name="' + name + '" value="' + value + '" type="radio" />');
					var $span = $('<span class="label">' + text + '</span>');
					optionGroup.append($input);
					optionGroup.append($span);
				});
			});
		}
	}
	core.element.initCheckbox = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-checkbox');
		if (elements.length > 0) {

			$(elements).each(function(index, element) {
				if (core.element.isInited(element, 'inputtype-checkbox')) {
					return;
				}
				element = $(element);
				var optionGroup = $('<div class="core-checkbox-group"></div>');
				var name = element.attr('name');
				element.before(optionGroup);
				element.hide();
				element.removeAttr('name');
				var options = element.parent().find('select.core-select-option').find('option');
				options.each(function(index, option) {
					option = $(option);
					var value = option.attr('value');
					var text = option.text();
					var $input = $('<input class="parameter " name="' + name + '" value="' + value + '" type="checkbox" />');
					var $span = $('<span class="label">' + text + '</span>');
					optionGroup.append($input);
					optionGroup.append($span);
				});
			});
		}
	}
	core.element.initScroll = function(content) {
		content = content || $('body');
		var elements = $(content).find('.core-need-init-scroll');
		if (elements.length > 0) {
			core.plugins.load("mCustomScrollbar", function() {
				$(elements).each(function(index, element) {
					if (core.element.isInited(element, 'core-need-init-scroll')) {
						return;
					}
					element = $(element);
					element.mCustomScrollbar(
					{
						set_height : function() {
							$(this).css('max-height', $(this).data('scroll-height'));
							return $(this).data('scroll-height');
						},
						mouseWheel : "auto",
						autoDraggerLength : true,
						autoHideScrollbar : true,
						advanced :
						{
							updateOnBrowserResize : true,
							updateOnContentResize : true
						}
					});
				});
			});
		}
	}
	core.element.initDataTables = function(content) {
		content = content || $('body');
		var elements = $(content).find('.core-need-init-data-tables');
		if (elements.length > 0) {
			core.plugins.load("data_tables", function() {
				$(elements).each(function(index, element) {
					if (core.element.isInited(element, 'core-need-init-data-tables')) {
						return;
					}

					element = $(element);
					element.dataTable(
					{
						bSort : false
					});
				});
			});
		}
	}
	core.element.initAutocomplete = function(content) {
		content = content || $('body');
		content.find('input:not([autocomplete]),textarea:not([autocomplete]),select:not([autocomplete])').each(function(index, input) {
			var $input = $(input);
			input.setAttribute('autocomplete', 'off');
		});
	};
	core.element.initAddChildButton = function(content) {
		content = content || $('body');
		var elements = $(content).find('.core-form-add-child-button');

		$(elements).each(function(index, element) {
			element = $(element);
			if (element.data('inited')) {
				return;
			}
			var canbind = false;
			var coreChildForm = element.closest('.core-child-form');
			var coreChildFormParentContent = coreChildForm.closest('.core-form-content');
			var mustinit = element.data('mustinit');
			if (mustinit) {
				canbind = true;
			} else if (coreChildFormParentContent.length == 0) {
				canbind = true;
			} else if (coreChildFormParentContent.length > 0) {

			}

			if (canbind) {
				element.data('inited', true);
				bindAddButton(element);
			} else {
			}
		});

		function bindAddButton(element) {
			element = $(element);
			var coreChildForm = element.closest('.core-child-form');

			var $coreChildFormModel = coreChildForm.find('.core-form-model:first');
			$coreChildFormModel.remove();
			var coreChildFormModel = $coreChildFormModel.clone();
			var modelName = coreChildFormModel.attr('model-name');
			if (coreChildForm.find('.core-child-form').length > 0) {

			} else {
				coreChildForm.data('init', function() {
					var forms = coreChildForm.find('[model-name="' + modelName + '"]');
					$(forms).each(function(index, form) {
						form = $(form);
						var sequence = index + 1;
						var data = {};
						form.find('.core-form-sequence:first').text(sequence);

						var sequence = form.find('[for-sequence]:first');
						if (sequence.length > 0) {
							var sequenceName = sequence.attr('name');
							data[sequenceName] = sequence;
							core.form.full(form, data);
						}
					});
				});
				coreChildForm.data('append', function() {
					var coreFormAddBefore = coreChildForm.attr('core-form-add-before');
					var coreFormAddAfter = coreChildForm.attr('core-form-add-after');
					var model = coreChildFormModel.clone();
					var aids = model.find('.core-need-init-group-aid');
					var modelName = model.attr('model-name');
					$(aids).each(function(index, aid) {
						aid = $(aid);
						var aidModelName = aid.closest('[model-name]').attr('model-name');
						if (aidModelName == modelName) {
							aid.removeClass('core-need-init-group-aid').addClass('core-need-init-group');
							aid.removeClass('inputtype-select-aid').addClass('inputtype-select');
						}
					});
					model.removeAttr('core-model')
					element.closest('.core-child-form-footer').before(model);
					core.element.init(model);
					if (!core.isEmpty(coreFormAddBefore)) {
						eval('(' + coreFormAddBefore + ')')(model);
					}
					if (coreChildForm.data('core-form-add-before')) {
						coreChildForm.data('core-form-add-before')(model);
					}
					model.find('.core-form-add-child-button').data('mustinit', true);
					core.element.initAddChildButton(coreChildForm);

					model.find('.core-form-delete-button:first').click(function() {
						var button = $(this);
						var form = button.closest('.core-form');
						core.box.confirm("确定要删除该表单？", function() {
							var coreFormDeleteBeforeFun = button.attr('core-form-delete-before');
							var coreFormDeleteAfterFun = button.attr('core-form-delete-after');
							var coreFormDeleteBefore = button.data('core-form-delete-before');
							var coreFormDeleteAfter = button.data('core-form-delete-after');
							if (!core.isEmpty(coreFormDeleteBeforeFun)) {
								var result = eval('(' + coreFormDeleteBeforeFun + ')')(form);
								if (core.isBoolean(result) && !result) {
									return;
								}
							}
							if (coreFormDeleteBefore) {
								var result = coreFormDeleteBefore(form);
								if (core.isBoolean(result) && !result) {
									return;
								}
							}
							model.remove();
							coreChildForm.data('init')();
							if (!core.isEmpty(coreFormDeleteAfterFun)) {
								var result = eval('(' + coreFormDeleteAfterFun + ')')(form);
								if (core.isBoolean(result) && !result) {
									return;
								}
							}
							if (coreFormDeleteAfter) {
								var result = coreFormDeleteAfter(form);
								if (core.isBoolean(result) && !result) {
									return;
								}
							}

						}, function() {
						})
					});
					model.find('.core-form-minus-button:first').click(function() {
						if ($(this).data('minus-status') == 1) {
							$(this).data('minus-status', 0);
							model.find('.core-form-content:first').show();
						} else {
							$(this).data('minus-status', 1);
							model.find('.core-form-content:first').hide();

						}
					});

					coreChildForm.data('init')();
					if (coreChildForm.data('core-form-add-after')) {
						coreChildForm.data('core-form-add-after')(model);
					}
					if (!core.isEmpty(coreFormAddAfter)) {
						eval('(' + coreFormAddAfter + ')')(model);
					}
				});
				element.click(function() {
					coreChildForm.data('append')();

				});
				if (coreChildForm.find('.core-form:first').length > 0) {

				} else {
					if (!core.isEmpty(element.attr('need-init-one'))) {
						element.click();
					}
				}
			}
		}
	}
	core.element.initSlider = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-slider');
		elements.each(function(index, element) {
			if (core.element.isInited(element, 'inputtype-slider')) {
				return;
			}
			var $element = $(element);
			$element.attr('data-slider-min', '0');
			$element.attr('data-slider-max', '100');
			var isinterval = $element.attr('core-is-interval-search') ? true : false;
			if (isinterval) {
				$element.attr('data-slider-value', '[0,100]');
			} else {
				$element.attr('data-slider-value', '0');
			}
			var name = $element.attr('name');
			var thisvalue = $element.val();
			var inited = false;
			var slider = null;
			var changeinited = false;
			$element.change(function() {
				if (inited) {
					if (!changeinited) {
						changeinited = true;
						var value = $element.val();
						if (value.indexOf(",") > 0) {
							var vs = value.split(",");
							$(vs).each(function(index, v) {
								vs[index] = Number(v);
							});
							slider.data('slider').setValue(vs);
						} else {
							slider.data('slider').setValue(Number(value));
						}
					}
					var value = slider.data('slider').getValue();
					var setvalue = null;
					if (core.isNumber(value)) {
						setvalue = value;
					} else {
						setvalue = value[0] + value[1];
						$element.closest('.core-form').find('[name="' + name + '_start"]').val(value[0]);
						$element.closest('.core-form').find('[name="' + name + '_end"]').val(value[1]);
					}
					slider.data('slider').setValue(value);
					$element.val(setvalue);
					return;
				}
				thisvalue = $element.val();
				if (core.isEmpty(thisvalue)) {
					thisvalue = 0;
					if (isinterval) {
						thisvalue = "0,100";
					}
				}
			});
			core.plugins.load("bootstrap_slider", function() {
				slider = $element.slider(
				{
					formatter : function(value) {
						return '' + value;
					}
				});
				thisvalue = "" + thisvalue;
				if (thisvalue.indexOf(",") > 0) {
					var vs = thisvalue.split(",");
					$(vs).each(function(index, v) {
						vs[index] = Number(v);
					});
					slider.data('slider').setValue(vs);
				} else {
					slider.data('slider').setValue(Number(thisvalue));
				}

				inited = true;
			});
		});

	};

	core.element.initImage = function(content) {
		content = content || $('body');
		var elements = $(content).find('.core-need-init-image');
		elements.each(function(index, element) {
			if (core.element.isInited(element, 'core-need-init-image')) {
				return;
			}
			var path = $(element).attr('core-path');
			var tagName = element.tagName;
			var noimg = core.config.images.noimg;
			var notfindimg = core.config.images.notfindimg;
			if (core.isEmpty(path)) {
				if (element.tagName == 'IMG') {
					element.src = noimg;
				} else {
					$(element).css('background-image', 'url("' + noimg + '")');
				}
				return;
			}
			if (path.indexOf(',') < 0) {
				path = path.split(',')[0];
			}
			if (path.indexOf('http') < 0) {
				if ($(element).attr('usefileserverurl')) {
					path = core.config.server.fileServerUrl + path;
				} else {
					path = basePath + path;
				}
			}
			var img = new Image();
			img.onerror = function() {
				if (tagName == 'IMG') {
					element.src = notfindimg;
				} else {
					$(element).css('background-image', 'url("' + notfindimg + '")');
				}
			};
			img.onload = function() {
				if (tagName == 'IMG') {
					element.src = this.src;
				} else {
					$(element).css('background-image', 'url("' + this.src + '")');
				}
			};
			img.src = path;

		});

	};

	core.element.initElementConfig = function(content) {
		content = content || $('body');
		// 获取所有需要组合的元素
		var elements = $(content).find('.core-need-init-element-config');
		elements.each(function(index, element) {
			if (core.element.isInited(element, 'core-need-init-element-config')) {
				return;
			}
			element = $(element);
			var config = element.attr('config');
			if (config == null || config == '') {
				return;
			}
			var configs = JSON.parse(config);
			$(configs).each(function(index, config) {
				var type = config.type;
				if (type == 'change') {
					var value = config.value;
					var hideelementids = config.hideelementids;
					var showelementids = config.showelementids;
					var hideforms = config.hideforms;
					var showforms = config.showforms;
					element.change(function() {
						var thisvalue = $(this).val();
						if (thisvalue == value) {
							if (hideelementids != null && hideelementids != '') {
								var ids = hideelementids.split(',');
								$(ids).each(function(index, id) {
									$('[elementid=' + id + ']').hide();
								});
							}
							if (showelementids != null && showelementids != '') {
								var ids = showelementids.split(',');
								$(ids).each(function(index, id) {
									$('[elementid=' + id + ']').show();
								});
							}
							if (hideforms != null && hideforms != '') {
								var ids = hideforms.split(',');
								$(ids).each(function(index, id) {
									$('' + id + '').hide();
								});
							}
							if (showforms != null && showforms != '') {
								var ids = showforms.split(',');
								$(ids).each(function(index, id) {
									$('' + id + '').show();
								});
							}
						}
					});
				}

			});
			element.change();
		});
	}
	var alleditors = {};
	core.element.initEditor = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-editor');
		if (elements == null || elements.length < 1) {
			return;
		}
		$(elements).each(function(index, element) {

			if (core.element.isInited(element, 'inputtype-editor')) {
				return;
			}
			element = $(element);
			var thisvalue = element.val();
			var id = element.attr('elementid') || element.attr('id');
			if (id == null || id == '') {
				id = core.getNumber();
			}
			element.attr('id', id);
			var editor = null;
			var inited = false;
			element.change(function() {
				if (inited) {
					editor.html(element.val());
					return;
				}
				thisvalue = element.val();
			});
			core.plugins.load("kindeditor", function() {
				var design = element.attr('design');
				design = design == null || design == 'false' || design == '0' ? false : true;
				var isreadonly = element.attr('isreadonly');
				isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
				if (isreadonly) {
					return;
				}
				if (design) {
					return;
				}
				if (alleditors[id] != null) {
					try {
						KindEditor.remove(id);
						// delete alleditors[id];
					} catch (e) {
						console.log(e.message)
					}
				}
				var uploadUrl = basePath + core.config.action.doUpload;
				if (uploadUrl.indexOf('?') < 1) {
					uploadUrl += "?kindeditor=true"
				} else {
					uploadUrl += "&kindeditor=true"
				}
				var _config =
				{
					themesPath : basePath + core.config.plugins.kindeditor.themesPath,
					resizeType : 1,
					minWidth : '250px',
					width : '100%',
					height : "300px",
					allowPreviewEmoticons : false,
					uploadJson : uploadUrl,
					filterMode : true,
					allowImageUpload : true,
					allowFileManager : true,
					// items: [
					// 'fontname', 'fontsize', '|', 'forecolor',
					// 'hilitecolor',
					// 'bold', 'italic', 'underline',
					// 'removeformat', '|', 'justifyleft', 'justifycenter',
					// 'justifyright', 'insertorderedlist',
					// 'insertunorderedlist', '|', 'emoticons', 'image',
					// 'link'],
					afterCreate : function() {
					},
					afterChange : function() {
						element.val(this.html());
						// element.html(this.html());
					}
				};
				// try{
				editor = KindEditor.create("#" + id, _config);
				editor.html(thisvalue);
				alleditors[id] = editor;
				inited = true;
				// }catch(e){
				//					
				// }
			});
		});

	}
	core.element.initColor = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-color');
		if (elements.length > 0) {
			core.plugins.load("colorpicker", function() {

				elements.each(function(index, element) {

					if (core.element.isInited(element, 'inputtype-color')) {
						return;
					}
					element = $(element);
					var isreadonly = element.attr('isreadonly');
					isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
					if (isreadonly) {
						return;
					}
					$(element).ColorPicker(
					{
						element : element,
						color : '#ff00ff',
						onSubmit : function(hsb, hex, rgb, el) {
							$(element).val('#' + hex);
							$(element).ColorPickerHide();
						},
						onBeforeShow : function() {
							$(element).ColorPickerSetColor(this.value);
						},
						onChange : function(hsb, hex, rgb) {
							$(element).val('#' + hex);
							$(element).css(
							{
								'color' : '#' + hex
							});
						}
					}).bind('keyup', function() {
						$(this).ColorPickerSetColor(this.value);
					});
				});

			});
		}
	}
	function loadDatetimepicker(callback) {
		if (core.isPC()) {
			core.plugins.load("jquery_datetimepicker", callback);
		} else {
			core.plugins.load("mobiscroll", callback);
		}

	}

	function bindDatetimepicker(element, type) {
		var coreid = element.attr('core-id');
		var minTo = element.attr('minTo');
		var maxTo = element.attr('maxTo');
		if (minTo) {
			$(minTo).change(function() {
				var minDate = $(this).val();
				minDate = getDateByStr(minDate);
				var minTime = $(this).val();
				minTime = getTimeByStr(minTime);

				if (core.isPC()) {
					if (type == 'date') {
						element.data("xdsoft_datetimepicker").setOptions(
						{
							minDate : minDate
						})
					} else if (type == 'time') {
						element.data("xdsoft_datetimepicker").setOptions(
						{
							minTime : minTime
						})
					} else {
						element.data("xdsoft_datetimepicker").setOptions(
						{
							minDate : minDate
						})
					}
				} else {
					var mobiscrollOption = element.data('mobiscrollOption');

					if (type == 'date') {
						mobiscrollOption.minDate = new Date(minDate);
					} else if (type == 'datetime') {
						mobiscrollOption.minDate = new Date(minDate);
					}
					element.mobiscroll(mobiscrollOption);
				}
			});
		}
		if (maxTo) {
			$(maxTo).change(function() {
				var maxDate = $(this).val();
				maxDate = getDateByStr(maxDate);
				var maxTime = $(this).val();
				maxTime = getTimeByStr(maxTime);

				if (core.isPC()) {

					if (type == 'date') {
						element.data("xdsoft_datetimepicker").setOptions(
						{
							maxDate : maxDate
						})
					} else if (type == 'time') {
						element.data("xdsoft_datetimepicker").setOptions(
						{
							maxTime : maxTime
						})
					} else {
						element.data("xdsoft_datetimepicker").setOptions(
						{
							maxDate : maxDate
						})
					}

				} else {
					var mobiscrollOption = element.data('mobiscrollOption');

					if (type == 'date') {
						mobiscrollOption.maxDate = new Date(maxDate);
					} else if (type == 'datetime') {
						mobiscrollOption.maxDate = new Date(maxDate);
					}
					element.mobiscroll(mobiscrollOption);
				}
			});
		}
	}
	function getDateByStr(arg1) {
		arg1 = arg1.replace(/\D/g, '');

		if (arg1.length >= 8) {
			return arg1.substring(0, 4) + "/" + arg1.substring(4, 6) + "/" + arg1.substring(6, 8);
		}
		return "";
	}
	function getTimeByStr(arg1) {
		arg1 = arg1.replace(/\D/g, '');
		if (arg1.length >= 12) {
			return arg1.substring(8, 10) + ":" + arg1.substring(10, 12);
		} else if (arg1.length == 4) {
			return arg1.substring(0, 2) + ":" + arg1.substring(2, 4);
		}
	}

	function initDatetimepicker(element, type) {
		element = $(element);
		var isreadonly = element.attr('isreadonly');
		isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
		if (isreadonly) {
			return;
		}
		bindDatetimepicker(element, type);
		var format = element.attr('format');
		var min = element.attr('min');
		var max = element.attr('max');
		var minTime = false;
		var minDate = false;
		var maxTime = false;
		var maxDate = false;
		var datetimepickerOption =
		{
			lang : 'ch',
			format : format,
			minDate : minDate,
			scrollMonth : true,
			scrollTime : true,
			scrollInput : false,
			maxDate : maxDate,
			validateOnBlur : false,
			onChangeDateTime : function() {
				element.change();
			}
		};
		// minTo和maxTo值改变的情况下
		var mobiscrollOption =
		{
			theme : 'android-ics light', // 皮肤样式 //皮肤其他参数【android-ics
			// light】【android-ics】【ios】【jqm】【sense-ui】
			display : 'modal', // 显示方式 【modal】【inline】【bubble】【top】【bottom】
			mode : 'scroller', // 操作方式【scroller】【clickpick】【mixed】
			dateFormat : 'yy-mm-dd',
			timeFormat : 'HH:ii',
			lang : 'zh',
			showNow : true,
			nowText : "现在",
			preset : 'date', // date time datetime
			setText : '确定', // 确认按钮名称
			cancelText : '取消',// 取消按钮名称
			dateOrder : 'yymmdd', // 面板中日期排列格式
			dayText : '日',
			monthText : '月',
			yearText : '年', // 面板中年月日文字
			hourText : '时',
			minuteText : '分' // 面板中年月日文字
		};
		if (!core.isPC()) {
			element.focus(function() {
				element.blur();
				return false;
			});
		}
		if (type == 'datetime') {
			mobiscrollOption.preset = 'datetime';
			if (core.isEmpty(format)) {
				format = "Y-m-d H:i";
			}
			if (min) {
				minDate = getDateByStr(min);
			}
			if (max) {
				maxDate = getDateByStr(max);
			}
			if (minDate) {
				mobiscrollOption.minDate = new Date(minDate);
			}
			if (maxDate) {
				mobiscrollOption.maxDate = new Date(maxDate);
			}
			var value = element.val();
			value = core.formatDatetime(value);
			element.val(value);
			datetimepickerOption.minDate = minDate;
			datetimepickerOption.maxDate = maxDate;
			datetimepickerOption.format = format;
		} else if (type == 'time') {
			mobiscrollOption.preset = 'time';
			if (core.isEmpty(format)) {
				format = "H:i";
			}
			if (min) {
				minTime = getTimeByStr(min);
			}
			if (max) {
				maxTime = getTimeByStr(max);
			}
			var value = element.val();
			value = core.formatDatetime(value);
			element.val(value);
			datetimepickerOption.format = format;
			datetimepickerOption.minTime = minTime;
			datetimepickerOption.maxTime = maxTime;
			datetimepickerOption.showMeridian = false;
			datetimepickerOption.showSeconds = true;
			datetimepickerOption.datepicker = false;
		} else if (type == 'date') {
			var value = element.val();
			value = core.formatDatetime(value);
			element.val(value);
			mobiscrollOption.date = 'date';
			var format = element.attr('format');
			if (core.isEmpty(format)) {
				format = "Y-m-d";
			}
			if (min) {
				minDate = getDateByStr(min);
			}
			if (max) {
				maxDate = getDateByStr(max);
			}
			if (minDate) {
				mobiscrollOption.minDate = new Date(minDate);
			}
			if (maxDate) {
				mobiscrollOption.maxDate = new Date(maxDate);
			}

			datetimepickerOption.format = format;
			datetimepickerOption.minDate = minDate;
			datetimepickerOption.maxDate = maxDate;
			datetimepickerOption.timepicker = false;
			datetimepickerOption.showMeridian = false;
			datetimepickerOption.showSeconds = false;
		}
		if (core.isPC()) {
			element.datetimepicker(datetimepickerOption);
			element.change(function() {
				var value = $(this).val();
				value = core.formatDatetime(value);
				$(this).val(value);

			});
		} else {
			element.mobiscroll(mobiscrollOption);
			element.data('mobiscrollOption', mobiscrollOption);
		}

	}
	core.element.initDatetime = function(content) {
		content = content || $('body');
		var datetimeelements = $(content).find('.inputtype-datetime');
		var timeelements = $(content).find('.inputtype-time');
		var dateelements = $(content).find('.inputtype-date');
		if (datetimeelements.length > 0 || timeelements.length > 0 || dateelements.length > 0) {
			loadDatetimepicker(function() {
				$(datetimeelements).each(function(index, element) {

					if (core.element.isInited(element, 'inputtype-datetime')) {
						return;
					}
					initDatetimepicker(element, "datetime");
				});
				$(timeelements).each(function(index, element) {

					if (core.element.isInited(element, 'inputtype-time')) {
						return;
					}
					initDatetimepicker(element, "time");
				});
				$(dateelements).each(function(index, element) {

					if (core.element.isInited(element, 'inputtype-date')) {
						return;
					}
					initDatetimepicker(element, "date");
				});
			});
		}

	}
	core.element.initTag = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-tag');

		if (elements.length < 1) {
			return;
		}
		core.plugins.load("tags_input", function() {

			elements.each(function(index, element) {
				element = $(element);

				if (core.element.isInited(element, 'inputtype-tag')) {
					return;
				}
				var isreadonly = element.attr('isreadonly');
				isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
				if (isreadonly) {
					return;
				}
				element.tagsInput(
				{
					width : 'auto',
					onAddTag : function(tag) {
						$(this).val(this.value);
						$(this).change();
					},
					onRemoveTag : function(tag) {
						$(this).val(this.value);
						$(this).change();
					}
				});

			});
		});
	}
	core.element.initSwitch = function(content) {
		content = content || $('body');

		var elements = $(content).find('.inputtype-switch');
		if (elements.length > 0) {
			core.plugins.load("bootstrap_switch", function() {
				elements.each(function(index, element) {

					if (core.element.isInited(element, 'inputtype-switch')) {
						return;
					}

					element = $(element);
					var isreadonly = element.attr('isreadonly');
					isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
					if (isreadonly) {
						return;
					}
					// var height = element.parent().height();
					// element.parent().css('min-height', height);
					// element.parent().css('min-height', 53);
					element.hide();
					var value = element.attr("value");
					if (core.isEmpty(element.attr("data-size"))) {
						element.attr('data-size', 'mini');
					}
					// if(core.isEmpty(element.attr("data-on-color"))){
					// element.attr('data-on-color', 'warning');
					// }
					// if(core.isEmpty(element.attr("data-off-color"))){
					// element.attr('data-off-color', 'danger');
					// }
					// if(core.isEmpty(element.attr("data-off-color"))){
					// element.attr('data-off-color', 'danger');
					// }
					if (core.isEmpty(element.attr("data-label-text"))) {
						// element.attr('data-label-text', '&nbsp;');
					}
					element.attr('data-wrapper-class', 'yellow');
					if (value != null && (value == 'true' || value == '1')) {
						element.attr("checked", "checked");
					}
					element.attr('isswitch', true);
					element.attr('type', 'checkbox');
					var bootstrapSwitch = element.bootstrapSwitch();
					element.data('bootstrapSwitch', bootstrapSwitch);
					element.on('switchChange.bootstrapSwitch', function(e, state) {
						element.val(state);
						element.change();
					});
				});

			});
		}
	}
	core.element.initMoveTool = function(content) {
		content = content || $('body');

		var moves = $(content).find('.core-move-tool');
		if (moves.length > 0) {
			core.plugins.load("draggabilly", function() {
				$(moves).each(function(index, move) {
					$(move).draggabilly(
					{
						handle : '.handle'
					});
				});
			});
		}

	}

	var sortableindex = 1;
	core.element.initSortable = function(content) {
		content = content || $('body');

		var sortables = $(content).find('.core-need-init-sortable');
		if (sortables.length > 0) {
			core.plugins.load("jquery_sortable", function() {

				$(sortables).each(function(index, sortable) {
					sortable = $(sortable);
					sortableindex++;
					var thisindex = sortableindex;
					var sortable_one = sortable.attr('sortable-one');
					var ones = sortable.find(sortable_one);
					if (ones.length < 0) {
						return;
					}
					sortable.attr('sortableindex', thisindex);
					sortable.sortable(
					{
						opacity : 0.35,
						update : function(e, t) {
							var tablename = sortable.attr('tablename');
							var tableid = sortable.attr('tableid');
							var sequencecolumnname = sortable.attr('sequencecolumnname');
							var primarykeycolumnname = sortable.attr('primarykeycolumnname');
							sequencecolumnname = sequencecolumnname || 'sequence';
							var idstr = '';
							ones = $("[sortableindex=" + thisindex + "]").find(sortable_one);
							ones.each(function(index, one) {
								idstr += $(one).attr('core-recordid') + ",";
								$(one).find('[name="' + sequencecolumnname + '"]').val(index + 1);
							});
							if (((tablename != null && tablename != '') || (tableid != null && tableid != '')) && idstr != null && idstr != '') {
								var data = {};
								if (tablename != null && tablename != '') {
									data.tablename = tablename;
								}
								if (tableid != null && tableid != '') {
									data.tableid = tableid;
								}
								data.primarykeycolumnname = primarykeycolumnname;
								data.sequencecolumnname = sequencecolumnname;
								data.idstr = idstr;
								var action = "core/data/sortable.data";
								core.POST(action, data, 'json', function(o) {
									if (sortable.data('sortableChange')) {
										sortable.data('sortableChange')(e, t);
									}
								});
							} else {
								if (sortable.data('sortableChange')) {
									sortable.data('sortableChange')(e, t);
								}
							}
						}
					});

				});

			});
		}
	}
	core.element.initLocation = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-location');

		elements.each(function(index, element) {
			element = $(element);

			if (core.element.isInited(element, 'inputtype-location')) {
				return;
			}

			var isreadonly = element.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;

			var id = 'map_' + element.attr('id');

			var mapPanel = $('<div style="width: 100%;height: 300px;margin-bottom: 10px;">这里插入百度地图</div>');
			var utilPanel = $('<div style="width: 100%;height: 50px;" class="col-sm-12"></div>');
			utilPanel.append('<label class=" control-label">检索：</label>');
			utilPanel.append('<input style="display: initial;width: 150px;" class="searchtext form-control" placeholder="输入检索信息" success="true">');
			utilPanel.append('<a style="margin-left: 5px;margin-top: -5px;" class="searchbtn btn btn-xs vd_bg-green vd_white" >检索</a>');
			utilPanel.append('<span class="vd_red">&nbsp;&nbsp;点击地图即可设定位置哦！</span>');
			utilPanel.append('<span class="vd_green">&nbsp;&nbsp;当前选中:</span>');
			utilPanel.append('<span class="vd_blue thisaddress">&nbsp;&nbsp;</span>');
			utilPanel.find('.searchbtn').attr('mapid', id);
			mapPanel.attr('id', id);
			element.before(utilPanel);
			element.before(mapPanel);
			// 百度地图API功能
			maps[id] = new BMap.Map(id); // 创建Map实例
			maps[id].utilPanel = utilPanel;
			maps[id].mapid = id;
			var locationinfo = element.val();
			if (locationinfo != null && locationinfo != '' && locationinfo.indexOf(',') > 0) {
				var locationinfos = locationinfo.split(',');
				var point = new BMap.Point(locationinfos[0], locationinfos[1]);
				maps[id].centerAndZoom(point, 15);
				point.mapid = maps[id].mapid;
				showLocationInfo(point, maps[id].utilPanel.find('.thisaddress'));
			} else {
				maps[id].centerAndZoom('南京', 15);// 初始化地图,设置中心点坐标和地图级别
			}

			maps[id].enableScrollWheelZoom(true);// 开启鼠标滚轮缩放
			maps[id].addEventListener("click", function(e) {
				var locationinfo = e.point.lng + "," + e.point.lat;

				if (!isreadonly) {
					element.val(locationinfo);
				}
				var point = e.point;
				point.mapid = this.mapid;
				showLocationInfo(point, this.utilPanel.find('.thisaddress'));
			});
			utilPanel.find('.searchbtn').click(function() {
				var mapid = $(this).attr('mapid');
				var searchtext = $(this).parent().find('.searchtext').val();
				if (searchtext != null && searchtext != '') {
					var map = maps[mapid];
					var local = new BMap.LocalSearch(map,
					{
						renderOptions :
						{
							map : map
						}
					});
					local.search(searchtext);
				}

			});
		});

	}
	function showLocationInfo(point, thisaddress) {
		var geoc = new BMap.Geocoder();
		geoc.getLocation(point, function(rs) {
			var addComp = rs.addressComponents;
			var addressinfo = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
			thisaddress.text(addressinfo);
		});

		var mapid = point.mapid;
		maps[mapid].clearOverlays();
		var marker = new BMap.Marker(point); // 创建标注
		maps[id].addOverlay(marker); // 将标注添加到地图中
		// marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

	}

})(window, core);
})(window, jQuery);