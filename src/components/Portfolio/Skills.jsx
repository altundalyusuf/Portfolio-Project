import React, { useEffect, useRef, useState } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useSkill } from '../../context/PortfolioContext/SkillContext'
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const Skills = () => {

    const { uid } = useAuth()

    // state for sending Modal informations to firebase 
    const [modalInput, setModalInput] = useState({
        name: '',
    });

    const { writeSkill, readSkill, deleteSkill, card } = useSkill();

    const nameRef = useRef('');

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
        await writeSkill(modalInput);
        // Read from firebase
        await readSkill();
        // Clear inside of modal
        nameRef.current.value = "";
    }

    const handleDelete = async (id) => {
        await deleteSkill(id);
        await readSkill();
    }


    // Oturum bilgileri yerleştikten sonra kişinin uid'sine göre veriyi çek.
    useEffect(() => {
        if (uid) {
            readSkill();
        }
    }, [uid])



    return (
        <>
            <div className='relative'>
                <h1 id='skills' className='text-center text-3xl font-bold py-8'>Yetenekler</h1>
                {/* Add button */}
                <label htmlFor="my-modal-4" className="btn btn-square btn-ghost hover:bg-green-500 hover:text-white gap-2 btn-sm md:btn-md absolute top-5 right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </label>
            </div>

            {card &&
                card.map(({ id, data }, index) => (
                    <div key={index} className="badge badge-primary text-black hover:scale-125 hover:me-5 hover:cursor-pointer gap-2 me-2">
                        <svg onClick={() => handleDelete(id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 hover:cursor-pointer stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        {data?.name}
                    </div>
                ))}


            {/* **MODAL** Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className="modal modal-middle text-center">
                <div className="modal-box relative">
                    <h3 className="font-bold text-lg md:text-2xl mb-4">Yeteneklerim</h3>
                    {/* Inputs */}
                    <label htmlFor="my-modal-4" className="block">Yetenek Adı</label>
                    <input type="text" placeholder="Yetenek Adı" onChange={handleChange} ref={nameRef} name='name' className="mt-3 input input-bordered input-info w-full max-w-xs mb-2" />
                    {/* Buttons */}
                    <div className="modal-action flex justify-center">
                        <label htmlFor="my-modal-4" className="btn btn-outline">İptal</label>
                        <label htmlFor="my-modal-4" onClick={handleClick} className="btn btn-success hover:bg-primary">Kaydet</label>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Skills
