import { useContext, createContext, useEffect, useState } from 'react';
import { doc, getDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const ArticleContext = createContext();

export const ArticleContextProvider = ({ children }) => {

    const [articleData, setArticleData] = useState('')

    const articleDocRef = doc(db, "articleCollection", 'articleDoc');

    // Create Article infos in firebase
    const createArticleFirebase = async ({ modalInput, photoURL }) => {
        // console.log(modalInput, photoURL);
        try {
            await addDoc(collection(db, 'articleCollection'), {
                name: modalInput.name,
                category: modalInput.category,
                authorRole: modalInput.authorRole,
                dates: modalInput.dates,
                text: modalInput.text,
                photo: photoURL,
            })
            setArticleData('')
        } catch (error) {
            console.error("Makale Dokümanını eklerken hata: ", error);
        }
    }

    // Read from firebase
    const readArticleFirebase = async () => {
        try {
            const doc = await getDoc(articleDocRef)
            if (doc.exists()) {
                const articleData = doc.data();
                setArticleData(articleData);
            }
        }
        catch (error) {
            console.error("Makale Dokümanı görüntülerken hata: ", error);
        }
    }

    const deleteArticle = async (dataID) => {
        await deleteDoc(doc(db, "articleCollection", dataID));
    }


    useEffect(() => {
        readArticleFirebase()
    }, [])


    // Export to other files
    const values = {
        articleData,
        setArticleData,
        createArticleFirebase,
        readArticleFirebase,
        deleteArticle,
    }



    return (
        <ArticleContext.Provider value={values}>
            {children}
        </ArticleContext.Provider>
    )
}

export const useArticle = () => {
    return useContext(ArticleContext)
}