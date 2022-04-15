export const getAllDriver = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/driver?all=true`, {
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
  console.log(data);
  if (!data) return false;
  return data.data.driver;
}

export const getDriver = async (data) => {
  const query = new URLSearchParams(data).toString();
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/driver?${query}`, {
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
  console.log(data);
  if (!data) return false;
  return data.data.driver;
}

export const getDriverDetail = async (id) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/driver/${id}`, {
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
  if (!data) return false;
  return data.data.driver;
}

export const createDriver = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/driver`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: data
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
  return response;
}

export const updateDriver = async (id, data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/driver/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: data
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
  return response;
}

export const deleteDriver = async (id) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/driver/${id}`, {
    method: 'DELETE',
    headers: {'Authorization': `Bearer ${localStorage.token}`}
  })
  .then(response => {
    if(response.ok){
      return response.json();
    } else {
      return false;
    }
  })
  .catch((err) => {
    console.warn(err)
    return false;
  })
  return data;
}