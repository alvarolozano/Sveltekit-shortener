import { PB_URL } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";
import pocketbaseEs from "pocketbase";

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies}: {cookies: Cookies}) {

    const token = cookies.get("SESSION");
    const userId = cookies.get("USER_ID");

    if(token) {
        const pb = new pocketbaseEs(PB_URL);
        pb.authStore.save(token, null);

        if(pb.authStore.isValid) {
            return {
                auth: {
                    token,
                    id: userId
                }
            }
        }
        
    }
    
}