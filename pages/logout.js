import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');
    router.push('/');
  })

  return null;
}

export default Logout;