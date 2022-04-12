export const getManifestDinkes = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dinkes/v1/manifest`, {
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
  if(!data) return false;
  return data.data.manifest;
}