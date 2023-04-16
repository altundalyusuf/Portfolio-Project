import { useContext, createContext, useState } from 'react';
import { doc, addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../AuthContext';


const EducationContext = createContext();

export const EducationContextProvider = ({ children }) => {

    const [card, setCard] = useState([])

    const { uid } = useAuth();




    // write data
    const writeEducation = async (education) => {
        try {
            await addDoc(collection(db, "users", uid, "educationCollection"), {
                school: education.school,
                department: education.department,
                dates: education.dates,
                grade: education.grade,
            });
            console.log("Education Document written.");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // read data function
    const readEducation = async () => {
        const querySnapshot = await getDocs(collection(db, "users", uid, "educationCollection"));
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
    const deleteEducation = async (dataID) => {
        try {
            await deleteDoc(doc(db, 'users', uid, "educationCollection", dataID));
            console.log("Education Document deleted.");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }





    // Export to other files
    const values = {
        deleteEducation,
        writeEducation,
        readEducation,
        card,
    }



    return (
        <EducationContext.Provider value={values}>
            {children}
        </EducationContext.Provider>
    )
}

export const useEducation = () => {
    return useContext(EducationContext)
}