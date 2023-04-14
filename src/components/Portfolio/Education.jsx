import React, { useEffect, useRef, useState } from 'react'
import { useEducation } from '../../context/PortfolioContext/EducationContext';

const Education = () => {
    const [isLoading, setLoading] = useState(true);
    // state for Modal informations 
    const [modalInput, setModalInput] = useState({
        school: '',
        department: '',
        dates: '',
        grade: ''
    });

    const { educationData, createEducationFirebase, readEducationFirebase } = useEducation();
    const schoolRef = useRef('');
    const departmentRef = useRef('');
    const datesRef = useRef('');
    const gradeRef = useRef('');

    // Modal Input handlechange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleClick = async () => {
        // Save content to firebase
        await createEducationFirebase(modalInput);

        // Read from firebase
        await readEducationFirebase();
        setLoading(true);
        // Clear inside of modal
        schoolRef.current.value = "";
        departmentRef.current.value = "";
        datesRef.current.value = "";
        gradeRef.current.value = "";
    }

    // When education changes or page is mounting, show loading...
    useEffect(() => {
        setLoading(false);
    }, [educationData])

    return (
        <>
            <div className='relative'>
                <h1 id='education' className='text-center text-3xl font-bold pb-8'>Eğitim Bilgileri</h1>
                {/* Edit button to open modal */}
                <label htmlFor="my-modal-1" className="btn btn-square btn-ghost hover:bg-green-500 hover:text-white gap-2 btn-sm md:btn-md absolute top-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </label>
            </div>
            {/* Education Cards */}
            <div className="grid grid-cols-6">
                {/* Arka Planları sil turuncu ve yeşili */}
                <div className='p-3 col-span-6 md:col-span-3 bg-orange-300 rounded flex items-center md:justify-start'>
                    <div className="card w-96 bg-base-100 shadow-xl relative">
                        <label htmlFor="my-modal-1" className="btn btn-square btn-ghost gap-2 btn-sm md:btn-md absolute top-0 right-0 hover:bg-red-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </label>
                        <div className="card-body">
                            <h2 className="card-title" >{isLoading ? 'Yükleniyor...' : educationData.school}</h2>
                            <p>{isLoading ? 'Yükleniyor...' : educationData.department}</p>
                            <p>{isLoading ? 'Yükleniyor...' : educationData.dates}</p>
                            <p>Not: {isLoading ? 'Yükleniyor...' : educationData.grade}</p>
                        </div>
                    </div>
                </div>

                {/* **MODAL** Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-1" className="modal-toggle" />
                <div className="modal modal-middle">
                    <div className="modal-box relative">
                        <h3 className="font-bold text-lg md:text-2xl text-center">Eğitim Bilgilerim</h3>
                        <p className="py-4 text-center">Lütfen aşağıdaki alanları doldurun.</p>
                        {/* Inputs */}
                        <label htmlFor="my-modal-1" className="block">Okul</label>
                        <input type="text" placeholder="Okul" onChange={handleChange} ref={schoolRef} name='school' className="input input-bordered input-info w-full max-w-xs mb-2" />
                        <label htmlFor="my-modal-1" className="block">Bölüm</label>
                        <input type="text" name='department' placeholder="Bölüm" onChange={handleChange} ref={departmentRef} className="input input-bordered input-info w-full max-w-xs mb-2" />
                        <div className='inline-block w-full md:w-5/12 md:me-5 md:text-center md:mt-2'>
                            <label htmlFor="my-modal-1" className="block">Başlangıç - Bitiş Tarihleri</label>
                            <input type="text" placeholder="Tarihler" onChange={handleChange} name='dates' ref={datesRef} className="input input-bordered input-info w-full max-w-xs mb-2" />
                        </div>
                        <div className='inline-block w-full md:w-5/12 md:text-center'>
                            <label htmlFor="my-modal-1" className="block">Not Ortalaması</label>
                            <input type="text" placeholder="Not Ortalaması" onChange={handleChange} name='grade' ref={gradeRef} className="input input-bordered input-info w-full max-w-xs mb-2" />
                        </div>
                        {/* Buttons */}
                        <div className="modal-action flex justify-center">
                            <label htmlFor="my-modal-1" className="btn btn-outline">İptal</label>
                            <label htmlFor="my-modal-1" onClick={handleClick} className="btn">Kaydet</label>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}

        </>
    )
}

export default Education
