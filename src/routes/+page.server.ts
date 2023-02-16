import PocketBase from 'pocketbase';
import openGraph from 'metatag-crawler';
import type { Actions, Cookies } from '@sveltejs/kit';
import pocketbaseEs from 'pocketbase';
import { PB_URL } from '$env/static/private';


/** @type {import('./$types').Actions} */
export const actions: Actions = {
  default: async ({request, cookies}: {request: Request, cookies: Cookies}) => {
    const data = await request.formData();

    const url = data.get('url');
    const expiration = data.get('expiration');
    const user = data.get('expiration');


    let expDate: any;
   
    if(expiration) expDate = new Date(expiration.toString());

    if(url) {
      
      const pb = new pocketbaseEs(PB_URL);
      pb.authStore.save(cookies.get("SESSION") as string, null)

      const record = await pb
        .collection("links").create({
            url,
            expiration: expDate,
            user: cookies.get("USER_ID")
        });
      await new Promise(async (resolve: any, reject: any) => {
        openGraph(url, async (err: any, data: any) => {


          if(!data) resolve();

          var oldStyleData = {
            title: data?.og?.title || data?.meta?.title,
            description: data?.og?.descriptions || data?.meta?.description,
            images: data?.og?.images,
            videos: data?.og?.videos
          };

          if(!err)
            await pb.collection("links").update(record.id, {
              url,
              expiration: expDate,
              meta: oldStyleData
            });
          resolve();
        });
    });

      return {
        url: `${request.headers.get('origin')}/${record.id}`
      };
    }
  }
};