import React from "react"
import { AuthContextProvider } from './context/AuthContext';
import IndexRoute from "./routes";
import { PortfolioContextProvider } from "./context/PortfolioContext";

function App() {

  return (
    <>
      <AuthContextProvider>
        <PortfolioContextProvider>
          <IndexRoute />
        </PortfolioContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
