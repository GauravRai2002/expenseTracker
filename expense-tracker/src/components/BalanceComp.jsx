import React, { useEffect, useRef } from 'react'

function BalanceComp({balance,limit}) {
    const balanceRef = useRef()
    useEffect(()=>{
        // console.log(balanceRef.current.classList)
        if(balance>=limit){
            balanceRef.current.classList.remove('text-red-500')
            balanceRef.current.classList.add('text-green-500')
        } else{
            balanceRef.current.classList.remove('text-green-500')
            balanceRef.current.classList.add('text-red-500')
        }
    },[balance,limit])
    return (
        <>
            <div className="card w-5/6 md:w-2/5 bg-base-300 shadow-xl py-2">
                <div className="card-body flex-row items-center justify-evenly">
                    <div className="card-title w-1/2 items-center justify-center text-center">Balance :</div>
                    <div className='w-1/2 flex items-center justify-center gap-3'>

                        <svg fill="#d6d6d6" width="20px" height="20px" viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path></g></svg>
                        <div ref={balanceRef} className='font-bold text-2xl'>{balance}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BalanceComp