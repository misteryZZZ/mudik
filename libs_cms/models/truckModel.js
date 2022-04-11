export const getTruck = async (page = 1, city = '') => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/truck?page=${page}&city=${city}`, {
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
  return data.data.truck;
}

export const getTruckDetail = async (id) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/truck/${id}`, {
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
  return data.data.truck;
}

export const createTruck = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/truck`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({
      driver_id: data.driverID,
      trip_id: data.tripID,
      code: data.code,
      no_police: data.no_police,
      quota: data.quota,
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

export const updateTruck = async (id, data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/truck/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({
      _method: 'PUT',
      driver_id: data.driverID,
      trip_id: data.tripID,
      code: data.code,
      no_police: data.no_police,
      quota: data.quota,
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

export const deleteTruck = async (id) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/truck/${id}`, {
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