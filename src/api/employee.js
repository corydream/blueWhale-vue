import { ajax } from './../utils';

// 获取用户权限接口
export const manageEntry = ajax.fetchJSONByPost('/manager/display')

// 用户管理列表
export const userList = ajax.fetchJSONByPost('/user/select/list')

// 查询部门下拉列表
export const departList = ajax.fetchJSONByGet('/user/all/departments')

// 用户管理--》新增用户信息
export const saveuser = ajax.fetchJSONByPost('/user/addUser')

//用户管理--》更新用户信息
export const updateuser = ajax.fetchJSONByPost('/user/upsert')

// 用户组列表
export const grouplist = ajax.fetchJSONByGet('/group/list/groups')

// 删除用户组中用户
export const groupuserdel = ajax.fetchJSONByPost('/group/do/remove')

// 新建用户组
export const addgroup = ajax.fetchJSONByPost('/group/upsert/newGroup')

// 用户组=》新增用户的用户列表
export const newuserlist = ajax.fetchJSONByGet('/group/update/display')

// 添加用户进用户组
export const adduserToGroup = ajax.fetchJSONByPost('/group/do/update')

// 更新用户组信息
export const updateuserGroup = ajax.fetchJSONByPost('/group/update')

// 删除用户组
export const delgroup = ajax.fetchJSONByPost('/group/do/delete')