import React, { useEffect, useRef, useState } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useExperience } from '../../context/PortfolioContext/ExperienceContext';

const Experience = () => {

    // state for sending Modal informations to firebase 
    const [modalInput, setModalInput] = useState({
        position: '',
        company: '',
        dates: '',
        location: '',
        text: '',
    });
    // state for when we read from firestore
    const [card, setCard] = useState([]);

    const { createExperienceFirebase, readExperienceFirebase, deleteExperience } = useExperience();

    const positionRef = useRef('');
    const companyRef = useRef('');
    const datesRef = useRef('');
    const locationRef = useRef('');
    const textRef = useRef('');

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
        await createExperienceFirebase(modalInput);
        // Read from firebase
        await readExperienceFirebase();
        // Clear inside of modal
        positionRef.current.value = "";
        companyRef.current.value = "";
        datesRef.current.value = "";
        locationRef.current.value = "";
        textRef.current.value = "";
    }

    const handleDelete = async (dataID) => {
        deleteExperience(dataID);

    }


    // Read data from firebase
    useEffect(() => {
        const q = query(collection(db, 'experienceCollection'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let experiences = [];
            querySnapshot.forEach((doc) => {
                experiences.push({ ...doc.data(), id: doc.id });
            });
            setCard(experiences);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <div className='relative'>
                <h1 id='experience' className='text-center text-3xl font-bold py-8'>Deneyimler</h1>
                {/* Edit button to open modal */}
                <label htmlFor="my-modal-2" className="btn btn-square btn-ghost hover:bg-green-500 hover:text-white gap-2 btn-sm md:btn-md absolute top-5 right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </label>
            </div>
            {/* Experience Cards */}
            <div className="grid grid-cols-6">
                {/* Arka Planları sil turuncu ve yeşili */}
                {card &&
                    card.map((data) => (
                        <div key={data.id} className='p-3 col-span-6 bg-primary rounded flex items-center md:justify-start'>
                            <div className="card w-96 md:w-full bg-base-100 shadow-xl relative">
                                <label onClick={() => handleDelete(data.id)} className="btn btn-square btn-ghost gap-2 btn-sm md:btn-md absolute top-0 right-0 hover:bg-red-400 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </label>
                                <div className="card-body">
                                    <h2 className="card-title">{data?.position}</h2>
                                    <p>{data?.company}</p>
                                    <p className='text-slate-400'>{data?.dates}</p>
                                    <p className='text-slate-400'>{data?.location}</p>
                                    <p>{data?.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                {/* **MODAL** Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-2" className="modal-toggle" />
                <div className="modal modal-middle">
                    <div className="modal-box relative">
                        <h3 className="font-bold text-lg md:text-2xl text-center">Deneyimlerim</h3>
                        <p className="py-4 text-center">Lütfen aşağıdaki alanları doldurun.</p>
                        {/* Inputs */}
                        <label htmlFor="my-modal-2" className="block">Pozisyon</label>
                        <input type="text" placeholder="Pozisyon" onChange={handleChange} ref={positionRef} name='position' className="input input-bordered input-info w-full max-w-xs mb-2" />
                        <label htmlFor="my-modal-2" className="block">Şirket Adı</label>
                        <input type="text" name='company' placeholder="Şirket Adı" onChange={handleChange} ref={companyRef} className="input input-bordered input-info w-full max-w-xs mb-2" />
                        <div className='inline-block w-full md:w-5/12 md:me-5 md:text-center md:mt-2'>
                            <label htmlFor="my-modal-2" className="block">Başlangıç - Bitiş Tarihleri</label>
                            <input type="text" placeholder="Tarihler" onChange={handleChange} name='dates' ref={datesRef} className="input input-bordered input-info w-full max-w-xs mb-2" />
                        </div>
                        <div className='inline-block w-full md:w-5/12 md:text-center'>
                            <label htmlFor="my-modal-2" className="block">Konum</label>
                            <input type="text" placeholder="Konum" onChange={handleChange} name='location' ref={locationRef} className="input input-bordered input-info w-full max-w-xs mb-2" />
                        </div>
                        <label htmlFor="my-modal-2" className="block">Açıklama</label>
                        <textarea placeholder="Deneyimlerinizi açıklayabilirsiniz" name='text' onChange={handleChange} ref={textRef} className="textarea textarea-info textarea-bordered textarea-lg w-full" ></textarea>
                        {/* Buttons */}
                        <div className="modal-action flex justify-center">
                            <label htmlFor="my-modal-2" className="btn btn-outline">İptal</label>
                            <label htmlFor="my-modal-2" onClick={handleClick} className="btn btn-success hover:bg-primary">Kaydet</label>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Experience
