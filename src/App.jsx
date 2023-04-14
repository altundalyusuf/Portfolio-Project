import React from "react"
import { AuthContextProvider } from './context/AuthContext';
import IndexRoute from "./routes";
import { IntroContextProvider } from "./context/PortfolioContext/IntroContext";
import { EducationContextProvider } from "./context/PortfolioContext/EducationContext";
import { ExperienceContextProvider } from "./context/PortfolioContext/ExperienceContext";
import { CertificateContextProvider } from "./context/PortfolioContext/CertificateContext";

function App() {

  return (
    <>
      {/* Context Providers and index Route file */}
      <AuthContextProvider>
        <IntroContextProvider>
          <EducationContextProvider>
            <ExperienceContextProvider>
              <CertificateContextProvider>
                <IndexRoute />
              </CertificateContextProvider>
            </ExperienceContextProvider>
          </EducationContextProvider>
        </IntroContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
