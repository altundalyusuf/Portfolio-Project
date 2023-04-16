import { useContext, createContext, useEffect, useState } from 'react';
import { doc, getDoc, addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../AuthContext';


const SkillContext = createContext();

export const SkillContextProvider = ({ children }) => {

    const [card, setCard] = useState([])

    const { uid } = useAuth();

    // write data
    const writeSkill = async (skill) => {
        try {
            await addDoc(collection(db, "users", uid, "skillCollection"), {
                name: skill.name,
            });
            console.log("Skill Document written.");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // read data function
    const readSkill = async () => {
        const querySnapshot = await getDocs(collection(db, "users", uid, "skillCollection"));
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
    const deleteSkill = async (dataID) => {
        try {
            await deleteDoc(doc(db, 'users', uid, "skillCollection", dataID));
            console.log("Skill Document deleted.");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }


    // Export to other files
    const values = {
        deleteSkill,
        writeSkill,
        readSkill,
        card,
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