import React, { useEffect, useRef, useState } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useProject } from '../../context/PortfolioContext/ProjectContext';

const Projects = () => {

    // state for sending Modal informations to firebase 
    const [modalInput, setModalInput] = useState({
        name: '',
        dates: '',
        text: '',
    });
    // state for when we read from firestore
    const [card, setCard] = useState([]);

    const { createProjectFirebase, readProjectFirebase, deleteProject } = useProject();

    const nameRef = useRef('');
    const datesRef = useRef('');
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
        await createProjectFirebase(modalInput);
        // Read from firebase
        await readProjectFirebase();
        // Clear inside of modal
        nameRef.current.value = "";
        datesRef.current.value = "";
        textRef.current.value = "";
    }

    const handleDelete = async (dataID) => {
        deleteProject(dataID);
    }


    // Read data from firebase
    useEffect(() => {
        const q = query(collection(db, 'projectCollection'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let projects = [];
            querySnapshot.forEach((doc) => {
                projects.push({ ...doc.data(), id: doc.id });
            });
            setCard(projects);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <div className='relative'>
                <h1 id='projects' className='text-center text-3xl font-bold py-8'>Projeler</h1>
                <label htmlFor="my-modal-5" className="btn btn-square btn-ghost hover:bg-green-500 hover:text-white gap-2 btn-sm md:btn-md absolute top-5 right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </label>
            </div>
            <div className="grid grid-cols-6">
                {/* Arka Planları sil turuncu ve yeşili */}
                {card &&
                    card.map((data) => (
                        <div key={data.id} className='p-3 col-span-6 bg-orange-300 rounded flex items-center md:justify-start'>
                            <div className="card w-96 md:w-full bg-base-100 shadow-xl relative">
                                <label onClick={() => handleDelete(data.id)} className="btn btn-square btn-ghost gap-2 btn-sm md:btn-md absolute top-0 right-0 hover:bg-red-400 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </label>
                                <div className="card-body">
                                    <h2 className="card-title">{data?.name}</h2>
                                    <p className='text-slate-400'>{data?.dates}</p>
                                    <p>{data?.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}


                {/* **MODAL** Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                <div className="modal modal-middle">
                    <div className="modal-box relative">
                        <h3 className="font-bold text-lg md:text-2xl text-center">Projelerim</h3>
                        <p className="py-4 text-center">Lütfen aşağıdaki alanları doldurun.</p>
                        {/* Inputs */}
                        <label htmlFor="my-modal-5" className="block">Proje Adı</label>
                        <input type="text" placeholder="Proje Adı" onChange={handleChange} ref={nameRef} name='name' className="input input-bordered input-info w-full max-w-xs mb-2" />
                        <label htmlFor="my-modal-5" className="block">Başlangıç - Bitiş Tarihi</label>
                        <input type="text" name='dates' placeholder="Tarihler" onChange={handleChange} ref={datesRef} className="input input-bordered input-info w-full max-w-xs mb-2" />
                        <label htmlFor="my-modal-5" className="block">Açıklama</label>
                        <textarea placeholder="Projenizi açıklayabilirsiniz" name='text' onChange={handleChange} ref={textRef} className="textarea textarea-info textarea-bordered textarea-lg w-full" ></textarea>
                        {/* Buttons */}
                        <div className="modal-action flex justify-center">
                            <label htmlFor="my-modal-5" className="btn btn-outline">İptal</label>
                            <label htmlFor="my-modal-5" onClick={handleClick} className="btn">Kaydet</label>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Projects
