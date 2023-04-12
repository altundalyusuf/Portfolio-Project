import React from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'

const PostForm = () => {
    return (
        <>
            <form>
                <h1 className='text-center text-3xl font-bold pt-8 py-4'>Gönderi Oluştur</h1>
                <div className="space-y-12">
                    {/* Text Fields */}
                    <div>
                        <p className="mt-1 text-center text-sm leading-6 text-gray-600">Gönderinizi oluşturmak için aşağıdaki alanları doldurun.</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-3 md:px-28">
                            {/* Post Title */}
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="header" className="block text-sm font-medium leading-6 text-gray-900">
                                    Gönderi Başlığı
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="header"
                                        id="post-header"
                                        placeholder='Başlık giriniz'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Post Category */}
                            <div className="sm:col-span-2 sm:col-start-4">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Kategori
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="category"
                                        id="post-category"
                                        placeholder='Kategori giriniz'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Post Image */}
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Gönderi Görseli
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Dosya yükleyin</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">veya sürükleyip bırakın</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF 10MB'a kadar</p>
                                    </div>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="col-span-full">
                                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                                    Gönderi İçeriği
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="post-content"
                                        name="content"
                                        placeholder='Gönderi içeriğinizi yazabilirsiniz.'
                                        rows={5}
                                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        İptal
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Oluştur
                    </button>
                </div>
            </form>
        </>
    )
}

export default PostForm
