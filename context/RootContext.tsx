import { createContext, useState } from "react";
import App from "../pages/App";

export const RootContext = createContext(null)

export const RootProvider = () => {
    const [gender, setGender] = useState("All");
        return(
        <RootContext.Provider value={{gender,setGender}}>
            <App />
        </RootContext.Provider>
    )
} 