import type { APIRoute } from "astro";
import { prisma } from "../../utils/prisma";

;

export const GET: APIRoute = async ({ params, url, redirect }) => {

    const { slug } = params;

    const data = await prisma.link.findFirst({
        where: {
            slug
        }
    })

    return redirect(data?.url || url.origin, 307)
}