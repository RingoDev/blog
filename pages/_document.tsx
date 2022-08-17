import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import React from 'react';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {

        return (
            <Html>
                <Head>
                    {/*<!-- Primary Meta Tags -->*/}
                    <meta name="title" content="WebStories | Modernes Webdesign aus Linz"/>
                    <meta name="description"
                          content="Webdesign Linz | Individuelle Webseiten ohne Einschränkungen | Performance | SEO | Rundum-Paket | Headless-CMS"/>

                    {/*<!-- Standard Meta-Data --!>*/}
                    <link rel="apple-touch-icon" sizes="180x180" href={"/icons/apple-touch-icon.png"}/>
                    <link rel="icon" type="image/png" sizes="32x32" href={"/img/icons/favicon-32x32.png"}/>
                    <link rel="icon" type="image/png" sizes="16x16" href={"/img/icons/favicon-16x16.png"}/>
                    <link rel="manifest" href={"/manifest.json"}/>
                    <meta name="msapplication-TileColor" content="#869DAB"/>
                    <meta name="msapplication-TileImage" content="/img/icons/android-chrome-192x192.png"/>
                    <meta name="theme-color" content="#EBEBE4"/>

                    {/*<!-- Open Graph / Facebook -->*/}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://web-stories.at/"/>
                    <meta property="og:title" content="WebStories- Jede Webseite erzählt eine Geschichte"/>
                    <meta property="og:description"
                          content="Webentwicklung und Webdesign das den modernsten Anforderungen der SEO und Benutzerfreundlichkeit entspricht."/>
                    <meta property="og:image" content="https://web-stories.at/img/icons/og-image.jpeg"/>

                    {/*<!-- Twitter -->*/}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content="https://web-stories.at/"/>
                    <meta property="twitter:title" content="WebStories- Jede Webseite erzählt eine Geschichte"/>
                    <meta property="twitter:description"
                          content="Webentwicklung und Webdesign das den modernsten Anforderungen der SEO und Benutzerfreundlichkeit entspricht."/>
                    <meta property="twitter:image" content="https://web-stories.at/img/icons/og-image.jpeg"/>

                    {/*<!-- Google Fonts --!>*/}
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400&display=swap"
                          rel="stylesheet"/>
                    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap"
                          rel="stylesheet"/>

                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument

