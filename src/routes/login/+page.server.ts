import { env } from "$env/dynamic/private";
import { getChallenge } from "$lib/server/pb";
import { redirect, type Cookies } from "@sveltejs/kit";
import pocketbaseEs from "pocketbase";

/** @type {import('./$types').PageServerLoad} */
export async function load({url, cookies, request}: {url: URL, cookies: Cookies, request: Request}) {

    if(!url.searchParams.has("code")) {
        console.log("arguments");
        const challenge = await getChallenge();
        cookies.set("verifier", challenge[0].codeVerifier);
        throw redirect(302, challenge[0].authUrl + `${url.origin}/login`);
    }

    else {
        const pb = new pocketbaseEs(env.PB_URL);
        const challenge = cookies.get("verifier");

        const token = await pb.collection("users").authWithOAuth2(
            'google',
            url.searchParams.get("code") as string,
            challenge as string,
            `${url.origin}/login`
        )

        cookies.set("SESSION", token.token);
        cookies.set("USER_ID", token.record.id);
        cookies.delete("verifier");

        throw redirect(302, "/");
    }
}