import { useRouter } from 'next/router'

const Logout = () => {
  const router = useRouter();

  localStorage.removeItem('token');

  router.push('/login');

  return null;
}

export default Logout;