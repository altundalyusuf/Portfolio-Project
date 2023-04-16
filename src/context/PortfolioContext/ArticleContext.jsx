import { useContext, createContext, useState } from 'react';
import { doc, addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../AuthContext';


const ArticleContext = createContext();

export const ArticleContextProvider = ({ children }) => {

    const [card, setCard] = useState([])

    const { uid } = useAuth();

    // write data
    const writeArticle = async ({ modalInput, photoURL }) => {
        try {
            await addDoc(collection(db, "users", uid, "articleCollection"), {
                name: modalInput.name,
                category: modalInput.category,
                authorRole: modalInput.authorRole,
                dates: modalInput.dates,
                text: modalInput.text,
                photo: photoURL,
            });
            console.log("Article Document written.");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // read data function
    const readArticle = async () => {
        const querySnapshot = await getDocs(collection(db, "users", uid, "articleCollection"));
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
    const deleteArticle = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', uid, "articleCollection", id));
            console.log("Article Document deleted.");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    // Export to other files
    const values = {
        deleteArticle,
        writeArticle,
        readArticle,
        card,
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