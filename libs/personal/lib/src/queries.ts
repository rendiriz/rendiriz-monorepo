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
