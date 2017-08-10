/**
 * Created by yalejian on 2017/3/30.
 */


var yale = yale || {};//先查找全局是否有定义yale，如果有定义则赋值为{}，防止被覆盖
yale.home = yale.home || {};

yale.home = {
  init : function(){
      yale.home.showUser()
  },
  showUser : function () {
      $.ajax({
          type: "POST",
          url: "../../user/getUser?id=1",
          data: {id: "d"},
          success: function (res) {
              console.log(res);
              if (res.data.resCode === '10000') {
                  $("#user").html(res.data.resContent.user.userName);
              }else if(res.data.resCode === '20000'){
                  alert("失败");
              }

          }
      });
  }
};

