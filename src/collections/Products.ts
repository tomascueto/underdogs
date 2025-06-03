import type { CollectionConfig } from 'payload'
import slugify from 'slugify'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'stock', 'status'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (data?.name && !data.slug) {
          data.slug = slugify(data.name, { lower: true })
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'richText',
    },
    {
      name: 'price',
      label: 'Precio',
      type: 'number',
      required: true,
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'number',
      required: true,
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'images',
      label: 'Imágenes',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: true,
    },
    {
      name: 'featured',
      label: 'Producto Destacado',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Meta Title',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Meta Description',
          type: 'textarea',
        },
      ],
    },
  ],
}
