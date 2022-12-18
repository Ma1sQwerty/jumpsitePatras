import type { NextPage } from 'next'
import About from '../components/About'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import LaunchPage from '../components/LaunchPage'
import Members from '../components/Members'
import Navbar from '../components/Navbar'
import Purpose from '../components/Purpose'
import RecentProjects from '../components/RecentProjects'
import { config } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

function Home ({ posts }: Props) {
  return (
    <div className="bg-gradient-to-tr from-slate-700 via-slate-800 to-neutral-800 mx-auto">
      <Navbar />
      <LaunchPage />
      <RecentProjects props={posts.slice(0,2)} />
      <About />
      <Purpose />
      <Members />
      <ContactForm />
      <Footer />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[ _type == "post"]{
    _id,
    title,
    author-> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await config.fetch(query)

  return {
    props: {
      posts,
    }
  }
}

export default Home
