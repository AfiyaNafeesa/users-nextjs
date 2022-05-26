import { createContext, useState } from "react";
import App from "../pages/App";

export const RootContext = createContext(null)

export const RootProvider = () => {
    const [nation, setNation] = useState("NL");
    const [gender, setGender] = useState("All");
    return(
        <RootContext.Provider value={{nation, setNation, gender,setGender}}>
            <App />
        </RootContext.Provider>
    )
}