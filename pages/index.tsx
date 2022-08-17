import {GetStaticProps} from "next";
import {getDimensionsFromImageURL, StoryblokClient} from "../lib/storyblok";
import {StoriesParams, StoryData} from "storyblok-js-client";
import {BlogPostType} from "./blog/[slug]";
import Link from "next/link";
import Image from "next/image";
import React from "react";


interface Props {
    stories?: StoryData<BlogPostType>[]
}

const Blogs = ({stories}: Props) => {
    if (!stories) {
        return <>Error ....</>
    }
    return (
        <div style={{padding: "3rem", maxWidth: "75ch", margin: "auto"}}>
            {stories.map((s, index) => {
                return (
                    <div key={index}>
                        <Link href={"/blog/" + s.slug}>
                            <a>
                                <div style={{position: "relative"}}>
                                    <Image
                                        placeholder={s.content.image.blurDataURL ? "blur" : undefined}
                                        blurDataURL={s.content.image.blurDataURL}
                                        height={getDimensionsFromImageURL(s.content.image.filename).height}
                                        width={getDimensionsFromImageURL(s.content.image.filename).width}
                                        alt={s.content.image.alt}
                                        src={s.content.image.filename}/>
                                </div>
                                {s.content.title}
                            </a>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Blogs

export const getStaticProps: GetStaticProps<Props> = async (context) => {

    let params: StoriesParams = {
        version: context.preview ? "draft" : "published",
        cv: context.preview ? Date.now() : undefined,
        starts_with: "blog/"
    };


    // todo generate blur data urls
    // todo get stories sorted by publish date
    let stories = (await StoryblokClient.getStories(params))
        .data.stories as StoryData<BlogPostType>[]

    return {
        props: {
            stories
        },
    };
}
