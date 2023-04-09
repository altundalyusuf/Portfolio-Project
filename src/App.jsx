import React from "react"
import { AuthContextProvider } from './context/AuthContext';
import IndexRoute from "./routes";

function App() {

  return (
    <>
      <AuthContextProvider>
        <IndexRoute />
      </AuthContextProvider>
    </>
  )
}

export default App
