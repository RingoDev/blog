import Storyblok from 'storyblok-js-client'

export const StoryblokClient = new Storyblok({
    accessToken: process.env.STORYBLOK_TOKEN
})

export const getSlugsOfStoryblokFolder = async (path: string): Promise<string[]> => {
    const stories = await StoryblokClient.getStories({
        starts_with: path,
        version: "draft", cv: Date.now()
    })
    return stories.data.stories.map(s => s.slug)
}

/**
 * Decodes the dimension of an image hosted on storyblok such as
 * https://a.storyblok.com/f/170867/5848x3899/c31e930bf8/workstation-unsplash.jpg&w=3840&q=75
 * to
 * {width:5848, height:3899}
 */
export const getDimensionsFromImageURL = (url: string) => {
    return {
        width: url.split('/')[5].split('x')[0],
        height: url.split('/')[5].split('x')[1]
    }
}

export default Storyblok
