import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function SignupForm() {
  const nameRef = useRef()
  const emailRef = useRef()
  const limitRef = useRef()
  const passwordRef = useRef()
  const balanceRef = useRef()
  const confirmPasswordRef = useRef()
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (passwordRef.current.value != confirmPasswordRef.current.value) return
    try {
      const uuid = await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      const BalanceHistory = []
      BalanceHistory.push(parseInt(balanceRef.current.value))
      const remarkHistory = ['Opening Balance']
      const data = {
        'uuid': `${uuid.user.uid}`,
        'name': `${nameRef.current.value}`,
        'balance': balanceRef.current.value,
        'lower_limit': limitRef.current.value,
        'balance_history': BalanceHistory,
        'remarks_history':remarkHistory
      }
      fetch('http://localhost:8000/account/new', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(data=>data.json()).then(res=>{
        console.log(res)
        navigate('/login')
      })
      
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className='my-auto flex items-center justify-evenly'>
      <form className='flex flex-col gap-8 w-full h-fit md:w-2/3  mx-auto border-2 border-teal-600 rounded-lg py-8 px-2 my-6'>
        <div className="font-bold text-white text-2xl text-center">Register</div>
        <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">User Name :</span>
            </label>
            <input ref={nameRef} type="text" placeholder="Type here" className="input input-bordered w-full" required />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email :</span>
            </label>
            <input ref={emailRef} type="text" placeholder="Type here" className="input input-bordered w-full" required />
          </div>
        </div>
        <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Set Warning Limit :</span>
            </label>
            <input ref={limitRef} type="number" placeholder="Type here" className="input input-bordered w-full" />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Current Balance :</span>
            </label>
            <input ref={balanceRef} type="number" placeholder="Type here" className="input input-bordered w-full" required />
          </div>
        </div>
        <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password :</span>
            </label>
            <input ref={passwordRef} type="password" placeholder="Type here" className="input input-bordered w-full" required />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Confirm Password :</span>
            </label>
            <input ref={confirmPasswordRef} type="password" placeholder="Type here" className="input input-bordered w-full" required />
          </div>
        </div>
        <button onClick={handleSignUp} className="w-full md:w-1/2 mx-auto btn btn-outline btn-accent mt-8">Sign Up</button>
        <Link className='text-center underline' to={'/login'}>Already have an account? Login Now!</Link>
      </form>
    </div>
  )
}

export default SignupForm