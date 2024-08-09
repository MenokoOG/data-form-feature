import { useContext, useState } from "react";
import { Context } from "../context/ContextProvider";
import '../css/form.css'
import { v4 as uuidv4 } from 'uuid';

const initState = {
    date: '',
    description: '',
    amount: '',
    category: '',
    id: uuidv4()
}

const FinanceForm = () => {

    const { addNew } = useContext(Context)

    const [formData, setFormData] = useState(initState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const adjustedAmount = formData.category === 'Expenses' ? -Math.abs(formData.amount) : formData.amount;

        const updatedFormData = {
            ...formData,
            amount: adjustedAmount
        };

        addNew(updatedFormData);
        setFormData(initState);
    };

    const isFormValid = formData.date && formData.description && formData.amount && formData.category


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
            <h1>Add Expenses or Income</h1>
                <input
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    type="date"
                    required
                    
                />
                <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Description"
                />
                <input
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    type="number"
                    required
                    placeholder="Amount"
                />
                <select
                    name="category"
                    onChange={handleChange}
                    required
                >
                    <option value=''>Expense/Income</option>
                    <option value='Expenses'>Expense</option>
                    <option value='Income'>Income</option>
                </select>
                <button disabled={!isFormValid}>Submit</button>
                {!isFormValid && <p>*All fields required</p>}
            </form>
        </div>
    );
}

export default FinanceForm;