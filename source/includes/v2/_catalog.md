# Catalog operations

> List available entrypoints on a catalog

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/'
```

A catalog is considered as a list of datasets for a domain. Catalog operations are all API entrypoints available on datasets.


## Search datasets

> Get first 10 datasets

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/datasets?rows=10'
```

> Get 10 datasets starting at the 10th result

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/datasets?rows=10&start=10'
```

> Search datasets containing `water` in their metas

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/datasets?where="water"'
```

This entrypoint provides a search facility in the dataset catalog.

<aside>
It is not possible to retrieve all datasets from a domain with this API. For that use case, <bold>export</bold> entrypoints must be used.
</aside>


### HTTP Request

`GET /api/v2/catalog/datasets`

### URL Parameters

List of available parameters for dataset search API. Each of these parameter has his own sub section for a more detailed description.

Parameter | Default | Description
--------- | ------- | -----------
where | None | Filter expression used to restrict returned datasets
start | 0 | Index of the first item to return
rows | 10 | Number of items to return. Max value : 100
include_app_metas | false | Explicitely request application metas for each datasets
timezone | UTC | Timezone applied on datetime fields in query and response

<aside>
Value of start + rows cannot exceed 10000. Use export API to download all datasets.
</aside>

### Requestable fields

> Filter on `default.modified` basic meta

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/datasets?where=default.modified>2015'
```

> Since modified is a `basic` meta, `where` expression can be simplified to `modified>2015`

`where` and `sort` expressions can contain field name from dataset. These fields can either be technical dataset fields or metadata.

List of technical fields : 

Field name | Description
---------- | -----------
datasetid | Human readable dataset identifier
has_records | Boolean field indicating if dataset has records
features | List of dataset features. Possible values : calendar, geo, image, apiproxy, timeserie, aggregate

In expression, metadata must be fully qualified with their template name. For basic metadata, this prefix is optionnal. 

A list of basic metadata can be retrieve with [metadata API](#metadata-templates-for-a-specific-type)

#### Where

> Get only datasets with geo feature

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/datasets?where=features:"geo"'
```

## Export datasets

> Get a list of available export formats

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/exports/'
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
curl 'https://public.opendatasoft.com/api/v2/catalog/exports/json'
```

#### HTTP Request
`GET /api/v2/catalog/exports/json`

Export datasets to Json format

### CSV catalog export

> Export datasets in csv format using **,** as delimiter

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/exports/csv?delimiter=,'
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
curl 'https://public.opendatasoft.com/api/v2/catalog/exports/xls'
```

Export datasets to XLS format using [SpreadsheetML specification](https://en.wikipedia.org/wiki/SpreadsheetML).

#### HTTP Request
`GET /api/v2/catalog/exports/xls`


### RSS catalog export

> Export datasets in rss format

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/exports/rss'
```

Export datasets to RSS format.

#### HTTP Request
`GET /api/v2/catalog/exports/rss`

### TTL catalog export

> Export datasets in turle rdf format

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/exports/ttl'
```

Export datasets to Turtle RDF format using [DCAT application for data portals in Europe](https://joinup.ec.europa.eu/asset/dcat_application_profile/description).

#### HTTP Request
`GET /api/v2/catalog/exports/ttl`

### RDF catalog export

> Export datasets in rdf-xml format

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/exports/rdf'
```

Export datasets to XML-RDF format using [DCAT application for data portals in Europe](https://joinup.ec.europa.eu/asset/dcat_application_profile/description).

#### HTTP Request
`GET /api/v2/catalog/exports/rdf`

### Data.json catalog export

> Export datasets in data.json format

```shell
curl 'https://public.opendatasoft.com/api/v2/catalog/exports/data.json'
```

Export datasets in [DCAT-AP for swittzerland format](https://handbook.opendata.swiss/en/library/ch-dcat-ap).

#### HTTP Request
`GET /api/v2/catalog/exports/data.json`
