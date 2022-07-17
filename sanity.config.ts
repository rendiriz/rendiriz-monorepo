import { createConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { markdownSchema } from 'sanity-plugin-markdown';

export default createConfig({
  name: 'default',
  title: 'rendiriz.com',
  projectId: '36fprbnn',
  dataset: 'production',
  plugins: [deskTool(), markdownSchema()],
  schema: {
    types: [
      {
        name: 'post',
        type: 'document',
        title: 'Post',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
            },
          },
          {
            name: 'content',
            title: 'Content',
            type: 'markdown',
          },
          {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'string',
          },
          {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
          },
          {
            name: 'date',
            title: 'Date',
            type: 'datetime',
          },
        ],
      },
      {
        name: 'note',
        type: 'document',
        title: 'Note',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
            },
          },
          {
            name: 'content',
            title: 'Content',
            type: 'markdown',
          },
          {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'string',
          },
          {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
          },
          {
            name: 'date',
            title: 'Date',
            type: 'datetime',
          },
        ],
      },
    ],
  },
});
