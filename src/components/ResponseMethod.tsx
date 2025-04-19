export const GetMethod = async (link: string) => {
    return await fetch(link, { method: 'GET' })
      .then((res) => res.json()) //json方式でデータを受け取る
      .then((data) => {
        console.log('data:', data)
        return data
      })
  
      .catch((err) => console.error('Error fetching data:', err))
  }
  
  export const PostMethod = (link: string, data:string) => {
    return fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json()) //json方式でデータを受け取る
      .then((data) => {
        console.log('data:', data)
        return data
      })
  
      .catch((err) => console.error('Error fetching data:', err))
  }