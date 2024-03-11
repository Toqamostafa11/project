import { createContext, useState } from "react"

export const AuthContext = createContext();


export function AuthContextProvider( {children }){

    const [token, setToken] = useState(null);

    


    return <AuthContext.Provider value = {  { myToken: token, test: setToken } } >
      { children }
    </AuthContext.Provider>
}