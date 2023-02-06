import PocketBase from 'pocketbase';
import pb from '../lib/pb'

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

      return {
        url: `${request.headers.get('origin')}/${record.id}`
      };
    }
  }
};