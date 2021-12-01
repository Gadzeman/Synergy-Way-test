import { useHttp } from '../hooks/http.hook';

const GetUsers = async () => {
  const { request } = useHttp();
  try {
    return await request('/users');
  } catch (e) {
    console.error(e);
  }
}
const PostUser = async ( userBody ) => {
  const { request } = useHttp()
  try {
    return await request('/users', 'POST', userBody)
  } catch (e) {
    console.error(e);
  }
}
const PutUser = async ( userId, userBody ) => {
  const { request } = useHttp();
  try {
    return await request(`/users/${userId}`, 'PUT', userBody)
  } catch (e) {
    console.error(e);
  }
}
const DeleteUser = async ( userId ) => {
  const { request } = useHttp();
  try {
    return await request(`/users/${userId}`, 'DELETE')
  } catch (e) {
    console.error(e);
  }
}

export {
  GetUsers,
  PostUser,
  PutUser,
  DeleteUser
}
