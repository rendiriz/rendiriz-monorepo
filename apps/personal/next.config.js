/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const withPlugins = require('next-compose-plugins');
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });

    // Find the base rule that contains nested rules (which contains css-loader)
    const rules = config.module.rules.find((r) => !!r.oneOf);

    // Interate over the found rules
    rules.oneOf.forEach((loaders) => {
      // Focus on the the loaders that have an array of `use` statements
      if (Array.isArray(loaders.use)) {
        // Iterate over each of the loaders
        loaders.use.forEach((l) => {
          // Only focus on loaders that are an object and have a `loader` property set to `css-loader`
          if (
            typeof l !== 'string' &&
            typeof l.loader === 'string' &&
            /(?<!post)css-loader/.test(l.loader)
          ) {
            // If there are no module options originally set, skip this loader
            if (!l.options.modules) return;
            const { getLocalIdent, ...others } = l.options.modules;

            // Create a new options object with the `getLocalIdent` property set to a function
            l.options = {
              ...l.options,
              modules: {
                ...others,
                getLocalIdent: (ctx, localIdentName, localName, options) => {
                  // If the class name is `dark`, return it instead of hashing it
                  if (localName === 'dark') return localName;
                  // Otherwise, call the original function and return the value
                  return getLocalIdent(ctx, localIdentName, localName, options);
                },
              },
            };
          }
        });
      }
    });

    return config;
  },
  images: {
    domains: ['unsplash.it', 'placehold.co', 'pbs.twimg.com', 'cdn.sanity.io'],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = withPlugins([[withNx]], nextConfig);
