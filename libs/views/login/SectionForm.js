import { useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'

import { InputWithLabel } from '../../components/input'
import { Button } from '../../components/button'

export const SectionForm = () => {
  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * menghandle ketika button login di klik,
   *
   * @param      {event}  e         event ketika button di klik
   * @param      {text}   email     The email
   * @param      {text}   password  The password
   */
  const handleSubmit = (e, email, password) => {
    e.preventDefault();

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/login`,{
      email: email,
      password: password
    })
    .then(response => {
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.access_token);
        router.push('/')
      }
      else {
        alert('gagal melakukan login')
      }
    })
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
          <InputWithLabel label="Email" onChange={e => setEmail(e.target.value)} />
          <InputWithLabel label="Password" type="password" onChange={e => setPassword(e.target.value)} />
          <a href="#">
            <p className="text-right text-white text-sm w-full mb-6">Lupa pasword?</p>
          </a>
          <Button text="Login" type="submit" />
        </form>
      </div>
    </div>
  )
}

export default SectionForm;