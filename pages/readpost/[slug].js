import Head from 'next/head'
import parse from 'html-react-parser'

import Image from 'next/image'
import Link from 'next/link'
import {getDate} from "../../utils/utils";

function Page({ data }) {
    // Render data...
    return (
        <>
        <Head>
        <title>News - {data[0].title.rendered}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={data[0].excerpt.rendered} />
        <meta name="author" content={data[0]['_embedded']['author'][0]['name']} />
        <link rel="icon" href="/favicon.ico" />
        {/* You can add more metadata here, like open graph tags for social media, etc */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`/readpost/${data[0].slug}`} />
        <meta property="og:title" content={data[0].title.rendered} />
        <meta property="og:description" content={data[0].excerpt.rendered} />
        <meta property="og:image" content={data[0]['_embedded']['wp:featuredmedia'][0].media_details.sizes.medium_large['source_url'] } />
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        
        {/* You can add more metadata here, like Twitter tags for social media, etc */}
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`/readpost/${data[0].slug}`} />
        <meta property="twitter:title" content={data[0].title.rendered} />
        <meta property="twitter:description" content={data[0].excerpt.rendered} />
        <meta property="twitter:image" content={data[0]['_embedded']['wp:featuredmedia'][0].media_details.sizes.medium_large['source_url'] } />
        
        </Head>
        <div className="container my-4">
        <h1 className="text-center pb-5 text-secondary" dangerouslySetInnerHTML={{__html: data[0].title.rendered}}></h1>
         <span className='fs-3'>{ getDate(data[0].date) }</span>
         <img className="img-fluid rounded my-2"
         src={data[0]['_embedded']['wp:featuredmedia'][0].media_details.sizes.medium_large['source_url'] }
         alt={data[0].title.rendered} />
         
         <div className="row">
         {parse(data[0].content.rendered)}
         </div>
        </div>
        </>
    )
  }
  
  // This gets called on every request
  export async function getServerSideProps(context) {
   
    const { params, req, res } = context
    const { slug} = params
    // Fetch data from external API
    const response = await fetch(`https://wirally.com/wp-json/wp/v2/posts?_embed&slug=${slug}`)
    
    const data = await response.json()
    
    // Pass data to the page via props
    return { props: { data } }
  }
  
  export default Page