import type { APIRoute } from "astro";
import { prisma } from "../../utils/prisma";
import { getSession } from "auth-astro/server";
import { z } from "astro/zod";

export const GET: APIRoute = async ({ params, url, redirect }) => {

    const { slug } = params;

    const data = await prisma.link.findFirst({
        where: {
            slug
        }
    })

    return redirect(data?.url || url.origin, 307)
}