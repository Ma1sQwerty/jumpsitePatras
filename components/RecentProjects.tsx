import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../sanity'
import { Post } from '../typings'


export default function RecentProjects(props: Post) {  
  return (
    <div className="max-w-[1920px] mx-auto">
      <h2 className='mx-5 mb-3 mt-10 text-3xl font-semibold font-mono text-white'>Recent Posts:</h2>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {props.props.map((post:any) => {
          return (
            <Link href={'/blogs/' + post.slug.current} className='px-5 py-2 bg-slate-900 mx-5 rounded-xl mb-5 xl:px-6 xl:py-5 hover:scale-[101%] transition-all duration-200'>
              <h1 className='text-white text-3xl font-mono mb-4 font-bold'>{post.title}</h1>
              <img src={urlFor(post.mainImage)} alt="" className='mb-2 w-full object-cover h-72 md:h-52 lg:h-64 xl:h-[25rem] 2xl:h-[27rem] rounded-xl' />
              <p className='text-white text-xl font-mono lg:text-2xl lg:my-2'>{post.description}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}