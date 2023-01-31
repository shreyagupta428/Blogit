import { createContext,useState } from "react";
export const DataContext=createContext(null);

const DataProvider=({children})=>{
    const [userContext,setUserContext]=useState({name:'',email:'',username:''});
    return(
        <DataContext.Provider value={{userContext,setUserContext}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;