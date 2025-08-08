import { CollectionConfig } from "payload";

const Questions: CollectionConfig = {
  slug: 'questions',
  admin: {
    useAsTitle: 'question',
  },
  access: {
    read: ({ req }) => !!req.user, // hanya moderator (login) yang bisa lihat
    create: () => true, // publik bisa kirim pertanyaan
    delete: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'question',
      type: 'textarea',
      required: true,
    },
    {
      name: 'conference',
      type: 'relationship',
      relationTo: 'conferences',
      required: true,
    },
  ],
};

export default Questions;
