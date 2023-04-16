import { useContext, createContext, useState } from 'react';
import { doc, addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../AuthContext';


const CertificateContext = createContext();

export const CertificateContextProvider = ({ children }) => {

    const [card, setCard] = useState([])

    const { uid } = useAuth();

    // write data
    const writeCertificate = async (certificate) => {
        try {
            await addDoc(collection(db, "users", uid, "certificateCollection"), {
                name: certificate.name,
                company: certificate.company,
                dates: certificate.dates,
            });
            console.log("Certificate Document written.");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // read data function
    const readCertificate = async () => {
        const querySnapshot = await getDocs(collection(db, "users", uid, "certificateCollection"));
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
    const deleteCertificate = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', uid, "certificateCollection", id));
            console.log("Certificate Document deleted.");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }





    // Export to other files
    const values = {
        deleteCertificate,
        writeCertificate,
        readCertificate,
        card,
    }



    return (
        <CertificateContext.Provider value={values}>
            {children}
        </CertificateContext.Provider>
    )
}

export const useCertificate = () => {
    return useContext(CertificateContext)
}