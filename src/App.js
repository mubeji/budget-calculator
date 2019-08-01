import React, { useState } from 'react'
import uuid from 'uuid/v4'

import "./App.css"
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'

// Dummy data
const initialExpenses = [
    {id:uuid(), expense:"rent", amount: 1600},
    {id:uuid(), expense:"car payment", amount: 400},
    {id:uuid(), expense:"credit card bill", amount: 1200}
]
//console.log(initialExpense)

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

    /****Functionality****/
    const handleCharge = (e) => {
        console.log(`charge = ${e.target.value}`)
        setCharge(e.target.value)
    }

    const handleAmount = (e) => {
        setAmount(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (charge !== "" && amount > 0) {

            const singleExpense = { 
                id: uuid(),
                charge: charge,
                amount: amount
            }
            setExpenses([...expenses, singleExpense])
            setCharge("")
            setAmount("")
        } else {
            // handle alert called
        }
    }


    return (
        <>
            <Alert />
            <h1>budget calculator</h1>
            <main className="App">
                <ExpenseForm 
                    charge={charge} 
                    amount={amount}
                    handleCharge={handleCharge}
                    handleAmount={handleAmount}
                    handleSubmit={handleSubmit}
                />
                <ExpenseList expenses={expenses}/>
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