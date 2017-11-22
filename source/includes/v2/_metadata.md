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

> API response:

```json
{
	"links": [{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates",
			"rel": "self"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/interop",
			"rel": "Interoperatibility"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/basic",
			"rel": "Basic"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/extra",
			"rel": "Extra"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/admin",
			"rel": "Admin"
		}
	]
}
```

##### HTTP Request

`GET /api/v2/catalog/metadata_templates`

This endpoint returns the list of all available metadata template types.


## Listing metadata templates for a specific type

> List templates for `basic` type

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/basic'
```

> API response:

```json
{
	"links": [{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/basic",
			"rel": "self"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates",
			"rel": "metadata_templates"
		}
	],
	"metadata_templates": [{
		"links": [{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/basic/default",
			"rel": "self"
		}],
		"matadata_template": {
			"type": "basic",
			"name": "default",
			"schema": [{
					"widget": "textinput",
					"name": "title",
					"uri": "http://purl.org/dc/terms/title",
					"label": "Title",
					"values": null,
					"self_suggest": false,
					"allow_empty": false,
					"help_text": null,
					"hidden": true,
					"type": "text",
					"values_domain_property": null
				},
				{
					"widget": "richtextinput",
					"name": "description",
					"uri": "http://purl.org/dc/terms/description",
					"label": "Description",
					"values": null,
					"self_suggest": false,
					"allow_empty": true,
					"help_text": null,
					"hidden": false,
					"type": "longstring",
					"values_domain_property": null
				},
                ...
			]
		}
	}]
}
```

##### HTTP Request

`GET /api/v2/catalog/metadata_templates/<TYPE>`

This endpoint returns the list of existing metadata templates for a chosen type.


## Listing metadata for a specific template

> List metadata for `default` template

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/basic/default'
```


> API response:

```json
{
	"links": [{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/basic/default",
			"rel": "self"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates/basic",
			"rel": "basic"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates",
			"rel": "metadata_templates"
		}
	],
	"metadata_template": {
		"type": "basic",
		"name": "default",
		"schema": [{
				"widget": "textinput",
				"name": "title",
				"uri": "http://purl.org/dc/terms/title",
				"label": "Title",
				"values": null,
				"self_suggest": false,
				"allow_empty": false,
				"help_text": null,
				"hidden": true,
				"type": "text",
				"values_domain_property": null
			},
			{
				"widget": "richtextinput",
				"name": "description",
				"uri": "http://purl.org/dc/terms/description",
				"label": "Description",
				"values": null,
				"self_suggest": false,
				"allow_empty": true,
				"help_text": null,
				"hidden": false,
				"type": "longstring",
				"values_domain_property": null
			},
			{
				"widget": "multidatalist",
				"name": "theme",
				"uri": "http://www.w3.org/ns/dcat#theme",
				"label": "Themes",
				"values": null,
				"self_suggest": false,
				"allow_empty": true,
				"help_text": null,
				"hidden": false,
				"type": "list",
				"values_domain_property": "metadata.themes"
			},
            ...
		]
	}
}
```

##### HTTP Request

`GET /api/v2/catalog/metadata_templates/<TYPE>/<TEMPLATE>`

This endpoint returns the list of existing metadata for a chosen template.
