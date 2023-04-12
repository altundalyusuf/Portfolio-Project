import React from 'react'
import Footer from '../../components/Navbar/Footer'
import Articles from '../../components/Portfolio/Articles'
import Intro from '../../components/Portfolio/Intro'
import Education from '../../components/Portfolio/Education'
import Experience from '../../components/Portfolio/Experience'
import Skills from '../../components/Portfolio/Skills'
import Certificates from '../../components/Portfolio/Certificates'
import Projects from '../../components/Portfolio/Projects'
import Breadcrumb from '../../components/Portfolio/Breadcrumb'

const posts = [
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 2,
        title: 'Lorem Ipsum Dolor',
        href: '#',
        description:
            'Okay that\'s a new one. Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Jan 08, 2023',
        datetime: '2023-01-18',
        category: { title: 'Deneme', href: '#' },
        author: {
            name: 'Yusuf Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
]



const Portfolio = () => {
    return (
        <>
            <h1 className='text-center text-3xl font-bold py-8'>Portfolyoma Hoşgeldin!</h1>
            {/* In-page routing */}
            <Breadcrumb />
            {/* Content */}
            <div className="md:container md:mx-auto pb-11">
                <Intro />
                <div className="divider"></div>
                <Education />
                <div className="divider"></div>
                <Experience />
                <div className="divider"></div>
                <Skills />
                <div className="divider"></div>
                <Certificates />
                <div className="divider"></div>
                <Projects />
                <div className="divider"></div>
                <Articles />
            </div>
            <Footer />
        </>
    )
}

export default Portfolio
