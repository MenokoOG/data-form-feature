import { createContext, useState } from "react";
import { financeData } from "../../financeData";


export const Context = createContext()

const ContextProvider = ({children}) => {
    
    const [finances, setFinances] = useState(financeData)

    const currBalance = finances.reduce((total, fin) => {
        total += +fin.amount
        return total
    }, 0)
    
    const addNew = (newFinance) => setFinances(prevFinances => [...prevFinances, newFinance])

    const editFinance = (id, update) => setFinances(prevFinances => prevFinances.map(finance => finance.id !== id ? finance : update)) 
    
    const removeFinance = (id) => setFinances(prevFinances => prevFinances.filter(finance => finance.id !== id))

    return ( 
        <Context.Provider value={{
            finances,
            currBalance,
            addNew,
            editFinance,
            removeFinance
        }}>
            {children}
        </Context.Provider>
     );
}
 
export default ContextProvider;