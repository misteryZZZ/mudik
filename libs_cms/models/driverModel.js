export const getDriver = async (page = 1, city = '') => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/driver?page=${page}&city=${city}`, {
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
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({
      name: data.name,
      type: data.type,
      vehicle_id: data.vehicle_id,
      image: null
    })
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
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({
      _method: 'PUT',
      name: data.name,
      type: data.type,
      vehicle_id: data.vehicle_id,
      image: null
    })
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