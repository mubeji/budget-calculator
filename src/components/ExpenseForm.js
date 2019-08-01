import React from 'react'
import { MdSend } from "react-icons/md"

const ExpenseForm = ({
        charge,
        amount,
        handleAmount,
        handleSubmit,
        handleCharge,
        edit
    }) => {


    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">expense</label>
                    <input type="text" 
                        className="form-control" 
                        id="charge"
                        name="charge"
                        placeholder="Enter expense, e.g. rent"
                        value={charge}
                        onChange={handleCharge}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">amount</label>
                    <input type="number" 
                        className="form-control" 
                        id="amount"
                        name="amount"
                        placeholder="Enter amount e.g. 100"
                        value={amount}
                        onChange={handleAmount}
                    />
                </div>
            </div>
            <button type="submit" className="btn">
                {edit ? "edit" : "submit"}
                <MdSend className="btn-icon" />
            </button>
        </form>
    )
}

export default ExpenseForm
