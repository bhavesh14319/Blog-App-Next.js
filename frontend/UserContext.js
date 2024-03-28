import React, { createContext, useContext, useReducer, useState } from "react";




export const userContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user,setUser] = useState(null);
    const [token,setToken] = useState(undefined);
    const [loading,setLoading] = useState(false);



    return (
        <userContext.Provider value={{user,setUser,token,setToken,loading,setLoading}}>
            {children}
        </userContext.Provider>
    )
}



