# Catalog

> List available entrypoints on a catalog

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/'
```

> API Response

```json

{
	"links": [{
			"href": "https://examples.opendatasoft.com/api/v2/catalog",
			"rel": "self"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/datasets",
			"rel": "datasets"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/exports",
			"rel": "exports"
		},
		{
			"href": "https://examples.opendatasoft.com/api/v2/catalog/metadata_templates",
			"rel": "metadata_templates"
		}
	]
}

```

A catalog is the list of datasets sourced in a domain.

The catalog API allows to:

- search the datasets of a chosen domain's catalog
- aggregate datasets from a chosen domain's catalog
- export the datasets of a chosen domain's catalog
- lookup a dataset from a domain's catalog

Each endpoint above is documented in its own section, along with its available parameters. Some of these parameters however accept field literals, which are documented right below. We recommend reading the **Field literal in catalog queries** section before diving into the catalog API.


##### Field literal in catalog queries

Some parameters, such as `select`, `where` or `group_by`, accept [field literals](#field-literal), which can either be technical fields or metadata.

###### Dataset technical fields

>  Use technical field as field literal

```shell
# Count dataset grouped by their features
curl 'https://examples.opendatasoft.com/api/v2/catalog/aggregates?select=count(*)&group_by=features'
# Note: (since a dataset can have multiple features, total count is not the number of datasets in the domain)
```

Field name | Description
---------- | -----------
`datasetid` | Human readable dataset identifier
`has_records` | Boolean field indicating if a dataset contains records
`features` | List of dataset features. Possible values: calendar, geo, image, apiproxy, timeserie and aggregate

###### Dataset metadata

>  Use metadata as field literal

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets?where=default.modified>2015'
# Since modified is a `basic` metadata, `where` expression can be simplified to `modified>2015`
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets?where=modified>2015'

# Get datasets that have been downloaded more than a 100 times
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets?where=explore.download_count>100'
```

All metadata can be used as field literal in a query parameter.

Metadata must be fully qualified with their template name. It means that the name of the metadata must be prefixed by its template name, followed by a dot. Example: `<template_name>.<metadata_name>` For basic metadata, this prefix is optional.

The list of metadata and their types for a domain can be obtained with the [metadata API](#listing-metadata-templates-for-a-specific-type).


## Searching datasets

> Get first 10 datasets

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets?rows=10'
```

> Get 10 datasets starting at the 10th result

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets?rows=10&start=10'
```

> Search datasets containing `world` in their metas

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets?where="world"'
```

This endpoint provides a search facility in the dataset catalog.

<aside>
It is not possible to retrieve all datasets from a domain with this API. To do that, export endpoints must be used.
</aside>

##### HTTP Request
`GET /api/v2/catalog/datasets`

##### URL Parameters

Parameter | Default | Description
--------- | ------- | -----------
`where` | None | Filter expression used to restrict returned datasets ([ODSQL documentation](#where-clause))
`start` | 0 | Index of the first item to return
`rows` | 10 | Number of items to return. Max value: 100
`include_app_metas` | false | Explicitely request application metadata for each datasets
`timezone` | UTC | Timezone applied on datetime fields in query and response

<aside>
The value of both `start` and `rows` parameters must not exceed 10000. Use the export API to download all datasets.
</aside>

## Aggregating datasets

> Aggregation query without group_by

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/aggregates/?select=count(*) as count'
```

> API Response

```json
{
    "aggregations": [
        {
            "count": 2
        }
    ]
}
```

> Aggregation query with a single group_by

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/aggregates/?select=features,count(*) as count&group_by=features'
```

> API Response

```json
{
    "aggregations": [
        {
            "count": 2,
            "features": "analyze"
        },
        {
            "count": 2,
            "features": "timeserie"
        },
        {
            "count": 1,
            "features": "geo"
        }
    ]
}
```


> Invalid aggregation with a selected field not present in group_by

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/aggregates/?select=records_count'
```

> Valid aggregation with an aggregation function

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/aggregates/?select=sum(records_count)'
```

> API Response

```json
{
    "aggregations": [
        {
            "sum(records_count)": 3893
        }
    ]
}
```

> Aggregation with an multiple group_by

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/aggregates/?select=features,theme,count(*)&group_by=features,theme'
```

> API Response

```json
{
	"links": [{
		"href": "https://examples.opendatasoft.com/api/v2/catalog/aggregates",
		"rel": "self"
	}],
	"aggregations": [{
			"theme": "Administration, Government, Public finances, Citizenship",
			"count(*)": 1,
			"features": "analyze"
		},
		{
			"theme": "Culture, Heritage",
			"count(*)": 1,
			"features": "analyze"
		},
		{
			"theme": "Administration, Government, Public finances, Citizenship",
			"count(*)": 1,
			"features": "timeserie"
		},
		{
			"theme": "Culture, Heritage",
			"count(*)": 1,
			"features": "timeserie"
		},
		{
			"theme": "Culture, Heritage",
			"count(*)": 1,
			"features": "geo"
		}
	]
}
```

This endpoint provides an aggregation facility in the datasets catalog.

An aggregation query returns a JSON array containing an object for each group created by the query.
Each JSON object contains a key/value pair for each `select` instruction.
However, without the `group_by` parameter, the query returns an array with only one object.

`select` parameter can only be composed of aggregation function or by aggregated value.
It means that literal field in `select` clause outside aggregation function must be present in `group_by` clauses.

If query contains multiple `group_by` clauses, returned groups are combined together.

##### HTTP Request
`GET /api/v2/catalog/aggregates`

##### URL Parameters

Parameter | Default | Description
--------- | ------- | -----------
`where` | None | Filter expression used to restrict returned datasets (see [where clause in ODSQL documentation](#where-clause))
`select` | None | Select clause for aggregation (see [select clause in ODSQL documentation](#select-clause))
`group_by` | None | Group by clause for aggregation (see [group_by clause in ODSQL documentation](#group-by-clause))
`timezone` | UTC | Timezone applied on datetime fields in query and response
`limit` | None | Number of items to return


## Exporting datasets

> Get a list of available export formats

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/'
```

The endpoint allows to download all datasets for a requested domain.

A dataset catalog can be exported in 9 different formats:

- JSON
- CSV
- XLS
- RSS
- TTL
- RDF
- Data.json
- DCAT-AP DE (on demand)
- DCAT-AP CH (on demand)

##### HTTP Request
`GET /api/v2/catalog/exports`


### Exporting a catalog in JSON

> Export datasets in json format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/json'
```

##### HTTP Request
`GET /api/v2/catalog/exports/json`

### Exporting a catalog in CSV

> Export datasets in csv format using **,** as delimiter

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/csv?delimiter=,'
```

In the CSV format, the default separator is `;`. It can be changed with the `delimiter` parameter.

##### HTTP Request
`GET /api/v2/catalog/exports/csv`

##### URL Parameters

Parameter | Default | Description
--------- | ------- | -----------
`delimiter` | ; | Delimiter used between column values
`list_separator` | , | Character used to separate values in a list

### Exporting a catalog in XLS

> Export datasets in xls format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/xls'
```

Export datasets to an XLS format using [SpreadsheetML specification](https://en.wikipedia.org/wiki/SpreadsheetML).

##### HTTP Request
`GET /api/v2/catalog/exports/xls`

### Exporting a catalog in RSS

> Export datasets in rss format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/rss'
```

##### HTTP Request
`GET /api/v2/catalog/exports/rss`

### Exporting a catalog in TTL

> Export datasets in turle rdf format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/ttl'
```

Export datasets to a Turtle RDF format using [DCAT application for data portals in Europe](https://joinup.ec.europa.eu/asset/dcat_application_profile/description).

##### HTTP Request
`GET /api/v2/catalog/exports/ttl`

### Exporting a catalog in RDF

> Export datasets in rdf-xml format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/rdf'
```

Export datasets to an XML-RDF format using [DCAT application for data portals in Europe](https://joinup.ec.europa.eu/asset/dcat_application_profile/description).

##### HTTP Request
`GET /api/v2/catalog/exports/rdf`

### Exporting a catalog in Data.json

> Export datasets in data.json format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/data.json'
```

Export datasets in the [Project Open Data Metadata Schema v1.1](https://project-open-data.cio.gov/) (data.json).

##### HTTP Request
`GET /api/v2/catalog/exports/data.json`


### Exporting a catalog in DCAT-AP DE

> Export datasets in DCAT-AP DE format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/dcat_ap_de'
```

Export datasets in an RDF format, using DCAT application specific to Germany.

<aside>This export format is not available by default: contact OpenDataSoft for its activation.</aside>

##### HTTP Request
`GET /api/v2/catalog/exports/dcat_ap_de`


### Exporting a catalog in DCAT-AP CH

> Export datasets in DCAT-AP CH format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/dcat_ap_ch'
```

Export datasets in an RDF format, using DCAT application specific to Switzerland.

<aside>This export format is not available by default: contact OpenDataSoft for its activation.</aside>

##### HTTP Request
`GET /api/v2/catalog/exports/dcat_ap_ch`


## Looking up a dataset

> Lookup Unesco dataset

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/world-heritage-unesco-list'
```

This endpoint allows to retrieve information about a specific datasets.

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>`
