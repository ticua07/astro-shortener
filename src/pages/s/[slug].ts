import type { APIRoute } from "astro";
import { prisma } from "../../utils/prisma";


export const GET: APIRoute = async ({ params, url, redirect }) => {

    const { slug } = params;

    const data = await prisma.link.findFirst({
        where: {
            slug
        }
    })

    if (data && data.url.startsWith(url.origin)) {
        return redirect(url.origin);
    }

    return redirect(data?.url || url.origin, 307)
}