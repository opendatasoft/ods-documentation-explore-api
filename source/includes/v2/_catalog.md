# Catalog

> List available entrypoints on a catalog

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/'
```

A catalog is considered as a list of datasets for a domain. Catalog operations are all API entrypoints available on datasets.

## Field literal in catalog queries

Some parameters, such as `select`, `where` or `group_by`, in the following entry points accept [field literal](#field-literal)
In catalog search, a field literal can either be a technical field or a metadata.

<div class=“clearfix”></div>
### Dataset technical fields:

>  Use technical field as field literal

```shell
# Count dataset grouped by their features (`features` is a technical field)
curl 'https://examples.opendatasoft.com/api/v2/catalog/aggregates?select=count(*)&group_by=features'
# Note : (since a dataset can have multiple features, total count is not the number of datasets in the domain)
```

Field name | Description
---------- | -----------
datasetid | Human readable dataset identifier
has_records | Boolean field indicating if dataset has records
features | List of dataset features. Possible values: calendar, geo, image, apiproxy, timeserie, aggregate

<div class=“clearfix”></div>
### Dataset metadata

>  Use metadata as field literal

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets?where=default.modified>2015'
# Since modified is a `basic` meta, `where` expression can be simplified to `modified>2015`
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets?where=modified>2015'

# Get datasets that have been downloaded more than a 100 time
# download_count meta must be prefixed with its metadata template: 'explore'
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets?where=explore.download_count>100'
```

All metadata can be used as field literal in query parameters.
They must be fully qualified with their template name. It means that the name of the metadata must be prefixed by its template name followed by a dot: `<template_name>.<metadata_name>`
For basic metadata, this prefix is optionnal.

The list of metadata and their types for a domain can be obtained with the metadata [metadata API](#metadata-templates-for-a-specific-type)


## Search datasets

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

This entrypoint provides a search facility in the dataset catalog.

<aside>
It is not possible to retrieve all datasets from a domain with this API. For that use case, <bold>export</bold> entrypoints must be used.
</aside>

### HTTP Request

`GET /api/v2/catalog/datasets`

### URL Parameters

List of available parameters for dataset search API.

Parameter | Default | Description
--------- | ------- | -----------
where | None | Filter expression used to restrict returned datasets. see [ODSQL documentation](#where-clause)
start | 0 | Index of the first item to return
rows | 10 | Number of items to return. Max value: 100
include_app_metas | false | Explicitely request application metas for each datasets
timezone | UTC | Timezone applied on datetime fields in query and response

<aside>
Value of start + rows cannot exceed 10000. Use export API to download all datasets.
</aside>

## Aggregate datasets

> Aggregation query without group_by

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/aggregates/?select=count(*) as count'
```

> Returns an array with one element

```json
{
    "aggregations": [
        {
            "count": 1234
        }
    ]
}
```

> Aggregation query with a single group_by

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/aggregates/?select=features,count(*) as count&group_by=features'
```

> Returns an array with an object for each `feature` containing feature's name and number of datasets.
```json
{
    "aggregations": [
        {
            "features": "analyze",
            "count": 123
        },
        {
            "features": "geo",
            "count": 45
        },
        ...
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

> Aggregation with an multiple group_by

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/aggregates/?select=features,theme,count(*)&group_by=features,theme'
```

This entrypoint provides an aggregation facility in the datasets catalog.
Aggregation query returns a JSON array containing an object for each group created by the query.
Each JSON object contains key/value pair for each select instruction.
Without `group_by` parameter, it returns an array with only one object.

`select` parameter can only be composed of aggregation function or by aggregated value.
It means that literal_field in select clause outside aggregation function must be present in `group_by` clauses.

If query contains multiple `group_by` clauses, returned groups are combined together.

### HTTP Request

`GET /api/v2/catalog/aggregates`

### URL Parameters

List of available parameters for dataset search API.

Parameter | Default | Description
--------- | ------- | -----------
where | None | Filter expression used to restrict returned datasets. see [where clause in ODSQL documentation](#where-clause)
select | None | Select clause for aggregation. see [select clause in ODSQL documentation](#select-clause)
group_by | None | Group by clause for aggregation. see [group_by clause in ODSQL documentation](#group-by-clause)
timezone | UTC | Timezone applied on datetime fields in query and response
limit | None | Number of items to return


## Export datasets

> Get a list of available export formats

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/'
```

Download all datasets for the requested domain.

### HTTP Request

`GET /api/v2/catalog/exports`

### URL Parameters

List of available parameters for dataset search API.

Parameter | Default | Description
--------- | ------- | -----------
where | None | Filter expression used to restrict returned datasets
include_app_metas | false | Explicitely request application metas for each datasets
timezone | UTC | Timezone applied on datetime fields in query and response


### Json catalog export

> Export datasets in json format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/json'
```

#### HTTP Request
`GET /api/v2/catalog/exports/json`

Export datasets to Json format

### CSV catalog export

> Export datasets in csv format using **,** as delimiter

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/csv?delimiter=,'
```

Export datasets to CSV format. Default separator is `;`. It can be changed with `delimiter` parameter.

#### HTTP Request
`GET /api/v2/catalog/exports/csv`

#### URL Parameters

List of available parameters for dataset search API.

Parameter | Default | Description
--------- | ------- | -----------
delimiter | ; | Delimiter used between column values
list_separator | , | Character used to separate values in list

### XLS catalog export

> Export datasets in xls format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/xls'
```

Export datasets to XLS format using [SpreadsheetML specification](https://en.wikipedia.org/wiki/SpreadsheetML).

#### HTTP Request
`GET /api/v2/catalog/exports/xls`


### RSS catalog export

> Export datasets in rss format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/rss'
```

Export datasets to RSS format.

#### HTTP Request
`GET /api/v2/catalog/exports/rss`

### TTL catalog export

> Export datasets in turle rdf format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/ttl'
```

Export datasets to Turtle RDF format using [DCAT application for data portals in Europe](https://joinup.ec.europa.eu/asset/dcat_application_profile/description).

#### HTTP Request
`GET /api/v2/catalog/exports/ttl`

### RDF catalog export

> Export datasets in rdf-xml format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/rdf'
```

Export datasets to XML-RDF format using [DCAT application for data portals in Europe](https://joinup.ec.europa.eu/asset/dcat_application_profile/description).

#### HTTP Request
`GET /api/v2/catalog/exports/rdf`

### Data.json catalog export

> Export datasets in data.json format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/data.json'
```

Export datasets in [DCAT-AP for swittzerland format](https://handbook.opendata.swiss/en/library/ch-dcat-ap).

#### HTTP Request
`GET /api/v2/catalog/exports/data.json`

## Lookup dataset

> Lookup airbnb-listings dataset

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/airbnb-listings'
```

Retrieve information about a specific datasets

### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>`

