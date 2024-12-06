import type { APIRoute } from "astro";
import { prisma } from "../../utils/prisma";


export const GET: APIRoute = async ({ params, url, redirect }) => {
    const { slug } = params;
    if (!slug) redirect(url.origin)

    const data = await prisma.link.findFirst({
        where: {
            slug
        }
    })

    if (data) {
        // Prevent the url from infinite requests
        // by not allowing the url pointed to be the same as the url used to redirect
        if (data.url.startsWith(url.origin)) {
            return redirect(url.origin);
        } else {
            return redirect(data?.url, 307)
        }
    }
    return redirect(url.origin)
}