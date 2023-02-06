import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';


const pb = new PocketBase(env.PB_URL);

const links = pb.collection('links');
export default links;