import React from 'react'
import welcomePic from '../../assets/welcome-pic.jpg';

const NewRegister = () => {
    return (
        <div className="md:container md:mx-auto pb-11">
            <div className='text-center flex flex-col justify-between'>
                <h1 className='text-center text-3xl font-bold pt-11 pb-3 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-violet-500 hover:bg-gradient-to-r hover:from-violet-500 hover:to-amber-300 cursor-pointer'>Portolyo Oluşturucuya Hoşgeldin!</h1>
                <h1 className='text-center text-xl font-bold py-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-violet-500 hover:bg-gradient-to-r hover:from-violet-500 hover:to-orange-500 cursor-pointer'>Üyeliğini tamamladığına göre artık kendi portfolyonu oluşturmaya başlayabilirsin.</h1>
                <h3 className='text-center text-xl font-bold pt-4 pb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-violet-500 hover:bg-gradient-to-r hover:from-violet-500 hover:to-orange-500 cursor-pointer'>Portfolyonu düzenlemeye başlamak için yapman gereken adımlar:</h3>

                <ul className='bg-secondary p-8 rounded'>
                    <li>
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={welcomePic} />
                                </div>
                            </div>
                            <div className="chat-bubble">Öncelikle üst çubukta en sağda yer alan <span className='text-warning'>Özelleştir</span> butonu ile hesabım sayfasına gidebilirsin.</div>
                        </div>
                    </li>
                    <li>
                        <div className="chat chat-end">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={welcomePic} />
                                </div>
                            </div>
                            <div className="chat-bubble">Hesabım sayfasından kullanıcı adını ve profil fotoğrafını ekleyeyip değiştirebilirsin.</div>
                        </div>
                    </li>
                    <li>
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={welcomePic} />
                                </div>
                            </div>
                            <div className="chat-bubble">Yine <span className='text-warning'>Özelleştir</span> sekmesinde bulunan <span className='text-warning'>Ayarlar</span> sayfasına gidebilir ve uygulamanın temasını değiştirebilirsin.</div>
                        </div>
                    </li>
                    <li>
                        <div className="chat chat-end">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={welcomePic} />
                                </div>
                            </div>
                            <div className="chat-bubble"> Özelleştirme ayarlarını yaptıktan sonra portfolyonu oluşturmaya başlayabiliriz.</div>
                        </div>
                    </li>
                    <li>
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={welcomePic} />
                                </div>
                            </div>
                            <div className="chat-bubble">Üst çubukta 2. sırada yer alan <span className='text-warning'>Portfolyom</span> butonuna tıklayarak portfolyo sayfana gidebilirsin.</div>
                        </div>

                    </li>
                    <li>
                        <div className="chat chat-end">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={welcomePic} />
                                </div>
                            </div>
                            <div className="chat-bubble">Burada profil fotoğrafın ve adın otomatik olarak senin için eklenir. <span className='text-error'>Unutma bunları değiştirebilirsin.</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={welcomePic} />
                                </div>
                            </div>
                            <div className="chat-bubble">Portfolyo sayfanda kendini anlatan yazını ekledikten sonra eğitim, deneyimler, yetenekler, sertifikalar ve projelerini ekleyebilirsin.</div>
                        </div>
                    </li>
                    <li>
                        <div className="chat chat-end">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={welcomePic} />
                                </div>
                            </div>
                            <div className="chat-bubble">En altta bulunan <span className='text-warning'>Gönderilerim</span> kısmında paylaştığın makalelerin ufak bir önizlemesi bulunur.</div>
                        </div>
                    </li>
                    <li>
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={welcomePic} />
                                </div>
                            </div>
                            <div className="chat-bubble">Yeni makale eklemek için üst çubukta bulunan <span className='text-warning'>Gönderi Oluştur</span> butonuna basabilir ve açılan sayfada gönderin ile ilgili alanları dolurabilirsin.</div>
                        </div>
                    </li>
                </ul>
                {/* Congrats */}
                <div className="alert alert-info shadow-lg mt-5">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Harika! Artık Portfolyo Oluşturucu'yu kullanmaya hazırsın.</span>
                    </div>
                </div>
                <p></p>
            </div>
        </div >
    )
}

export default NewRegister
