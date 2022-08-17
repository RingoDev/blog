import {getDimensionsFromImageURL, getSlugsOfStoryblokFolder, StoryblokClient} from "../../lib/storyblok";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import React from "react";
import {RichText, RichTextType} from "../../components/storyblok/richText";
import {StoryblokComponent, StoryData} from "storyblok-js-client";
import Image from 'next/image'
import {blurDataFromExternalURL} from "../../lib/blurDataFromURL";
import {StoryblokImage} from "../../lib/types/default";
import {StoryParams} from "@storyblok/react";

interface Props {
    story: StoryData<BlogPostType>
}

interface BlurredDataUrl {
    blurDataURL: string
}

export interface BlogPostType extends StoryblokComponent<"blog-post"> {
    text: RichTextType,
    title: string,
    intro: string,
    image: StoryblokImage & BlurredDataUrl
}

export const BlogPost: NextPage<Props> = ({story}) => {
    return (
        <>
            <div className={"bg-zinc-100"}>
                <div style={{padding: "1rem 3rem 3rem 3rem", maxWidth: "90ch", margin: "auto"}}>
                    <h1 className={"font-medium heading text-4xl mb-2"}>{story?.content.title}</h1>
                    <div className={"font-medium text-lg mb-5 text-gray-400"}>{story?.content.intro}</div>
                    <div className={"pb-5"}>
                        <Image placeholder={"blur"} blurDataURL={story.content.image.blurDataURL}
                               height={getDimensionsFromImageURL(story.content.image.filename).height}
                               width={getDimensionsFromImageURL(story.content.image.filename).width}
                               alt={story.content.image.alt}
                               src={story.content.image.filename}/>
                        <div className={"text-sm font-thin"} style={{textAlign: "center"}}>
                            <span>{story.content.image.copyright}</span>
                        </div>
                    </div>
                    <RichText data={story.content.text}/>
                </div>
            </div>
        </>
    )
}


export const getStaticPaths: GetStaticPaths<{ slug: string }> = async (_) => {
    const slugs = await getSlugsOfStoryblokFolder("blog");
    return {
        paths: slugs.map((slug) => (
            {params: {slug}}
        )),
        fallback: false
    };
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {

    if (!context.params || !context.params.slug) {
        return {
            notFound: true
        }

    }

    const params: StoryParams = context.params ?
        {
            version: "draft",
            cv: Date.now() // appends the cache version to get the latest content
        }
        : {version: "published"}

    // loads the story from the Storyblok API
    let story = (await StoryblokClient.getStory(`blog/${context.params.slug}`, params))
        .data.story as StoryData<BlogPostType>

    if (!story) {
        return {
            notFound: true
        }
    }

    // create blurDataURL for Teaser Component
    story.content.image.blurDataURL = await blurDataFromExternalURL(story.content.image.filename)

    // return the story from Storyblok and whether preview mode is active
    return {
        props: {story},
        revalidate: 10,
    }
}

// const theme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 640,
//       md: 960,
//       lg: 1024,
//       xl: 1536,
//     },
//   },
//   palette: {
//     primary: {
//       main: "#283b42",
//     },
//     secondary: {
//       main: '#f0eae6',
//     },
//
//   },
//   typography: {
//     fontFamily: [
//       '"Noto Serif", sans-serif',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//   }, overrides: {
//     MuiTypography: {
//       h1: {
//         fontSize: "1.8rem",
//         margin: "1.25rem 0 1.25rem 0",
//         '@media (min-width:640px)': {
//           fontSize: '2.5rem',
//           margin: "0 0 2rem 0"
//         },
//         fontWeight: 700
//       },
//       h2: {
//         fontSize: "2rem",
//         margin: "1.25rem 0 1.25rem 0",
//         '@media (min-width:640px)': {
//           fontSize: '3rem',
//           margin: "0 0 2rem 0"
//         },
//
//       },
//       h3: {
//         fontSize: "1.5rem",
//         margin: "2rem 0 2rem 0",
//       },
//       body1: {
//         fontSize: '1rem',
//         margin: "0 0 1rem 0",
//         '@media (min-width:640px)': {
//           fontSize: '1.2rem',
//         },
//
//       }
//     }
//   }
// })

export default BlogPost
