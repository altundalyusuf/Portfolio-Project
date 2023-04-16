import { useContext, createContext, useState } from 'react';
import { doc, addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../AuthContext';


const ExperienceContext = createContext();

export const ExperienceContextProvider = ({ children }) => {

    const [card, setCard] = useState([])

    const { uid } = useAuth();

    // write data
    const writeExperience = async (experience) => {
        try {
            await addDoc(collection(db, "users", uid, "experienceCollection"), {
                position: experience.position,
                company: experience.company,
                dates: experience.dates,
                location: experience.location,
                text: experience.text,
            });
            console.log("Experience Document written.");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // read data function
    const readExperience = async () => {
        const querySnapshot = await getDocs(collection(db, "users", uid, "experienceCollection"));
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
    const deleteExperience = async (dataID) => {
        try {
            await deleteDoc(doc(db, 'users', uid, "experienceCollection", dataID));
            console.log("Experience Document deleted.");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    // Export to other files
    const values = {
        deleteExperience,
        writeExperience,
        readExperience,
        card,
    }



    return (
        <ExperienceContext.Provider value={values}>
            {children}
        </ExperienceContext.Provider>
    )
}

export const useExperience = () => {
    return useContext(ExperienceContext)
}