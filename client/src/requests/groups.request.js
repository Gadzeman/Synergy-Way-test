import { useHttp } from '../hooks/http.hook';

const GetGroups = async () => {
  const { request } = useHttp();
  try {
    return await request('/groups')
  } catch (e) {
    console.error(e)
  }
}
const GetGroup = async (groupId) => {
  const { request } = useHttp();
  try {
    return await request(`/groups/${groupId}`)
  } catch (e) {
    console.error(e);
  }
}
const PostGroup = async (groupBody) => {
  const { request } = useHttp();
  try {
    return await request('/groups', 'POST', groupBody)
  } catch (e) {
    console.error(e)
  }
}
const PutGroup = async (groupId, groupBody) => {
  const { request } = useHttp();
  try {
    return await request(`/groups/${groupId}`, 'PUT', groupBody)
  } catch (e) {
    console.error(e)
  }
}
const DeleteGroup = async (groupId) => {
  const { request } = useHttp();
  try {
    return await request(`/groups/${groupId}`, 'DELETE')
  } catch (e) {
    console.error(e)
  }
}
const AddUserToGroup = async (groupId, userEmail) => {
  const { request } = useHttp();
  try {
    return await request(`/groups/add/user/${groupId}`, 'PUT', userEmail);
  } catch (e) {
    console.error(e)
  }
}
const AddCategoryToGroup = async (groupId, categoryName) => {
  const { request } = useHttp();
  try {
    return await request(`/groups/add/category/${groupId}`, 'PUT', categoryName)
  } catch (e) {
    console.error(e)
  }
}
const DeleteUserFromGroup = async (groupId, userEmail) => {
  const { request } = useHttp();
  try {
    return await request(`/groups/delete/user/${groupId}`, 'DELETE', userEmail)
  } catch (e) {
    console.error(e)
  }
}
const DeleteCategoryFromGroup = async (groupId, categoryName) => {
  const { request } = useHttp();
  try {
    return await request(`/groups/delete/category/${groupId}`, 'DELETE', categoryName)
  } catch (e) {
    console.error(e)
  }
}

export {
  GetGroups,
  PostGroup,
  PutGroup,
  DeleteGroup,
  AddUserToGroup,
  AddCategoryToGroup,
  DeleteUserFromGroup,
  DeleteCategoryFromGroup,
  GetGroup
}
