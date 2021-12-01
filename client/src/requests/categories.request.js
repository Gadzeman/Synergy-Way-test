import { useHttp } from '../hooks/http.hook';

const GetCategories = async () => {
  const { request } = useHttp()
  try {
    return await request('/categories')
  } catch (e) {
    console.error(e)
  }
}

export {
  GetCategories
}
