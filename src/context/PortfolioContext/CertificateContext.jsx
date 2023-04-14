import { useContext, createContext, useEffect, useState } from 'react';
import { doc, getDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const CertificateContext = createContext();

export const CertificateContextProvider = ({ children }) => {

    const [certificateData, setCertificateData] = useState('')

    const certificateDocRef = doc(db, "certificateCollection", 'certificateDoc');

    // Create certificate infos in firebase
    const createCertificateFirebase = async (certificate) => {
        try {
            await addDoc(collection(db, 'certificateCollection'), {
                name: certificate.name,
                company: certificate.company,
                dates: certificate.dates,
            })
            setCertificateData('')
        } catch (error) {
            console.error("Sertifika Dokümanını eklerken hata: ", error);
        }
    }

    // Read from firebase
    const readCertificateFirebase = async () => {
        try {
            const doc = await getDoc(certificateDocRef)
            if (doc.exists()) {
                const certificateData = doc.data();
                setCertificateData(certificateData);
            }
        }
        catch (error) {
            console.error("Sertifika Dokümanı görüntülerken hata: ", error);
        }
    }

    const deleteCertificate = async (dataID) => {
        await deleteDoc(doc(db, "certificateCollection", dataID));
    }


    useEffect(() => {
        readCertificateFirebase()
    }, [])


    // Export to other files
    const values = {
        certificateData,
        setCertificateData,
        createCertificateFirebase,
        readCertificateFirebase,
        deleteCertificate,
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