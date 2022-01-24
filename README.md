# eleventy-plugin-ghost

Import your [Ghost](https://ghost.org) content directly into [Eleventy](https://github.com/11ty/eleventy) as global data.

## Installation

1. Install plugin using npm:

   ```
   npm install @alexs7/eleventy-plugin-ghost
   ```

2. Add plugin to your `.eleventy.js` config, ensuring to add your Ghost url and Content API key. Check out the Ghost docs for [how to create a Content API key](http://www.ghost.org/docs/content-api/):

   ```js
   const pluginGhost = require("eleventy-plugin-ghost");

   require("dotenv").config();
   const { GHOST_URL, GHOST_KEY } = process.env;

   module.exports = eleventyConfig => {
     eleventyConfig.addPlugin(pluginGhost, {
      url: GHOST_URL,
      key: GHOST_KEY,
      cache: process.env.DEV
     });
   };
   ```

   The example above is using `dotenv` with a `.env` file to ensure credentials are **not** stored in the source code. Here's an example of the `.env` file:

   ```text
   GHOST_URL=https://demo.ghost.io
   GHOST_KEY=22444f78447824223cefc48062
   ```

3. Run your Eleventy project and use the global `ghost` data variable to access `posts`, `pages`, `tags`, `authors` and `settings`.

The API will default to the latest version, which is `v4` presently. However passing `version` into the plugin options will set the version returned, as shown in the above code sample.

## Usage

After installing and running you'll be provided with a global `ghost` key, which gives you access to the following:

- `ghost.posts`: An array of all posts in Ghost, including their tags and authors
- `ghost.pages`: An array of all pages in Ghost
- `ghost.tags`: An array of all tags in Ghost, including the number of posts within each tag but filtered to only contain public tags
- `ghost.authors`: An array of all authors in Ghost, including the number of posts within each author
- `ghost.settings`: All settings set in Ghost

All data is cached using [`@11ty/eleventy-cache-assets`](https://www.11ty.dev/docs/plugins/cache/) with a duration of 1 minute. This keeps the local builds fast while still inheriting newly applied content.
