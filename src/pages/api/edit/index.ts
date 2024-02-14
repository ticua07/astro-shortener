import type { APIRoute } from "astro";
import { prisma } from "../../../utils/prisma";
import { getSession } from "auth-astro/server";
import { z } from "astro/zod";

const schema = z.object({
    url: z.string().url(),
    slug: z.string().max(28),
    description: z.string().max(100).optional()
})



export const GET: APIRoute = async ({ url, request }) => {
    const urlParams = Object.fromEntries(Array.from(url.searchParams))
    const session = await getSession(request).catch((err) => {
        console.log(err)
    });;
    if (!session || !session.user?.email) { return new Response(JSON.stringify({ success: false })) }

    let result = schema.safeParse(urlParams);
    if (result.success) {
        try {
            await prisma.link.update({
                where: {
                    slug: result.data.slug,
                    creator: session.user.email //should be using ID instead of email, but session doesn't have it???
                },
                data: {
                    url: result.data.url || "",
                    description: result.data.description,
                }
            })
        } catch (err) {
            return new Response(JSON.stringify({ success: false }))
        }
    } else {
        return new Response(JSON.stringify({ success: false }))
    }

    return new Response(JSON.stringify({ success: true }));
}