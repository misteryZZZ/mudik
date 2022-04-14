export const isLogedin = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/profile`, {
    mode: 'no-cors',
    headers: {'Authorization': `Bearer ${localStorage.token}`},
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
  return data.data.user;
}

export const doLogin = async (email, password) => {
  console.log(email, password);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/login`, {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    }
    else {
      alert('gagal melakukan login')
    }
  })
  .catch(error => {
    return {
      success: false,
      notification: {
        title: 'Eror',
        message: 'Gagal melakukan login'
      }
    }
  })
  return response
}