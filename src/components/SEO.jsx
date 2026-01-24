import React from 'react';

export const SEO = ({ title, description, ogImage, twitterHandle }) => {
    const fullTitle = `${title} | Hitha Portfolio
    `;

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
        </>
    );
};
