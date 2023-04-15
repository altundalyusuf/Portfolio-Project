import React from "react"
import { AuthContextProvider } from './context/AuthContext';
import IndexRoute from "./routes";
import { IntroContextProvider } from "./context/PortfolioContext/IntroContext";
import { EducationContextProvider } from "./context/PortfolioContext/EducationContext";
import { ExperienceContextProvider } from "./context/PortfolioContext/ExperienceContext";
import { CertificateContextProvider } from "./context/PortfolioContext/CertificateContext";
import { SkillContextProvider } from "./context/PortfolioContext/SkillContext";
import { ProjectContextProvider } from "./context/PortfolioContext/ProjectContext";
import { ArticleContextProvider } from "./context/PortfolioContext/ArticleContext";
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {

  return (
    <>
      {/* Context Providers and index Route file */}
      <ThemeContextProvider>
        <AuthContextProvider>
          <IntroContextProvider>
            <EducationContextProvider>
              <ExperienceContextProvider>
                <SkillContextProvider>
                  <CertificateContextProvider>
                    <ProjectContextProvider>
                      <ArticleContextProvider>
                        <IndexRoute />
                      </ArticleContextProvider>
                    </ProjectContextProvider>
                  </CertificateContextProvider>
                </SkillContextProvider>
              </ExperienceContextProvider>
            </EducationContextProvider>
          </IntroContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </>
  )
}

export default App
