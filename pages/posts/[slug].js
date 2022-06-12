import Head from 'next/head'
import Link from "next/link"

import {getPost, getSlugs} from "../../utils/wordpress";
import {getDate} from "../../utils/utils";

export default function PostPage({post}){
    return (
        <>
        <Head>
        <title>News - {post.title.rendered}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={post.excerpt.rendered} />
        <meta name="author" content={post['_embedded']['author'][0]['name']} />
        <link rel="icon" href="/favicon.ico" />
        {/* You can add more metadata here, like open graph tags for social media, etc */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`/posts/${post.slug}`} />
        <meta property="og:title" content={post.title.rendered} />
        <meta property="og:description" content={post.excerpt.rendered} />
        <meta property="og:image" content={post['_embedded']['wp:featuredmedia'][0].media_details.sizes.medium_large['source_url']} />
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        
        {/* You can add more metadata here, like Twitter tags for social media, etc */}
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`/posts/${post.slug}`} />
        <meta property="twitter:title" content={post.title.rendered} />
        <meta property="twitter:description" content={post.excerpt.rendered} />
        <meta property="twitter:image" content={post['_embedded']['wp:featuredmedia'][0].media_details.sizes.medium_large['source_url']} />
      </Head>

        <div className="container pt-5 pb-5">
       
            <h1 className="text-center pb-5" dangerouslySetInnerHTML={{__html: post.title.rendered}}></h1>
            <span className='fs-3'>{ getDate(post.date) }</span>
            <img className="img-fluid rounded" alt={post.title.rendered} src={post['_embedded']['wp:featuredmedia'][0].media_details.sizes.medium_large['source_url']} />
            <div className="card-text pb-5 mt-3" dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
            <Link href="/">
                <a className="btn btn-primary">Back to Home</a>
            </Link>
        </div>
        </>
    )
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {

    const paths = await getSlugs("posts");
  
    return {
        paths,
        //this option below renders in the server (at request time) pages that were not rendered at build time
        //e.g when a new blogpost is added to the app
        fallback: 'blocking'
    }
  
  }
  
//access the router, get the id, and get the data for that post

export async function getStaticProps({ params }) {

const post = await getPost(params.slug);

return {
    props: {
    post
    },
    revalidate: 10, // In seconds
}

}

