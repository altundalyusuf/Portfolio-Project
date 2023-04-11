import React from 'react'
import Header from '../../components/Homepage/Header'
import welcomePic from '../../assets/welcome-pic.jpg';
import Footer from '../../components/Navbar/Footer';

const Home = () => {
    return (
        <div className='bg-slate-50'>
            <h1 className='text-center text-5xl font-bold pt-11 pb-16  bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-violet-500 hover:bg-gradient-to-r hover:from-violet-500 hover:to-amber-300 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300'>Gönderi Akışı</h1>
            {/* Full-width fluid until the `md` breakpoint, then lock to container */}
            <div className="md:container md:mx-auto pb-11">
                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3">
                    {/* Image */}
                    <div className='col-span-2 md:col-span-1 bg-orange-300 flex items-center justify-center'>
                        <div className='w-32 md:w-full bg-slate-700'>
                            <img src={welcomePic} className='w-full' alt="welcome-pic" />
                        </div>
                    </div>
                    {/* Content */}
                    <div className='col-span-2 bg-green-500 text-center flex flex-col justify-between'>
                        <h1 className="text-3xl md:text-4xl font-bold pt-8">Makale Başlığı</h1>
                        <p className="py-6 px-4">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi..</p>
                        <div className="self-end pe-8 mb-5 md:mb-0">
                            <span>- Yusuf Altundal</span>
                        </div>
                        <div className="justify-center pb-5">
                            <button className="btn btn-primary">İçeriği Gör</button>
                        </div>
                    </div>

                    {/* Silebilirsin buradan */}
                    {/* Image */}
                    <div className='col-span-2 md:col-span-1 bg-orange-300 flex items-center justify-center'>
                        <div className='w-32 md:w-full bg-slate-700'>
                            <img src={welcomePic} className='w-full' alt="welcome-pic" />
                        </div>
                    </div>
                    {/* Content */}
                    <div className='col-span-2 bg-green-500 text-center flex flex-col justify-between'>
                        <h1 className="text-3xl md:text-4xl font-bold pt-8">Makale Başlığı</h1>
                        <p className="py-6 px-4">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi..</p>
                        <div className="self-end pe-8 mb-5 md:mb-0">
                            <span>- Yusuf Altundal</span>
                        </div>
                        <div className="justify-center pb-5">
                            <button className="btn btn-primary">İçeriği Gör</button>
                        </div>
                    </div>
                    {/* Image */}
                    <div className='col-span-2 md:col-span-1 bg-orange-300 flex items-center justify-center'>
                        <div className='w-32 md:w-full bg-slate-700'>
                            <img src={welcomePic} className='w-full' alt="welcome-pic" />
                        </div>
                    </div>
                    {/* Content */}
                    <div className='col-span-2 bg-green-500 text-center flex flex-col justify-between'>
                        <h1 className="text-3xl md:text-4xl font-bold pt-8">Makale Başlığı</h1>
                        <p className="py-6 px-4">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi..</p>
                        <div className="self-end pe-8 mb-5 md:mb-0">
                            <span>- Yusuf Altundal</span>
                        </div>
                        <div className="justify-center pb-5">
                            <button className="btn btn-primary">İçeriği Gör</button>
                        </div>
                    </div>
                    {/* Buraya kadar silebilirsin */}
                </div>

                {/* <Header /> */}
            </div>
            <Footer />
        </div>
    )
}

export default Home
