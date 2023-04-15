import { useContext, createContext, useEffect, useState } from 'react';
import { doc, getDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../AuthContext';


const EducationContext = createContext();

export const EducationContextProvider = ({ children }) => {

    const [educationData, setEducationData] = useState('')

    const { uid } = useAuth();
    const [educationDocRef, setEducationDocRef] = useState(null)

    //  uid is async so I have to check
    useEffect(() => {
        if (uid) {
            setEducationDocRef(doc(db, "educationCollection", uid));
        }
    }, [uid]);


    // Create education infos in firebase
    const createEducationFirebase = async (education) => {
        try {
            await addDoc(collection(db, 'educationCollection'), {
                school: education.school,
                department: education.department,
                dates: education.dates,
                grade: education.grade,
            })
            setEducationData('')
        } catch (error) {
            console.error("Eğitim Dokümanını eklerken hata: ", error);
        }
    }

    // Read from firebase
    const readEducationFirebase = async () => {
        try {
            const doc = await getDoc(educationDocRef)
            if (doc.exists()) {
                const educationData = doc.data();
                setEducationData(educationData);
            }
        }
        catch (error) {
            console.error("Eğitim Dokümanı görüntülerken hata: ", error);
        }
    }

    const deleteEducation = async (dataID) => {
        await deleteDoc(doc(db, "educationCollection", dataID));
    }


    useEffect(() => {
        if (educationDocRef) {
            readEducationFirebase()
        }
    }, [educationDocRef])




    // Export to other files
    const values = {
        educationData,
        setEducationData,
        createEducationFirebase,
        readEducationFirebase,
        deleteEducation,
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