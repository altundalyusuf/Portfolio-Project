import React, { useEffect, useRef, useState } from 'react'
import welcomePic from '../../assets/welcome-pic.jpg';
import { useAuth } from '../../context/AuthContext';
import { useIntro } from '../../context/PortfolioContext/IntroContext';

const Intro = () => {
    const [isLoading, setLoading] = useState(true);
    const { user } = useAuth();
    const { introText, createIntroFirebase, readIntroFirebase } = useIntro();
    const textRef = useRef();

    // Change inner HTML of the intro paragraph when modal is submitted
    const handleClick = async () => {
        // Save content to firebase
        await createIntroFirebase(textRef.current.value);
        // Read from firebase
        await readIntroFirebase();
        setLoading(true);
        // Clear inside of modal
        textRef.current.value = "";
    }

    // When introText changes or page is mounting, show loading...
    useEffect(() => {
        setLoading(false);
    }, [introText])


    return (
        // Grid
        <div id='intro' className="grid grid-cols-2 md:grid-cols-3">
            {/* Arka Planları sil turuncu ve yeşili */}
            {/* Image */}
            <div className='col-span-2 md:col-span-1 bg-orange-300 rounded flex items-center justify-center'>
                <div className='w-32 md:w-full rounded bg-slate-700'>
                    <img src={user.photoURL} className='w-full rounded' alt="profile-photo" />
                </div>
            </div>
            {/* Content */}
            <div className='col-span-2 bg-green-500 rounded text-center flex flex-col justify-center relative'>
                {/* Edit button to open modal */}
                <label htmlFor="my-modal-6" className="btn btn-square btn-ghost gap-2 btn-sm md:btn-md absolute top-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </label>

                <h1 className="text-3xl md:text-4xl font-bold pt-8">{user.displayName}</h1>
                <p className="py-6 px-4">{isLoading ? 'Yükleniyor...' : introText}</p>

                {/* **MODAL** Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                <div className="modal modal-middle">
                    <div className="modal-box relative">
                        <h3 className="font-bold text-lg md:text-2xl">Hakkımda</h3>
                        <p className="py-4">Kendinizi anlattığınız hakkımda kısmını güncelleyebilirsiniz.</p>
                        <textarea placeholder="Kendinizi tanıtın" ref={textRef} className="textarea textarea-info textarea-bordered textarea-lg w-full" ></textarea>
                        {/* Submit veya close button */}
                        <div className="modal-action flex justify-center">
                            <label htmlFor="my-modal-6" className="btn btn-outline">İptal</label>
                            <label htmlFor="my-modal-6" onClick={handleClick} className="btn">Kaydet</label>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Intro
