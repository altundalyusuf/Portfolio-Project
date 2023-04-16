import { useContext, createContext, useState } from 'react';
import { doc, addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../AuthContext';


const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {

    const [card, setCard] = useState([])

    const { uid } = useAuth();

    // write data
    const writeProject = async (project) => {
        try {
            await addDoc(collection(db, "users", uid, "projectCollection"), {
                name: project.name,
                dates: project.dates,
                text: project.text,
            });
            console.log("Project Document written.");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    // read data function
    const readProject = async () => {
        const querySnapshot = await getDocs(collection(db, "users", uid, "projectCollection"));
        const dataArray = [];
        querySnapshot.forEach((doc) => {
            dataArray.push({
                id: doc.id,
                data: doc.data(),
            })
        });
        setCard(dataArray);
    }

    // delete from firebase
    const deleteProject = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', uid, "projectCollection", id));
            console.log("Project Document deleted.");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    // Export to other files
    const values = {
        deleteProject,
        writeProject,
        readProject,
        card,
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