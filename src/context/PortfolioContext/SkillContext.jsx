import { useContext, createContext, useEffect, useState } from 'react';
import { doc, getDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const SkillContext = createContext();

export const SkillContextProvider = ({ children }) => {

    const [skillData, setSkillData] = useState('')

    const skillDocRef = doc(db, "skillCollection", 'skillDoc');

    // Create skill infos in firebase
    const createSkillFirebase = async (skill) => {
        try {
            await addDoc(collection(db, 'skillCollection'), {
                name: skill.name,
            })
            setSkillData('')
        } catch (error) {
            console.error("Yetenek Dokümanını eklerken hata: ", error);
        }
    }

    // Read from firebase
    const readSkillFirebase = async () => {
        try {
            const doc = await getDoc(skillDocRef)
            if (doc.exists()) {
                const skillData = doc.data();
                setSkillData(skillData);
            }
        }
        catch (error) {
            console.error("Yetenek Dokümanı görüntülerken hata: ", error);
        }
    }

    const deleteSkill = async (dataID) => {
        await deleteDoc(doc(db, "skillCollection", dataID));
    }


    useEffect(() => {
        readSkillFirebase()
    }, [])


    // Export to other files
    const values = {
        skillData,
        setSkillData,
        createSkillFirebase,
        readSkillFirebase,
        deleteSkill,
    }



    return (
        <SkillContext.Provider value={values}>
            {children}
        </SkillContext.Provider>
    )
}

export const useSkill = () => {
    return useContext(SkillContext)
}