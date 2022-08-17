import {NextApiRequest, NextApiResponse} from "next";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {

    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== process.env.STORYBLOK_PREVIEW_TOKEN || !req.query.slug) {
        return res.status(401).json({message: 'Invalid token'})
    }

    // Fetch the headless CMS to check if the provided `slug` exists
    // getPostBySlug would implement the required fetching logic to the headless CMS
    const slug = req.query.slug
    if (typeof slug !== "string" || slug === "") return res.status(401).json({message: 'Invalid slug'})

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})

    // to allow for the cookie to be set in the storyblok iframe
    const cookies = res.getHeader('Set-Cookie')
    if (typeof cookies !== "string" && typeof cookies !== "number" && cookies !== undefined)
        res.setHeader('Set-Cookie', cookies.map((cookie) => cookie.replace('SameSite=Lax', 'SameSite=None;Secure')))

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.redirect(307, "/" + slug)
}

export default handleRequest