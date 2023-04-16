import React, { useEffect, useState } from 'react'
import welcomePic from '../../assets/welcome-pic.jpg';
import { useAuth } from '../../context/AuthContext';
import { useArticle } from '../../context/PortfolioContext/ArticleContext';
import NewRegister from '../../components/Homepage/NewRegister';

const Home = () => {

    const { uid } = useAuth();
    const { readArticle, deleteArticle, card } = useArticle();

    // Oturum bilgileri yerleştikten sonra kişinin uid'sine göre veriyi çek.
    useEffect(() => {
        if (uid) {
            readArticle();
        }
    }, [uid])

    if (card.lenght === undefined) {
        return (
            <NewRegister />
        )
    }

    return (
        <div className='bg-slate-50'>
            <h1 className='text-center text-5xl font-bold pt-11 pb-16  bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-violet-500 hover:bg-gradient-to-r hover:from-violet-500 hover:to-amber-300 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300'>Gönderi Akışı</h1>
            {/* Full-width fluid until the `md` breakpoint, then lock to container */}
            <div className="md:container md:mx-auto">
                {/* Grid */}
                <div className="grid grid-flow-row grid-12 rounded bg-primary-focus pt-5">

                    {card.map(({ id, data }, index) => (
                        // Arka Planları sil turuncu ve yeşili 
                        // Image 
                        <div key={index}>
                            <div className='col-span-12  flex items-center justify-center'>
                                <div className='w-32 md:w-72 bg-slate-700'>
                                    <img src={data.photo || welcomePic} className='w-full' alt="welcome-pic" />
                                </div>
                            </div>
                            {/* Content */}
                            <div className='col-span-12  text-center flex flex-col justify-between'>
                                <h1 className="text-3xl md:text-4xl font-bold pt-8">{data.name}</h1>
                                <p className="py-6 px-4">{data.text}</p>
                                <div className="self-end pe-8 mb-5 md:mb-0">
                                    <span>{data.category}</span>
                                </div>
                                <div className="self-end pe-8 mb-5 md:mb-0">
                                    <span>{data.dates}</span>
                                </div>
                            </div>
                            <div className="divider"></div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Home
