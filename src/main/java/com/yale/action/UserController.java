package com.yale.action;

import com.alibaba.fastjson.JSONObject;
import com.yale.constant.CodeConstants;
import com.yale.constant.MsgConstants;
import com.yale.constant.VariateConstants;
import com.yale.entity.vo.Status;
import com.yale.entity.User;
import com.yale.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by yalejian on 2017/2/6.
 */
@Controller
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;

    Logger logger = LogManager.getLogger(LogManager.ROOT_LOGGER_NAME);

    @RequestMapping("getUser")
    public ModelAndView getUser(HttpServletRequest request) {
        Status status = new Status();
        int userId = Integer.parseInt(request.getParameter("id"));
        JSONObject jsonData = new JSONObject();
        jsonData.put("page", 1);

        try {
            User user = this.userService.getUserById(userId);
            logger.debug(user);
            jsonData.put("user", user);
            status.setResContent(jsonData);
        } catch (Exception e) {
            status.setResContent(e.getStackTrace());
            status.setResCode(CodeConstants.FAIL);
            status.setResMsg(MsgConstants.FAIL);
            e.printStackTrace();
        }

        return new ModelAndView("jsonView", VariateConstants.RESULT_DATA, status);
    }

}
