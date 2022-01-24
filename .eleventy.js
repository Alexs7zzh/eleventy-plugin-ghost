const Cache = require("@11ty/eleventy-cache-assets");

// Get all post data
const getPosts = async ({ url, key, cache }) => {
  const data = await Cache(
    `${url}/ghost/api/v4/content/posts/?key=${key}&limit=all&include=tags,authors`,
    { duration: cache ? "1m" : "0s", type: "json" }
  );

  return data.posts;
};

// Get all page data
const getPages = async ({ url, key, cache }) => {
  const data = await Cache(
    `${url}/ghost/api/v4/content/pages/?key=${key}&limit=all&include=tags,authors`,
    { duration: cache ? "1m" : "0s", type: "json" }
  );

  return data.pages;
};

// Get all tag data
const getTags = async ({ url, key, cache }) => {
  const data = await Cache(
    `${url}/ghost/api/v4/content/tags/?key=${key}&limit=all&include=count.posts`,
    { duration: cache ? "1m" : "0s", type: "json" }
  );

  return data.tags;
};

// Get all author data
const getAuthors = async ({ url, key, cache }) => {
  const data = await Cache(
    `${url}/ghost/api/v4/content/authors/?key=${key}&limit=all&include=count.posts`,
    { duration: cache ? "1m" : "0s", type: "json" }
  );

  return data.authors;
};

// Get all settings data
const getSettings = async ({ url, key, cache }) => {
  const data = await Cache(
    `${url}/ghost/api/v4/content/settings/?key=${key}`,
    { duration: cache ? "1m" : "0s", type: "json" }
  );

  return data.settings;
};

const getContent = async (options) => {
  return {
    posts: await getPosts(options),
    pages: await getPages(options),
    tags: await getTags(options),
    authors: await getAuthors(options),
    settings: await getSettings(options),
  };
};

module.exports = (eleventyConfig, options) => {
  eleventyConfig.addGlobalData("ghost", async () => {
    if (!options.url || !options.key) {
      console.log("Invalid Ghost API key or URL");
    }
    options.cache = options.cache !== undefined ? options.cache : true;

    return await getContent(options);
  });
};
