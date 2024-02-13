import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { prisma } from "../../../utils/prisma"

    ;

export const GET: APIRoute = async ({ request }) => {
    const session = await getSession(request).catch((err) => {
        console.log(err)
    });

    if (!session || !session.user?.email) { return new Response(JSON.stringify({ success: false })) }

    const data = await prisma.link.findMany({
        where: {
            creator: session?.user?.email
        }
    }).catch((err) => {
        console.log(err)
    });

    return new Response(JSON.stringify(data))
}