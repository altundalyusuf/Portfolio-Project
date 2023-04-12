import React from 'react'

const Experience = () => {
    return (
        <>
            <h1 id='experience' className='text-center text-3xl font-bold py-8'>Deneyimler</h1>
            {/* Experience Cards */}
            <div className="grid grid-cols-6">
                {/* Arka Planları sil turuncu ve yeşili */}
                <div className='p-3 col-span-6 bg-orange-300 rounded flex items-center md:justify-start'>
                    <div className="card w-96 md:w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Yazılımcı Fabrikası Yazılım Geliştirici</h2>
                            <p>Üretken Akademi</p>
                            <p className='text-slate-400'>01.2023 - 04.2023</p>
                            <p className='text-slate-400'>İstanbul</p>
                            <p>Üretken Akademi'nin düzenlediği React - Front - End Yazılımcı Fabrikası'na katıldım. React, JavaScript, Firebase, HTML ve CSS hakkında çok şey öğrendim, pratik yaptım ve projeler yaptım. 8 hafta boyunca 8 projeyi tamamladıktan sonra bitirme haftasında verilen 8 projeyi ve bitirme projemi yaptım. Tüm projelerime GitHub hesabımdan ulaşabilirsiniz.</p>
                        </div>
                    </div>
                </div>
                <div className='p-3 col-span-6 bg-orange-300 rounded flex items-center md:justify-start'>
                    <div className="card w-96 md:w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">İş Analisti</h2>
                            <p>Infonal</p>
                            <p className='text-slate-400'>10.2021 - 01.2022</p>
                            <p className='text-slate-400'>İstanbul</p>
                            <p>Bu dönemde; İş analistinin kim olduğunu, ne iş yaptığını, yazılım geliştirme süreçlerini, analizlerin nasıl yapıldığını öğrendim. Bunların yanı sıra Jira, Slack gibi teknolojileri de kullanma fırsatım oldu.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Experience
