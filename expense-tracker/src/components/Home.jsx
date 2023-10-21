import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import BalanceComp from './BalanceComp'
import AddTransaction from './AddTransaction'
import TransactionComponent from './TransactionComponent'
import LineChart from './LineChart'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const [balanceData, setBalanceData] = useState({
        'uuid': '',
        'name': '',
        'balance': 0,
        'lower_limit': 0,
        'balance_history': [],
        'remarks_history':[]
    })
    const [transactionData, setTransactionData] = useState([])
    const uuid = localStorage.getItem('uuid')

    useEffect(() => {
        if(!localStorage.getItem('uuid')){
            navigate('/login')
        }
        try {
            fetch(`http://localhost:8000/balance/${uuid}`).then(data => data.json()).then(res => {
                setBalanceData(res)
            })
            fetch(`http://localhost:8000/transactions/${uuid}`).then(data => data.json()).then(res => {
                console.log(res)
                setTransactionData(res)
            })

        }catch(e){
            console.log(e)
        }
    }, [])

    return (
        <>
            <Navbar />

            <div className="flex flex-wrap items-center justify-center gap-6">
                <BalanceComp balance={balanceData.balance} limit={balanceData.lower_limit} />
                <AddTransaction data={balanceData} />
            </div>
            {<LineChart balanceHistory={balanceData.balance_history} remarks={balanceData.remarks_history}/>}
            <div className='my-6 flex flex-col items-center  justify-center gap-6 w-full' >
                {
                    transactionData.map((transaction,key)=>{
                        return <TransactionComponent transactionData={transaction} key={key}/>
                    })
                }
            </div>

        </>
    )
}

export default Home