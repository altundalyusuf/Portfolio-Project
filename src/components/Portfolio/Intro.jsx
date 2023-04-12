import React from 'react'
import welcomePic from '../../assets/welcome-pic.jpg';

const Intro = () => {
    return (
        // Grid
        <div id='intro' className="grid grid-cols-2 md:grid-cols-3">
            {/* Arka Planları sil turuncu ve yeşili */}
            {/* Image */}
            <div className='col-span-2 md:col-span-1 bg-orange-300 rounded flex items-center justify-center'>
                <div className='w-32 md:w-full rounded bg-slate-700'>
                    <img src={welcomePic} className='w-full rounded' alt="profile-photo" />
                </div>
            </div>
            {/* Content */}
            <div className='col-span-2 bg-green-500 rounded text-center flex flex-col justify-center'>
                <h1 className="text-3xl md:text-4xl font-bold pt-8">Yusuf Altundal</h1>
                <p className="py-6 px-4">Benim kim olduğuma dair, hedeflerim vs. vs.
                    <br /> Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi..</p>
            </div>
        </div>
    )
}

export default Intro
