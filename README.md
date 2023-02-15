# Sveltekit-shortener (powered by PocketBase)

I have been using Next.js for almost 1 year. It is my favourite framework, but SvelteKit seems to be a great alternative (also has unique functionalities). This is a personal project with this goals:
- [ ] Go deeper with Svelte/SvelteKit
- [ ] Use advanced TailwindCSS
- [ ] Build an useful tool for my personal use
- [ ] Develop my first PocketBase backend (I normally build from scratch or use other CMS such as Strapi)

## Roadmap
- [x] Allow users to create links:
  1. User enters a link
  2. Link is saved to database by using a short ID key
  3. When user requests an existing ID, make a 302 redirection (server-side)
- [x] Better SEO
  1. When a link is saved to database, fetch additional metadata
  2. If the request comes from Google, Whatsapp or any other bot, instead of redirecting the user, send the metadata in order to allow link previews
- [x] Allow link expiration (optional)
- [ ] Authentication
    - [ ] Register users using external Oauth provider (google one-click login)
    - [ ] If a registered user creates a link, save the relation (advanced operations)
    - [ ] Allow to share multiple links at once (similar to https://linktr.ee/)


## Design ideas
- [x] Make a "troll" submit button, similar to this one https://twitter.com/VishalMalvi_/status/1578366473411891200
- [x] Dark mode ;)

## Test it now
https://router.alvarolozano.dev

## Local development
1. Clone the repo
2. Make an npm/pnpm/yarn install
3. Get the latest PocketBase binary release
4. Follow the instructions and import the database structure from the `db.json` file
5. Create a .env file and set the `PB_URL` variable to PocketBase's root url
