import { employee } from './../api'
import { createAjaxAction } from './../utils'

export const entry = createAjaxAction(employee.manageEntry)

export const userListData = createAjaxAction(employee.userList)

export const departmentListData = createAjaxAction(employee.departList)

export const saveuser = createAjaxAction(employee.saveuser)

export const updateuser = createAjaxAction(employee.updateuser)

export const grouplist = createAjaxAction(employee.grouplist)

export const groupUserdel = createAjaxAction(employee.groupuserdel)

export const addgroup = createAjaxAction(employee.addgroup)

export const newuserlist = createAjaxAction(employee.newuserlist)

export const adduserToGroup = createAjaxAction(employee.adduserToGroup)

export const updateuserGroup = createAjaxAction(employee.updateuserGroup)

export const delgroup = createAjaxAction(employee.delgroup)