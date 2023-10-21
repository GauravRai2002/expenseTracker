import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

function LoginForm() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const handleLogin = async(e) => {
    e.preventDefault()

    try {
      localStorage.setItem('uuid', (await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)).user.uid)
      navigate('/')
    } catch (err) {
      console.log(err)

    }
  }
  const navigation = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('uuid')){
      navigation('/')
    }
  })
  return (
    <div className='w-screen my-16 flex items-center justify-evenly'>
      <form className='flex flex-col gap-8 w-full h-fit md:w-2/3  mx-auto border-2 border-teal-600 rounded-lg py-8 px-2 my-6'>
        <div className="font-bold text-white text-2xl text-center">Login</div>
        <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email :</span>
            </label>
            <input ref={emailRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password :</span>
            </label>
            <input ref={passwordRef} type="password" placeholder="Type here" className="input input-bordered w-full" />
          </div>
        </div>
        <button onClick={handleLogin} className="btn md:w-1/2 w-full mx-auto  btn-outline btn-accent mt-8">LOGIN</button>
        <Link className='text-center underline' to={'/signup'}>Don't have an account? Register Now!</Link>
      </form>
    </div>
  )
}

export default LoginForm