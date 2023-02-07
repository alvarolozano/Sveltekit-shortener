import PocketBase from 'pocketbase';
import pb from '../lib/pb'
import openGraph from 'metatag-crawler';


/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({request}: {request: Request}) => {
    const data = await request.formData();

    const url = data.get('url');
    if(url) {
      
      const record = await pb
        .create({
          url
        });
      await new Promise(async (resolve: any, reject: any) => {
        openGraph(url, async (err: any, data: any) => {

          var oldStyleData = {
            title: data.og.title || data.meta.title,
            description: data.og.descriptions || data.meta.description,
            images: data.og.images,
            videos: data.og.videos
          };

          if(!err)
            await pb.update(record.id, {
              url,
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