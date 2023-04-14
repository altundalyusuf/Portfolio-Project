import React from "react"
import { AuthContextProvider } from './context/AuthContext';
import IndexRoute from "./routes";
import { IntroContextProvider } from "./context/PortfolioContext/IntroContext";
import { EducationContextProvider } from "./context/PortfolioContext/EducationContext";

function App() {

  return (
    <>
      <AuthContextProvider>
        <IntroContextProvider>
          <EducationContextProvider>
            <IndexRoute />
          </EducationContextProvider>
        </IntroContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
