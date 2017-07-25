# Metadata

Metadata is data describing the dataset itself.

Each metadata belongs to a metadata template. Each metadata template has a type : `basic`, `interop` or `extra`.

- basic: include metadata users can see. This includes the title, the license attached to the data...
- interoperability: metadata usually described in specific standards (such as DCAT or INSPIRE), intended for automatic usage by other systems for interoperability purposes, or for regulatory compliance.
- extra: metadata intended for specific applications, and not expected to be used by users directly. For example, if contains information about default visualizations on the OpenDataSoft portal.

## Metadata template types

> List metadata template types

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/metadata_templates'
```

### HTTP Request

`GET /api/v2/metadata_templates`


## Metadata templates for a specific type

> List templates for `basic` type

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/metadata_templates/basic'
```

### HTTP Request

`GET /api/v2/catalog/metadata_templates/<TYPE>`


## Metadata for a specific template

> List metadata for `default` template

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/metadata_templates/basic/default'
```

### HTTP Request

`GET /api/v2/catalog/metadata_templates/<TYPE>/<TEMPLATE>`

