import { useContext, createContext, useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const EducationContext = createContext();

export const EducationContextProvider = ({ children }) => {

    // Intro firebase collection
    const educationDocRef = doc(db, "educationCollection", "educationDoc");
    // State initial value
    let initialValue;
    // Read from firebase when initializing state
    const initialFirebaseEducation = async () => {
        try {
            const doc = await getDoc(educationDocRef)
            if (doc.exists()) {
                const educationData = doc.data();
                initialValue = educationData;
            }
        }
        catch (error) {
            console.error("Doküman görüntülerken hata: ", error);
        }
    }
    // introText state
    const [educationData, setEducationData] = useState(() => {
        initialFirebaseEducation();
        return initialValue || {
            school: 'medeniyet',
            department: 'pc',
            dates: '2019-2023',
            grade: '2.87',
        }
    });


    // Create intro text in firebase
    const createEducationFirebase = async (education) => {
        try {
            await setDoc(educationDocRef, {
                school: education.school,
                department: education.department,
                dates: education.dates,
                grade: education.grade,
            })
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
            else {
                console.log("Doküman bulunamadı!");
            }
        }
        catch (error) {
            console.error("Doküman görüntülerken hata: ", error);
        }
    }


    useEffect(() => {
        readEducationFirebase()
    }, [])


    // Export to other files
    const values = {
        educationData,
        setEducationData,
        createEducationFirebase,
        readEducationFirebase,
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