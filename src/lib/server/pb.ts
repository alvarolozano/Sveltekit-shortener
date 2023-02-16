import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';


const pb = new PocketBase(env.PB_URL);

const links = pb.collection('links');

const getChallenge = async () => {
    const tok = await pb.collection("users").listAuthMethods();
    return tok.authProviders;
}

export default links;
export {getChallenge};
