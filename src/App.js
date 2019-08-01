import React from 'react'
import uuid from 'uuid/v4'

import "./App.css"
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'

// Dummy data
const initialExpense = [
    {id:uuid(), expense:"rent", amount: 1600},
    {id:uuid(), expense:"car payment", amount: 400},
    {id:uuid(), expense:"credit card bill", amount: 1200}
]
console.log(initialExpense)

function App() {
    return (
        <>
            <Alert />
            <ExpenseForm />
            <ExpenseList />
        </>
    )
}

export default App