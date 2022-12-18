
import PortableText from "react-portable-text"

import { config, urlFor } from '../../sanity'
import { Post } from '../../typings'

import slide2 from '../../public/slides/2.png'

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface Props {
    post: Post;
}

function Post({ post }: Props) {    
  return (
    <div className='bg-gradient-to-tr from-slate-800 to-neutral-900'>
        <Navbar />
        <article className="max-w-[100rem] mx-auto px-5 py-2 rounded-xl border-2 border-blue-500">
            <h1 className='text-3xl font-mono font-semibold mt-10 mb-3 text-white'>{post.title}</h1>
            <h2 className='text-xl font-mono font-light text-gray-200 mb-2'>{post.description}</h2>

            <div className='flex items-center my-5 space-x-2'>
                <img className='h-10 w-10 rounded-full object-cover' src={urlFor(post.author.image)} alt="" />
                <p className='font-extralight text-sm text-gray-300'>
                    Blog post by <span className='text-white'>{post.author.name}</span> - published at {new Date(post._createdAt).toLocaleString()}
                </p>
            </div>
            <div className='mt-7'>
                <PortableText 
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    content={post.body}
                    className='text-gray-100 font-mono text-lg'
                    serializers={{
                        h1: (props: any) => (
                            <h1 className='text-2xl font-bold my-5' {...props} />
                        ),
                        h2: (props: any) => (
                            <h1 className='text-xl font-bold my-5' />
                        ),
                        link: ({ href, children }: any) => (
                            <a className='text-blue-500 hover:underline'>{children}</a>
                        ),
                    }}
                />
            </div>
        </article>
        <Footer />
    </div>
  )
}

export default Post

export const getStaticPaths = async () => {
    const query = `*[_type ==  "posts"]{
        _id,
        slug {
            current
        }
    }`

    const posts = await config.fetch(query)

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps =async ({params}) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
            name,
            image
        },
        'comments': *[
            _type == "comment" &&
            post._ref == ^._id &&
            approved == true
        ],
        description,
        mainImage,
        slug,
        body,
    }`


    const post = await config.fetch(query, {
        slug: params?.slug,
    })

    if(!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        },
        revalidate: 60
    }
}