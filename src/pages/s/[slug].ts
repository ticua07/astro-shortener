import type { APIRoute } from "astro";
import { prisma } from "../../utils/prisma";
import { redis } from "../../utils/redis";


export const GET: APIRoute = async ({ params, url, redirect }) => {
    const { slug } = params;
    if (!slug) redirect(url.origin)

    const cache = await redis.get(slug!)

    if (cache !== null) {
        // Prevent the url from infinite requests
        // by not allowing the url pointed to be the same as the url used to redirect
        if (cache.startsWith(url.origin)) {
            return redirect(url.origin)
        } else {
            console.log("CACHE HIT!")
            return redirect(cache)
        }
    }

    const data = await prisma.link.findFirst({
        where: {
            slug
        }
    })

    if (data) {
        await redis.set(slug!, data?.url, {
            "EX": 30
        })

        console.log("CACHE SET!")

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