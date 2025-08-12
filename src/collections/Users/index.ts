import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

import { withUsersCollection } from "payload-auth-plugin/collection";
import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'

export const Users: CollectionConfig = withUsersCollection({
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: "isSuperUser",
      type: "checkbox",
      defaultValue: false
    }
  ],
  timestamps: true,
  hooks: {
    afterDelete: [deleteLinkedAccounts('accounts')],
  }
}
)