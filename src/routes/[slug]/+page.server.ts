import links from "../../lib/pb";
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: any) {
    
    if(params.slug) {

        try {     
            const link = await links.getOne(params.slug);
            throw redirect(302, link.url);
        } catch (error: any) {
            if(error?.status == 302)
                throw error;
            if(error?.status == 404) 
                return {error: true, ...error};
        }
    }
  }