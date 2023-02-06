// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = 'auto';

/** @type {import('./$types').PageLoad} */
export function load({ params }: any) {

    try {
        return {
            shareAPI: window.navigator.canShare()
        }
    } catch {
        return {
            shareAPI: false
        }
    }

}