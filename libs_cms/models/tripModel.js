export const getTrip = async (page = 1, name = '') => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/trip?page=${page}&name=${name}`, {
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
  return data.data.trip;
}

export const getTripDetail = async (id) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/trip/${id}`, {
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
  return data.data.trip;
}

export const createTrip = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/trip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({
      _method: 'PUT',
      city_id: data.cityID,
      type: data.type,
      rute: [],
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

export const updateTrip = async (id, data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/trip/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({
      _method: 'PUT',
      city_id: data.cityID,
      type: data.type,
      rute: [],
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

export const deleteTrip = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/trip/${id}`, {
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
  return response;
}