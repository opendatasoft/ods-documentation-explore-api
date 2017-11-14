# Metadata

Metadata is data describing the dataset itself.

Each metadata belongs to a metadata template. There are 3 different types of metadata template:

- `basic`: metadata that users can see. For example, `basic` metadata include the dataset title, the license attached to it data, etc.
- `interop` (for interoperability): metadata usually described in specific standards (e.g. DCAT, INSPIRE), intended for automatic usage by other systems, for interoperability purpose or for regulatory compliance.
- `extra`: metadata intended for specific applications, and not expected to be used by users directly. For example, `extra` metadata contain information about default visualizations on the OpenDataSoft portal.


## Listing metadata template types

> List metadata template types

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/metadata_templates'
```

**HTTP Request**
`GET /api/v2/catalog/metadata_templates`

This endpoint returns the list of all available metadata template types.


## Listing metadata templates for a specific type

> List templates for `basic` type

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/basic'
```

**HTTP Request**
`GET /api/v2/catalog/metadata_templates/<TYPE>`

This endpoint returns the list of existing metadata templates for a chosen type.


## Listing metadata for a specific template

> List metadata for `default` template

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/basic/default'
```

**HTTP Request**
`GET /api/v2/catalog/metadata_templates/<TYPE>/<TEMPLATE>`

This endpoint returns the list of existing metadata for a chosen template.
