import React from 'react'

const Certificates = () => {
    return (
        <>
            <h1 id='certificates' className='text-center text-3xl font-bold py-8'>Sertifikalar</h1>
            <div className="grid grid-cols-6">
                {/* Arka Planları sil turuncu ve yeşili */}
                <div className='p-3 col-span-6 md:col-span-3 bg-orange-300 rounded flex items-center md:justify-start'>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">React 101</h2>
                            <p>Üretken Akademi</p>
                            <p>04.2023</p>
                        </div>
                    </div>
                </div>
                <div className='p-3 col-span-6 md:col-span-3 bg-orange-300 flex items-center md:justify-start'>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">İstanbul Medeniyet Üniversitesi</h2>
                            <p>Bilgisayar Mühendisliği</p>
                            <p>2019 - 2023</p>
                            <p>Not: 2,87</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Certificates
