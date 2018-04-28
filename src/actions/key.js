import { per } from './../api'
import { createAjaxAction } from './../utils'

export const dataModel = createAjaxAction(per.datamodel)

export const dataTable = createAjaxAction(per.datatable)

export const dataUser = createAjaxAction(per.newuserlist)

export const dataGroup = createAjaxAction(per.newgrouplist)

export const dataAdd = createAjaxAction(per.addUserGroup)

export const dataDel = createAjaxAction(per.delUserGroup)

export const boardList = createAjaxAction(per.boardList)

export const userList = createAjaxAction(per.boardUserlist)

export const boardUserShow = createAjaxAction(per.boardUserShow)

export const boardGroupShow = createAjaxAction(per.boardGroupShow)

export const saveBoard = createAjaxAction(per.saveBoard)

export const updateBoard = createAjaxAction(per.updateBoard)

export const groupIntoUser = createAjaxAction(per.groupIntoUser)

export const delBoardUser = createAjaxAction(per.delBoardUser)