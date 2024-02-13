import type { APIRoute } from "astro";
import { prisma } from "../../../utils/prisma";
import { getSession } from "auth-astro/server";
import { z } from "astro/zod";

const schema = z.object({
    slug: z.string().max(28),
})

export const GET: APIRoute = async ({ url, request }) => {
    const urlParams = Object.fromEntries(Array.from(url.searchParams))
    const session = await getSession(request);
    if (!session || !session.user?.email) { return new Response(JSON.stringify({ success: false })) }

    let result = schema.safeParse(urlParams);
    if (result.success) {
        const data = result.data

        await prisma.link.delete({
            where: {
                slug: data.slug,
                creator: session?.user?.email || ""
            }
        })
    } else {
        return new Response(JSON.stringify({ success: false }))
    }

    return new Response(JSON.stringify({ success: true }));
}