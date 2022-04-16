export const getAllPuskesmas = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskes?search`, {
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
  return data.data.puskes;
}

export const getPuskesmas = async (data) => {
  const query = new URLSearchParams(data).toString();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskes?${query}`, {
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
  console.log(response);
  if (!response) return false;
  return response.data.puskes;
}

export const getPuskesmasDetail = async (id) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskes/${id}`, {
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
  return data.data.puskes;
}

export const createPuskesmas = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
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
  return response;
}

export const updatePuskesmas = async (id, data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskes/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({
      _method: 'PUT',
      ...data
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

export const deletePuskesmas = async (id) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskes/${id}`, {
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