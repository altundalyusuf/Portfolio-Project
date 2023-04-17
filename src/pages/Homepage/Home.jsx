import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useArticle } from '../../context/PortfolioContext/ArticleContext';
import NewRegister from '../../components/Homepage/NewRegister';
import ShowData from '../../components/Homepage/ShowData';

const Home = () => {

    const { uid } = useAuth();
    const { readArticle, deleteArticle, card } = useArticle();

    // Oturum bilgileri yerleştikten sonra kişinin uid'sine göre veriyi çek.
    useEffect(() => {
        if (uid) {
            readArticle();
        }
    }, [uid])

    return (
        <>
            {card.length === 0 ? (
                <NewRegister />
            ) : (
                <ShowData />
            )
            }
        </>
    )
}

export default Home
