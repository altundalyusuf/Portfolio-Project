import React from 'react'

const Projects = () => {
    return (
        <div>
            <h1 id='projects' className='text-center text-3xl font-bold py-8'>Projeler</h1>
            <div className="grid grid-cols-6">
                {/* Arka Planları sil turuncu ve yeşili */}
                <div className='p-3 col-span-6 bg-orange-300 rounded flex items-center md:justify-start'>
                    <div className="card w-96 md:w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">React, Firebase, Vite ve Tailwind ile Portfolyo Projesi</h2>
                            <p className='text-slate-400'>01.2023 - 04.2023</p>
                            <p>Üretken Akademi'nin Yazılımcı Fabrikası programı bitirme projesi olarak yaptığım bu projede çok şey öğrendim. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi distinctio quis voluptatum ipsa! Voluptatum sunt quas, fuga doloribus ipsam ad enim. Nisi animi excepturi ex.</p>
                        </div>
                    </div>
                </div>
                <div className='p-3 col-span-6 bg-orange-300 rounded flex items-center md:justify-start'>
                    <div className="card w-96 md:w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">React, Firebase, Vite ve Tailwind ile Portfolyo Projesi</h2>
                            <p className='text-slate-400'>01.2023 - 04.2023</p>
                            <p>Üretken Akademi'nin Yazılımcı Fabrikası programı bitirme projesi olarak yaptığım bu projede çok şey öğrendim. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi distinctio quis voluptatum ipsa! Voluptatum sunt quas, fuga doloribus ipsam ad enim. Nisi animi excepturi ex.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Projects
