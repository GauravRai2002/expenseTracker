import React, { useRef } from 'react'

function AddTransaction({ data }) {
    const uuid = data.uuid
    const expendRemarkRef = useRef()
    const expendAmountRef = useRef()
    const AddRemarkRef = useRef()
    const AddAmountRef = useRef()


    const handleAddExpense = (e) => {
        e.preventDefault()
        if (expendAmountRef.current.value <= 0 || expendRemarkRef.current.value == ' ' || expendAmountRef.current.value == undefined || expendRemarkRef.current.value == undefined) {
            console.log('please fill the Values')
            expendAmountRef.current.value = 0
            expendRemarkRef.current.value = ''
            return
        }
        try {
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '/' + mm + '/' + yyyy;
            const currentdata = {
                'amount': (-1 * parseInt(expendAmountRef.current.value)),
                'remark': `${expendRemarkRef.current.value}`,
                'transaction_type': -1,
                'date': `${formattedToday}`
            }
            fetch(`https://ex-spend-backend.vercel.app/transaction/${uuid}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentdata)
            }).then(respdata => respdata.json()).then(response => {
                // console.log(res)
                const newData = data.lower_limit ? {
                    'uuid': uuid,
                    'name': data.name,
                    'balance': response.newBalance,
                    'lower_limit': data.lower_limit,
                    'balance_history': response.balance_history,
                    'remarks_history': response.remarks_history
                } : {
                    'uuid': uuid,
                    'name': data.name,
                    'balance': response.newBalance,
                    'balance_history': response.balance_history,
                    'remarks_history': response.remarks_history
                }

                console.log(newData)

                fetch(`https://ex-spend-backend.vercel.app/updateAccount/${uuid}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                }).then(respdata => respdata.json()).then(res => {
                    console.log(res)
                    window.location.reload(false)
                })
            })
        } catch (e) {
            console.log(e)
        }


        document.getElementById('addExpense').close()
        expendAmountRef.current.value = 0
        expendRemarkRef.current.value = ''
    }

    const handleAddMoney = (e) => {
        e.preventDefault()
        if (AddAmountRef.current.value <= 0 || AddRemarkRef.current.value == ' ' || AddAmountRef.current.value == undefined || AddRemarkRef.current.value == undefined) {
            console.log('please fill the Values')
            AddAmountRef.current.value = 0
            AddRemarkRef.current.value = ''
            return
        }
        try {
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '/' + mm + '/' + yyyy;
            const currentdata = {
                'amount': parseInt(AddAmountRef.current.value),
                'remark': `${AddRemarkRef.current.value}`,
                'transaction_type': 1,
                'date': `${formattedToday}`
            }
            fetch(`https://ex-spend-backend.vercel.app/transaction/${uuid}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentdata)
            }).then(respdata => respdata.json()).then(response => {
                // console.log(res)
                const newData = data.lower_limit ? {
                    'uuid': uuid,
                    'name': data.name,
                    'balance': response.newBalance,
                    'lower_limit': data.lower_limit,
                    'balance_history': response.balance_history,
                    'remarks_history': response.remarks_history
                } : {
                    'uuid': uuid,
                    'name': data.name,
                    'balance': response.newBalance,
                    'balance_history': response.balance_history,
                    'remarks_history': response.remarks_history
                }

                console.log(newData)

                fetch(`https://ex-spend-backend.vercel.app/updateAccount/${uuid}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                }).then(respdata => respdata.json()).then(res => {
                    console.log(res)
                    window.location.reload(false)
                })
            })



        } catch (e) {
            console.log(e)
        }
        document.getElementById('addMoney').close()
        AddAmountRef.current.value = 0
        AddRemarkRef.current.value = ''
    }


    return (
        <>
            <div className="card w-5/6 md:w-2/5 bg-base-300 shadow-xl">
                <div className="card-body flex-row items-center justify-evenly">
                    <button onClick={() => document.getElementById('addExpense').showModal()} className="btn btn-error btn-outline font-bold md:text-xl text-red-500">ADD EXPENSE</button>
                    <button onClick={() => document.getElementById('addMoney').showModal()} className="btn btn-success btn-outline font-bold md:text-xl text-green-500">ADD MONEY</button>
                </div>
            </div>

            <dialog id="addExpense" className="modal">
                <div className="modal-box">
                    <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Remark :</span>
                            </label>
                            <input ref={expendRemarkRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Amount :</span>
                            </label>
                            <input ref={expendAmountRef} type="number" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="modal-action">
                        <button onClick={handleAddExpense} className="btn btn-accent">Add</button>
                        <form method="dialog">
                            <button className="btn btn-error">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>



            <dialog id="addMoney" className="modal">
                <div className="modal-box">
                    <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Remark :</span>
                            </label>
                            <input ref={AddRemarkRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Amount :</span>
                            </label>
                            <input ref={AddAmountRef} type="number" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="modal-action">
                        <button onClick={handleAddMoney} className="btn btn-accent">Add</button>
                        <form method="dialog">
                            <button className="btn btn-error">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>


        </>
    )
}

export default AddTransaction