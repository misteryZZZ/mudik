export const getPassengerCount = async (type) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/passenger/count?type=${type}`, {
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
  return data.data.count;
}

export const getPassengerManifest = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/passenger/manifest`, {
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
  return data.data.transaction;
}

export const verifPassenger = async (id) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/passenger/accept`, {
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