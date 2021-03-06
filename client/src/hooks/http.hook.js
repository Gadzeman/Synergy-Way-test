export const useHttp = () => {
  const request = async ( url, method = 'GET', body = null, headers = {} ) => {
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-type'] = 'application/json';
      }

      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if ( !response.ok ) {
        window.alert(data.message)
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  return { request };
}
