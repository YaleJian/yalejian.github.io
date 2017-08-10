package com.yale.service.impl;

import com.yale.dao.UserMapper;
import com.yale.entity.User;
import com.yale.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("userService")
public class UserServiceImpl implements UserService {
	@Resource
	private UserMapper userDao;
	@Override
	public User getUserById(int userId) {
		return this.userDao.selectByPrimaryKey(userId);
	}


}
