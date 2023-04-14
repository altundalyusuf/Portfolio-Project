import { useContext, createContext, useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const IntroContext = createContext();

export const IntroContextProvider = ({ children }) => {
    // Intro firebase collection
    const introDocRef = doc(db, "introCollection", "introDoc");
    // State initial value
    let initialValue;
    // Read from firebase when initializing state
    const initialFirebaseIntro = async () => {
        try {
            const doc = await getDoc(introDocRef)
            if (doc.exists()) {
                const data = doc.data();
                const introStringField = data.introStringField;
                initialValue = introStringField;
            }
        }
        catch (error) {
            console.error("Intro Doküman görüntülerken hata: ", error);
        }
    }
    // introText state
    const [introText, setIntroText] = useState(() => {
        initialFirebaseIntro();
        return initialValue;
    });


    // Create intro text in firebase
    const createIntroFirebase = async (introText) => {
        try {
            await setDoc(introDocRef, {
                introStringField: introText
            })
        } catch (error) {
            console.error("Intro Doküman eklerken hata: ", error);
        }
    }

    // Read from firebase
    const readIntroFirebase = async () => {
        try {
            const doc = await getDoc(introDocRef)
            if (doc.exists()) {
                const data = doc.data();
                const introStringField = data.introStringField;
                setIntroText(introStringField);
            }
            else {
                console.log("Intro Dokümanı bulunamadı!");
            }
        }
        catch (error) {
            console.error("Intro Dokümanı görüntülerken hata: ", error);
        }
    }


    useEffect(() => {
        readIntroFirebase()
    }, [])


    // Export to other files
    const values = {
        introText,
        setIntroText,
        createIntroFirebase,
        readIntroFirebase,
    }

    return (
        <IntroContext.Provider value={values}>
            {children}
        </IntroContext.Provider>
    )
}

export const useIntro = () => {
    return useContext(IntroContext)
}