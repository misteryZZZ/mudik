// import axios from 'axios'
/*export const isLogedin = async () => {
  let data = false;
  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/profile`, {
    headers: {'Authorization': `Bearer ${localStorage.token}`}
  })
  .then(response => {
    data = response.data
  })
  return data;
}*/

export const isLogedin = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/profile`, {
    headers: {'Authorization': `Bearer ${localStorage.token}`}
  })
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      return false;
    }
  })
  .catch((err) => {
    console.warn(err)
    return false;
  })
}