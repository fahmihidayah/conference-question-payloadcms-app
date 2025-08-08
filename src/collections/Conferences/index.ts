import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload";


const Conferences: CollectionConfig = {
  slug: 'conferences',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    // read: ({ req }) => !!req.user, // hanya moderator (login) yang bisa lihat
    // create: ({ req }) => !!req.user,
    // update: ({ req }) => !!req.user,
    // delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    ...slugField(),
    {
      name: 'questions',
      type: 'relationship',
      relationTo: 'questions',
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name : 'user',
      type : 'relationship',
      relationTo : 'users'
    }
  ],
  hooks : {
    beforeChange: [
      async ({ req, data, operation }) => {
        // Auto-assign user on create
        if (operation === 'create' && req.user) {
          data.user = req.user.id;
        }
        return data;
      }
    ],
  }
};

export default Conferences;
