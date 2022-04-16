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

export const getPassengerManifest = async (data) => {
  const query = new URLSearchParams(data).toString();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/passenger/manifest?${query}`, {
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
  return response.data.transaction;
}

export const verifPassenger = async (data) => {
  console.log(data);
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/passenger/accept`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
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