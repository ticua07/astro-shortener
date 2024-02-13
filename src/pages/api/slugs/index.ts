import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { prisma } from "../../../utils/prisma"


export const GET: APIRoute = async ({ request }) => {
    const session = await getSession(request).catch((err) => {
        console.log(err)
    });

    if (!session || !session.user?.email) { return new Response(JSON.stringify({ success: false })) }

    try {
        const data = await prisma.link.findMany({
            where: {
                creator: session?.user?.email
            }
        });
        return new Response(JSON.stringify(data));
    } catch (error) {
        console.error("Error retrieving data from Prisma:", error);
        return new Response(JSON.stringify({ success: false }));
    }
}