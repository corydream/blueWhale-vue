import { ajax } from './../utils';

// 获取数据模型
export const datamodel = ajax.fetchJSONByGet('/model/query')

// 获取数据表
export const datatable = ajax.fetchJSONByGet('/model/query/userOrGroup')

// 获取数据模型用户列表 
export const newuserlist = ajax.fetchJSONByGet('/model/update/user/display')

// 获取数据模型用户组列表
export const newgrouplist = ajax.fetchJSONByGet('/model/update/group/display')

// 保存新增用户/用户组
export const addUserGroup = ajax.fetchJSONByPost('/model/add/userOrGroup')

// 删除用户/用户组
export const delUserGroup = ajax.fetchJSONByPost('/model/delete')

// 数据看板左侧展示
export const boardList = ajax.fetchJSONByGet('/board/query/boards')

// 展示数据看板下的用户信息
export const boardUserlist = ajax.fetchJSONByPost('/board/list/users')

//展示看板权限用户列表
export const boardUserShow = ajax.fetchJSONByGet('/board/update/user/display')

//展示看板权限用户组列表
export const boardGroupShow = ajax.fetchJSONByGet('/board/update/group/display')

// 存储用户的权限信息
export const saveBoard = ajax.fetchJSONByPost('/board/add/user/board')

//更新看板用户权限
export const updateBoard = ajax.fetchJSONByPost('/board/update/permission')

//点击用户组显示里面的用户信息
export const groupIntoUser = ajax.fetchJSONByPost('/board/group/users')

//删除看板里的用户/用户组
export const delBoardUser = ajax.fetchJSONByPost('/board/remove/user/board')
