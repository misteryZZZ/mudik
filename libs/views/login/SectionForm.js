import { useState } from 'react'
import { useRouter } from 'next/router'

import { doLogin } from '../../models/userModel'

import { InputWithLabel } from '../../components/input'
import { Button } from '../../components/button'

export const SectionForm = () => {
  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    setLoading(true);

    const response = await doLogin(email, password);
    console.log(response);
    if (response && response.success) {
      localStorage.setItem("token", response.data.access_token);
      router.push('/')
    } else {
      // jika login gagal
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col md:w-1/2 bg-maincolor p-6">
      <div className="flex gap-6">
        <img className="w-16" src="/images/pemprov-dki.png" alt="logo pemprov dki"/>
        <img className="w-16" src="/images/dishub-dki.png" alt="logo dishub dki"/>
      </div>
      <div className="grow flex items-center justify-center py-16">
        <form className="min-w-[400px] px-8"
        onSubmit={e => handleSubmit(e, email, password)}>
          <h1 className="text-3xl font-semibold text-white mb-12">Login</h1>
          <InputWithLabel label="Email" name="email" onChange={e => setEmail(e.target.value)} />
          <InputWithLabel label="Password" name="password" type="password" onChange={e => setPassword(e.target.value)} />
          <a href="#">
            <p className="text-right text-white text-sm w-full mb-6">Lupa pasword?</p>
          </a>
          <Button text="Login" type="submit" isLoading={isLoading}/>
        </form>
      </div>
    </div>
  )
}

export default SectionForm;