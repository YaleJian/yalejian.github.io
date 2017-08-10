package com.yale.entity.vo;

import com.yale.constant.CodeConstants;
import com.yale.constant.MsgConstants;

/**
 * 状态对象
 */
public class Status {

    /**
     * 状态码,默认为成功
     */
    private String resCode = CodeConstants.SUCCESS;

    /**
     * 状态信息，默认为成功
     */
    private String resMsg = MsgConstants.SUCCESS;

    /**
     * 内容，默认为空
     */
    private Object resContent;

    public String getResCode() {
        return resCode;
    }

    public void setResCode(String resCode) {
        this.resCode = resCode;
    }

    public String getResMsg() {
        return resMsg;
    }

    public void setResMsg(String resMsg) {
        this.resMsg = resMsg;
    }

    public Object getResContent() {
        return resContent;
    }

    public void setResContent(Object resContent) {
        this.resContent = resContent;
    }

    @Override
    public String toString() {
        return "Status{" +
                "resCode='" + resCode + '\'' +
                ", resMsg='" + resMsg + '\'' +
                ", resContent=" + resContent +
                '}';
    }
}
