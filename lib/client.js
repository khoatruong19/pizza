import SanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';
export const client = SanityClient({
  projectId: 'l5dkjtra',
  dataset: 'production',
  apiVersion: '2022-07-26',
  useCdn: true,
  token:
    'skYz1z3iu4nUeJWA1cnKc0yy9zLQOleRBm38GEysu1zY8J0TZUY0YMZDu8qkrn0iAzHKnMkptP0a16xz5bATv0evbfwU7bFpb2vgM83xRU08Q7H59OsyXCcwkQ6Co9js745A9u31SIowNV9EJVgv6Z4I8yBjG8MBBiZOsKzsLaCuS083uj4p',
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
