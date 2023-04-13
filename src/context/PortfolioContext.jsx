import { useContext, createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';


const PortfolioContext = createContext();

export const PortfolioContextProvider = ({ children }) => {

    const [introText, setIntroText] = useState("Benim kim olduğuma dair, hedeflerim vs. vs.Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi..");

    // Export to other files
    const values = {
        introText,
        setIntroText
    }

    return (
        <PortfolioContext.Provider value={values}>
            {children}
        </PortfolioContext.Provider>
    )
}

export const usePortfolio = () => {
    return useContext(PortfolioContext)
}