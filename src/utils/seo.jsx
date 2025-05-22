import React from 'react';
import Head from 'next/head';

const SEO = ({ 
    title, 
    description, 
    keywords, 
    image, 
    url, 
    author 
}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": title,
                    "url": url,
                    "author": {
                        "@type": "Person",
                        "name": author
                    }
                })}
            </script>
            {/* Add more meta tags as needed */}
        </Head>
    );
};

export default SEO;
