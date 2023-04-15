import { useContext, createContext, useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../AuthContext';


const IntroContext = createContext();

export const IntroContextProvider = ({ children }) => {

    const { uid } = useAuth();
    const [introDocRef, setIntroDocRef] = useState(null)
    // uid is async so I have to check
    useEffect(() => {
        if (uid) {
            setIntroDocRef(doc(db, "introCollection", uid));
        }
    }, [uid]);

    // introText state
    const [introText, setIntroText] = useState('');


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
        }
        catch (error) {
            console.error("Intro Dokümanı görüntülerken hata: ", error);
        }
    }


    useEffect(() => {
        if (introDocRef) {
            readIntroFirebase()
        }
    }, [introDocRef])


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