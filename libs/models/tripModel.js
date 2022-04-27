export const getTripCounting = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/trip/count`, {
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

export const getTripSummary = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/trip/summary`, {
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
  return response.data.summary;
}

export const getStatistic = async (data) => {
  const query = new URLSearchParams(data).toString()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/trip/statistic?${query}`, {
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
  return response.data.result;
}

export const getStatus = async (data) => {
  const query = new URLSearchParams(data).toString()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/status/vehicle?${query}`, {
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
  return response.data.status;
}