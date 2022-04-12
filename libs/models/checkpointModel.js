export const getCheckpoint = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/checkpoint?search`, {
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
  return data.data.result;
}