const postFields = `
  _id,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  }
}`;

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;

export const postUpdatedQuery = `*[_type == "post" && _id == $id].slug.current`;

const noteFields = `
  _id,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
`;

export const allNoteQuery = `
*[_type == "note"] | order(date desc, _updatedAt desc) {
  ${noteFields}
}`;

export const noteQuery = `
{
  "note": *[_type == "note" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${noteFields}
  }
}`;

export const noteSlugsQuery = `
*[_type == "note" && defined(slug.current)][].slug.current
`;

export const noteBySlugQuery = `
*[_type == "note" && slug.current == $slug][0] {
  ${noteFields}
}
`;

export const noteUpdatedQuery = `*[_type == "note" && _id == $id].slug.current`;
