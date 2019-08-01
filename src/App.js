import React, { useState, useEffect } from 'react'
import uuid from 'uuid/v4'

import "./App.css"
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'

// Dummy data
// const initialExpenses = [
//     {id:uuid(), charge:"rent", amount: 1600},
//     {id:uuid(), charge:"car payment", amount: 400},
//     {id:uuid(), charge:"credit card bill", amount: 1200}
// ]
//console.log(initialExpense)

const initialExpenses = localStorage.getItem('expenses') 
? JSON.parse(localStorage.getItem("expenses")) 
: []

function App() {
    // console.log(useState())
    // To access the state
    // const result = useState(initialExpenses)
    // const expenses = result[0]
    // const setExpenses = result[1]
    // console.log(expenses)
    // console.log(setExpenses)

    // Create variables state value and set() (function that controls the state), 
    // using array destracturing, position 0 and 1 in the array
    const [expenses, setExpenses] = useState(initialExpenses)
    // Single expense
    const [charge, setCharge] = useState('') //value set to empty string by default
    // Single amount
    const [amount, setAmount] = useState('')
    // Alert
    const [alert, setAlert] = useState({show: false})
    // Edit
    const [edit, setEdit] = useState(false)
    // Edit item
    const [id, setId] = useState(0)
    // useEffect Hook
    useEffect(() => {
        return localStorage.setItem('expenses', JSON.stringify(expenses))
    }, [expenses])

    /****Functionality****/
    const handleCharge = (e) => {
        //console.log(`charge = ${e.target.value}`)
        setCharge(e.target.value)
    }

    const handleAlert = ({type, text}) => {
        setAlert({
            show: true,
            type,
            text
        })
        setTimeout(()=> {
            setAlert({show: false})
        }, 3000)
    }

    const clearItems = () => {
        //console.log('Clear')
        setExpenses([])
        handleAlert({ type: "danger", text: "all items deleted"})
    }

    const handleDelete = (id) => {
        //console.log('Delete')
        let tempExpenses = expenses.filter((item) => {
            return id !== item.id
        })
        setExpenses(tempExpenses)
        handleAlert({ type: "danger", text: "item deleted"})
    }

    const handleEdit = (id) => {
        let expense = expenses.find((item)=> item.id === id)
        let { charge, amount } = expense
        //console.log(expense)
        setCharge(charge)
        setAmount(amount)
        setEdit(true)
        setId(id)
    }

    const handleAmount = (e) => {
        setAmount(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (charge !== "" && amount > 0) {
            // if we are in edit mode
            if (edit) {
                let tempExpenses = expenses.map((item) => {
                    return item.id === id ? {...item, amount, charge} :item
                })
                setExpenses(tempExpenses)
                setEdit(false)
                handleAlert({type:'success', text: 'item edited'})

            } else {
                const singleExpense = { 
                    id: uuid(),
                    charge: charge,
                    amount: amount
                }
                setExpenses([...expenses, singleExpense])
                handleAlert({type:'success', text: 'item added'})
            }
            // reset values
            setCharge("")
            setAmount("")

        } else {
            // handle alert called
            handleAlert({
                type: 'danger',
                text: `Expense field cannot be empty and Amount must be greater than 0`
            })
        }
    }


    return (
        <>
            {alert.show &&  <Alert type={alert.type} text={alert.text}/> }
            <h1>budget calculator</h1>
            <main className="App">
                <ExpenseForm 
                    charge={charge} 
                    amount={amount}
                    handleCharge={handleCharge}
                    handleAmount={handleAmount}
                    handleSubmit={handleSubmit}
                    edit={edit}
                />
                <ExpenseList 
                    expenses={expenses}
                    handleDelete={handleDelete}
                    clearItems={clearItems}
                    handleEdit={handleEdit}
                />
            </main>
            <h1>
                total expenses: <span className="total">
                    $ {expenses.reduce((acc, crr)=> {
                        return (acc + parseInt(crr.amount))
                    },0)}
                </span>
            </h1>
        </>
    )
}

export default App