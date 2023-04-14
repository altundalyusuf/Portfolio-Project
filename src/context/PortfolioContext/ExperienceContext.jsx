import { useContext, createContext, useEffect, useState } from 'react';
import { doc, getDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const ExperienceContext = createContext();

export const ExperienceContextProvider = ({ children }) => {

    const [experienceData, setExperienceData] = useState('')

    const experienceDocRef = doc(db, "experienceCollection", 'experienceDoc');

    // Create experience infos in firebase
    const createExperienceFirebase = async (experience) => {
        try {
            await addDoc(collection(db, 'experienceCollection'), {
                position: experience.position,
                company: experience.company,
                dates: experience.dates,
                location: experience.location,
                text: experience.text,
            })
            setExperienceData('')
        } catch (error) {
            console.error("Deneyim Dokümanını eklerken hata: ", error);
        }
    }

    // Read from firebase
    const readExperienceFirebase = async () => {
        try {
            const doc = await getDoc(experienceDocRef)
            if (doc.exists()) {
                const educationData = doc.data();
                setExperienceData(educationData);
            }
        }
        catch (error) {
            console.error("Deneyim Dokümanı görüntülerken hata: ", error);
        }
    }

    const deleteExperience = async (dataID) => {
        await deleteDoc(doc(db, "experienceCollection", dataID));
    }


    useEffect(() => {
        readExperienceFirebase()
    }, [])


    // Export to other files
    const values = {
        experienceData,
        setExperienceData,
        createExperienceFirebase,
        readExperienceFirebase,
        deleteExperience,
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