import React, { useEffect, useRef, useState } from 'react'
import { storage } from '../../firebase';
import { useArticle } from '../../context/PortfolioContext/ArticleContext';
import { useAuth } from '../../context/AuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const PostForm = () => {
    // state for sending Modal informations to firebase 
    const [modalInput, setModalInput] = useState({
        name: '',
        category: '',
        authorRole: '',
        dates: '',
        text: '',
    });
    // State for photo before converting a url
    const [photo, setPhoto] = useState(null);
    // If uploading; don't click button again
    const [loading, setLoading] = useState(false);

    const { createArticleFirebase, readArticleFirebase } = useArticle();

    const nameRef = useRef('');
    const categoryRef = useRef('');
    const authorRoleRef = useRef('');
    const datesRef = useRef('');
    const textRef = useRef('');
    const photoRef = useRef();


    const { user } = useAuth();

    // If inputs not changed then don't submit
    const condition = !photo || !modalInput.name || !modalInput.category || !modalInput.authorRole || !modalInput.dates || !modalInput.text

    // Modal Input handlechange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    // Handle photo change
    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        setPhoto(file);
    }

    // upload image to storage and get the image URL
    const upload = async (file, currentUser, setLoading) => {
        // Get a unique file name
        const timestamp = Date.now(); // get the current timestamp
        const randomNumber = Math.floor(Math.random() * 1000000); // generate a random number between 0 and 999999
        const fileName = timestamp + '-' + randomNumber + '-' + file.name; // generate a unique file name
        const fileRef = ref(storage, currentUser.uid + '/' + fileName); // set the file reference with the unique file name
        setLoading(true);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef)
        setLoading(false);
        return photoURL
    }

    // Update user informations after submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        let photoURL = await upload(photo, user, setLoading)
        // // Save content to firebase
        await createArticleFirebase({ modalInput, photoURL });
        // // Read from firebase
        await readArticleFirebase();
        alert('Gönderi başarıyla oluşturuldu.');
        // Clear inside of modal
        nameRef.current.value = "";
        categoryRef.current.value = "";
        authorRoleRef.current.value = "";
        datesRef.current.value = "";
        textRef.current.value = "";
        photoRef.current.value = "";

    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center text-3xl font-bold pt-8 py-4'>Gönderi Oluştur</h1>
                <div className="space-y-12">
                    {/* Text Fields */}
                    <div>
                        <p className="mt-1 text-center text-sm leading-6 text-info-content">Gönderinizi oluşturmak için aşağıdaki alanları doldurun.</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-3 md:px-28">

                            {/* Post Title */}
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-primary">
                                    Gönderi Başlığı
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        ref={nameRef}
                                        placeholder='Başlık giriniz'
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Post Category */}
                            <div className="sm:col-span-2 sm:col-start-4">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-primary">
                                    Kategori
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="category"
                                        ref={categoryRef}
                                        onChange={handleChange}
                                        placeholder='Kategori giriniz'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Post Author Job */}
                            <div className="sm:col-span-2 sm:col-start-1 ">
                                <label htmlFor="authorRole" className="block text-sm font-medium leading-6 text-primary">
                                    Mesleğiniz
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="authorRole"
                                        ref={authorRoleRef}
                                        placeholder='Mesleğiniz'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {/* Post Date */}
                            <div className="sm:col-span-2 sm:col-start-4 ">
                                <label htmlFor="dates" className="block text-sm font-medium leading-6 text-primary">
                                    Gönderi Tarihi
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="dates"
                                        ref={datesRef}
                                        placeholder='Tarih giriniz'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Post Image */}
                            <div className="sm:col-span-3 sm:col-start-1">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-primary">
                                    Makale Görseli
                                </label>

                                <div className="mt-2 flex items-center gap-x-3 text-warning">
                                    <input type="file"
                                        ref={photoRef}
                                        name='photo'
                                        onChange={handlePhotoChange}
                                        className="file-input file-input-bordered file-input-sm w-full max-w-sm" />
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="col-span-full">
                                <label htmlFor="text" className="block text-sm font-medium leading-6 text-primary">
                                    Gönderi İçeriği
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        name="text"
                                        placeholder='Gönderi içeriğinizi yazabilirsiniz.'
                                        onChange={handleChange}
                                        rows={5}
                                        ref={textRef}
                                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center justify-center gap-x-6 tooltip" data-tip='Bütün alanları doldurdunuz mu?.'>
                    <button type="button"
                        disabled={loading || condition}
                        className="text-sm font-semibold leading-6 text-info-content">
                        İptal
                    </button>
                    <button
                        type="submit"
                        disabled={loading || condition}
                        className="rounded-md bg-success px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        Oluştur
                    </button>
                </div>
            </form>
        </>
    )
}

export default PostForm
