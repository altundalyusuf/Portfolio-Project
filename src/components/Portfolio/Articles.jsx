import React, { useEffect, useRef } from 'react'
import { useArticle } from '../../context/PortfolioContext/ArticleContext';
import { useAuth } from '../../context/AuthContext';



const Articles = () => {

    const { user, uid } = useAuth();

    // For modal delete button to get document id of deleting article
    const deleteRef = useRef();

    const { readArticle, deleteArticle, card } = useArticle();

    const handleDelete = async (id) => {
        await deleteArticle(id);
        await readArticle();
    }

    // Oturum bilgileri yerleştikten sonra kişinin uid'sine göre veriyi çek.
    useEffect(() => {
        if (uid) {
            readArticle();
        }
    }, [uid])

    return (
        <>
            <div id='articles' className="bg-white pb-32 pt-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-center text-3xl md:ps-36 font-bold tracking-tight text-gray-900 sm:text-4xl ">Gönderilerim</h2>
                        <p className="mt-2 text-center text-lg leading-8 md:ps-36 text-gray-600">
                            Daha fazlasını öğrenmek için takip etmeyi unutmayın 😇
                        </p>
                        <p className="mt-1 text-center text-sm leading-8 md:ps-36 text-gray-600">
                            (Gönderi oluştur sayfasından yeni gönderiler oluşturabilirsiniz)
                        </p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-7 sm:pt-7 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {card.map(({ id, data }, index) => (
                            <article key={index} className="flex max-w-xl flex-col items-start justify-between relative">
                                <div className='w-32 md:w-full bg-slate-700 flex items-center justify-center'>
                                    <label onClick={() => deleteRef.current = id} htmlFor="my-modal-7" className="btn btn-square btn-error gap-2 btn-sm md:btn-md absolute top-0 right-0 hover:bg-red-400 hover:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </label>
                                    <img src={data.photo} className='w-full md:w-48 lg:w-full h-fit' alt="welcome-pic" />
                                </div>
                                <div className="flex items-center gap-x-4 text-xs text-gray-500">
                                    {/* <time dateTime={data.datetime} className="text-gray-500"> */}
                                    {data.dates}
                                    {/* </time> */}
                                    <a
                                        // href={post.category.href}
                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                    >
                                        {data.category}
                                    </a>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a
                                        // href={post.href}
                                        >
                                            <span className="absolute inset-0" />
                                            {data.name}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{data.text}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img src={user.photoURL} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <a
                                            // href={post.author.href}
                                            >
                                                <span className="absolute inset-0" />
                                                {user.displayName}
                                            </a>
                                        </p>
                                        <p className="text-gray-600">{data.authorRole}</p>
                                    </div>
                                </div>
                            </article>
                        ))}


                        {/* **MODAL** Put this part before </body> tag */}
                        <input type="checkbox" id="my-modal-7" className="modal-toggle" />
                        <div className="modal modal-middle">
                            <div className="modal-box relative">
                                <h3 className="font-bold text-lg md:text-2xl text-center">Gönderi silinsin mi?</h3>
                                <p className="py-4 text-center">Emin misiniz?</p>
                                {/* Buttons */}
                                <div className="modal-action flex justify-center">
                                    <label htmlFor="my-modal-7" className="btn btn-outline">İptal</label>
                                    <label htmlFor="my-modal-7" ref={deleteRef} onClick={() => handleDelete(deleteRef.current)} className="btn btn-error text-white">Sil</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Articles
