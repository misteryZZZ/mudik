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
  return data.data.puskesmas;
}

export const getPuskesmas = async (data) => {
  const query = new URLSearchParams(data).toString();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskesmas?${query}`, {
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
  return response.data.puskesmas;
}

export const getPuskesmasDetail = async (id) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskesmas/${id}`, {
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
  return data.data.puskesmas;
}

export const createPuskesmas = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskesmas`, {
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

export const updatePuskesmas = async (id, data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskesmas/${id}`, {
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

export const deletePuskesmas = async (id) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/v1/puskesmas/${id}`, {
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