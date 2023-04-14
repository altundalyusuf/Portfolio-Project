import React, { useEffect, useRef, useState } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useCertificate } from '../../context/PortfolioContext/CertificateContext'
import { db } from '../../firebase';



const Certificates = () => {

    // state for sending Modal informations to firebase 
    const [modalInput, setModalInput] = useState({
        name: '',
        company: '',
        dates: '',
    });
    // state for when we read from firestore
    const [card, setCard] = useState([]);

    const { createCertificateFirebase, readCertificateFirebase, deleteCertificate } = useCertificate();

    const nameRef = useRef('');
    const companyRef = useRef('');
    const datesRef = useRef('');

    // Modal Input handlechange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // create new card and save to firebase
    const handleClick = async () => {
        // Save content to firebase
        await createCertificateFirebase(modalInput);
        // Read from firebase
        await readCertificateFirebase();
        // Clear inside of modal
        nameRef.current.value = "";
        companyRef.current.value = "";
        datesRef.current.value = "";
    }

    const handleDelete = async (dataID) => {
        deleteCertificate(dataID);

    }


    // Read data from firebase
    useEffect(() => {
        const q = query(collection(db, 'certificateCollection'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let certificate = [];
            querySnapshot.forEach((doc) => {
                certificate.push({ ...doc.data(), id: doc.id });
            });
            setCard(certificate);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <div className='relative'>
                <h1 id='certificates' className='text-center text-3xl font-bold py-8'>Sertifikalar</h1>
                <label htmlFor="my-modal-3" className="btn btn-square btn-ghost hover:bg-green-500 hover:text-white gap-2 btn-sm md:btn-md absolute top-5 right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </label>
            </div>
            <div className="grid grid-cols-12">
                {/* Arka Planları sil turuncu ve yeşili */}

                {card &&
                    card.map((data) => (
                        <div key={data.id} className='p-3 col-span-6 md:col-span-3 bg-orange-300 rounded flex items-center md:justify-start'>
                            <div className="card w-96 bg-base-100 shadow-xl relative">
                                <label onClick={() => handleDelete(data.id)} className="btn btn-square btn-ghost gap-2 btn-sm md:btn-md absolute top-0 right-0 hover:bg-red-400 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </label>
                                <div className="card-body">
                                    <h2 className="card-title">{data?.name}</h2>
                                    <p>{data?.company}</p>
                                    <p>{data?.dates}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                {/* **MODAL** Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal modal-middle">
                    <div className="modal-box relative">
                        <h3 className="font-bold text-lg md:text-2xl text-center">Sertifikalarım</h3>
                        <p className="py-4 text-center">Lütfen aşağıdaki alanları doldurun.</p>
                        {/* Inputs */}
                        <label htmlFor="my-modal-3" className="block">Sertifika Adı</label>
                        <input type="text" placeholder="Sertifika Adı" onChange={handleChange} ref={nameRef} name='name' className="input input-bordered input-info w-full max-w-xs mb-2" />
                        <label htmlFor="my-modal-3" className="block">Şirket Adı</label>
                        <input type="text" name='company' placeholder="Şirket Adı" onChange={handleChange} ref={companyRef} className="input input-bordered input-info w-full max-w-xs mb-2" />
                        <div className='inline-block w-full md:w-5/12 md:me-5 md:text-center md:mt-2'>
                            <label htmlFor="my-modal-3" className="block">Başlangıç - Bitiş Tarihleri</label>
                            <input type="text" placeholder="Tarihler" onChange={handleChange} name='dates' ref={datesRef} className="input input-bordered input-info w-full max-w-xs mb-2" />
                        </div>
                        {/* Buttons */}
                        <div className="modal-action flex justify-center">
                            <label htmlFor="my-modal-3" className="btn btn-outline">İptal</label>
                            <label htmlFor="my-modal-3" onClick={handleClick} className="btn">Kaydet</label>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Certificates
