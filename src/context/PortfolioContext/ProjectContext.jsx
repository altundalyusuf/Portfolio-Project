import { useContext, createContext, useEffect, useState } from 'react';
import { doc, getDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {

    const [projectData, setProjectData] = useState('')

    const projectDocRef = doc(db, "projectCollection", 'projectDoc');

    // Create Project infos in firebase
    const createProjectFirebase = async (project) => {
        try {
            await addDoc(collection(db, 'projectCollection'), {
                name: project.name,
                dates: project.dates,
                text: project.text,
            })
            setProjectData('')
        } catch (error) {
            console.error("Proje Dokümanını eklerken hata: ", error);
        }
    }

    // Read from firebase
    const readProjectFirebase = async () => {
        try {
            const doc = await getDoc(projectDocRef)
            if (doc.exists()) {
                const projectData = doc.data();
                setProjectData(projectData);
            }
        }
        catch (error) {
            console.error("Proje Dokümanı görüntülerken hata: ", error);
        }
    }

    const deleteProject = async (dataID) => {
        await deleteDoc(doc(db, "projectCollection", dataID));
    }


    useEffect(() => {
        readProjectFirebase()
    }, [])


    // Export to other files
    const values = {
        projectData,
        setProjectData,
        createProjectFirebase,
        readProjectFirebase,
        deleteProject,
    }



    return (
        <ProjectContext.Provider value={values}>
            {children}
        </ProjectContext.Provider>
    )
}

export const useProject = () => {
    return useContext(ProjectContext)
}