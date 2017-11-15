# Dataset

All datasets contain specific data called "records".

The dataset API allows to work on these records. More specifically, the dataset API allows to:

- search records from a chosen dataset
- aggregate records from a chosen dataset
- export records from a chosen dataset
- lookup a specific record from a chosen dataset

Each endpoint above is documented in its own section, along with its available parameters. Some of these parameters however accept field literals, which are documented right below. We recommend reading the **Field literal in dataset queries** section before diving into the dataset API.

##### Field literal in dataset queries

Some parameters, such as `select`, `where` or `group_by`, accept [field literal](#field-literal).
In dataset search, a field literal can either be a technical field or a field from dataset mapping.

###### Dataset technical fields

```shell
# Sort records by their technical size
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/baby_names_nc_2013/records?sort=record_size'
```

Field name | Description
---------- | -----------
`datasetid` | Human readable dataset identifier
`record_timestamp` | Date field indicating the publishing date
`recordid` | Unique identifier of the record
`record_size` | Size of the record

###### Dataset fields

> Use a field name as field_literal

```shell
#Use field_name `name` to restrict records where `name` is Jonathan
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/baby_names_nc_2013/records?where=name="Jonathan"'

# Select only `name` column
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/baby_names_nc_2013/records?select=name'
```

Any field name from a dataset can be used as [field literal](#field-literal) in query parameters.

<aside>
If a field name contains only numbers or is a keyword, it must be enclosed in back-quotes.
</aside>

The list of fields for a specific dataset can be obtained with the [dataset lookup API](#lookup-dataset).


## Searching records

> Get first 10 records

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/baby_names_nc_2013/records?rows=10'
```

> Get 10 records starting at the 10th result

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/baby_names_nc_2013/records?rows=10&start=10'
```

> Search datasets containing `noa` in their fields

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/baby_names_nc_2013/records?where="Noa"'
```

This endpoint provides a search facility in the dataset catalog.

<aside>
It is not possible to retrieve all records from a dataset with this API. To do so, export endpoints must be used.
</aside>

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/records`

##### URL Parameters

Parameter | Default | Description
--------- | ------- | -----------
`select` | * | Select expression used to retrieve specific fields (see [ODSQL documentation](#select-clause))
`where` | None | Filter expression used to restrict returned datasets (see [ODSQL documentation](#where-clause))
`start` | 0 | Index of the first item to return
`rows` | 10 | Number of items to return. Max value: 100
`include_app_metas` | false | Explicitely request application metadata for each dataset
`timezone` | UTC | Timezone applied on datetime fields in query and response

<aside>
The value of both `start` and `rows` parameters must not exceed 10000. Use the export API to download all records.
</aside>


## Aggregating records

> Aggregation query without group_by

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/baby_names_nc_2013/aggregates?select=count(*) as count'
```

> Returns an array with one element

```json
{
    "aggregations": [
        {
            "count": 2841
        }
    ]
}
```

> Aggregation query with a single group_by

```shell
# Retrieve population, state name, number of cities for each state (for the 1000 largest cities in the US)
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/largest-us-cities/aggregates?select=count(*) as num_cities,state,sum(population) as sum_population&group_by=state'
```

> Returns an array with an object for each `feature` containing feature's name and number of datasets

```json
{
    "aggregations": [
        {
            "state": "California",
            "num_cities": 212,
            "sum_population": 27910620
        },
        {
            "state": "Texas",
            "num_cities": 83,
            "sum_population": 14836230
        },
        ...
    ]
}
```


> Invalid aggregation with a selected field not present in group_by

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/largest-us-cities/aggregates?select=state'
```

> Valid aggregation with an aggregation function

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/largest-us-cities/aggregates?select=sum(population)'
```

> Aggregation with an multiple group_by

```shell
# Retrieve number of Unesco sites grouped by continent and cities
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/world-heritage-unesco-list/aggregates?select=continent_en,country_en,count(*)&group_by=continent_en,country_en'
```

This endpoint provides an aggregation facility for records.

An aggregation query returns a JSON array containing an object for each group created by the query.
Each JSON object contains a key/value pair for each `select` instruction.
However, without the `group_by` parameter, it returns an array with only one object.

`select` parameter can only be composed of aggregation function or by aggregated value.
It means that literal field in select clause outside aggregation function must be present in `group_by` clauses.

If a query contains multiple `group_by` clauses, returned groups are combined together.

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/aggregates`

##### URL Parameters

Parameter | Default | Description
--------- | ------- | -----------
`where` | None | Filter expression used to restrict returned datasets (see [where clause in ODSQL documentation](#where-clause))
`select` | None | Select clause for aggregation (see [select clause in ODSQL documentation](#select-clause))
`group_by` | None | Group by clause for aggregation (see [group_by clause in ODSQL documentation](#group-by-clause))
`timezone` | UTC | Timezone applied on datetime fields in query and response
`limit` | None | Number of items to return


## Exporting records

> Get a list of available export formats

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/world-heritage-unesco-list/exports'
```

This endpoint allows to download all records for a requested dataset.

Records can be exported in 10 different formats:

- JSON
- GeoJSON
- JSON Lines
- CSV
- XLS
- Shapefile
- Turtle RDF
- RDF-XML
- N3 RDF
- JSON-LD RDF

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports`


### Exporting records in JSON

> Export records in json format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/world-heritage-unesco-list/exports/json'
```

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports/json`

### Exporting records in GeoJSON

> Export records in GeoJSON format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/world-heritage-unesco-list/exports/geojson'
```

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports/geojson`

Export records to a [GeoJSON format](http://geojson.org/).

### Exporting records in JSON Lines

> Export records in json lines format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/world-heritage-unesco-list/exports/jsonl'
```

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports/jsonl`

Export records to a [NDJSON](http://ndjson.org/) (Json lines) format.
The JSONlines format returns a record by line. It can be useful for streaming operations.

### Exporting records in CSV

> Export records in csv format using **,** as delimiter

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/world-heritage-unesco-list/exports/csv?delimiter=,'
```

Export records to CSV format. Default separator is `;`. It can be changed with `delimiter` parameter.

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports/csv`

##### URL Parameters

Parameter | Default | Description
--------- | ------- | -----------
`delimiter` | ; | Delimiter used between column values
`list_separator` | , | Character used to separate values in a list

### Exporting records in XLS

> Export records in xls format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/xls'
```

Export records to an XLS format using [SpreadsheetML specification](https://en.wikipedia.org/wiki/SpreadsheetML).

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports/xls`


### Exporting records in Shapefile

> Export records to shapefile format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/world-heritage-unesco-list/exports/shp'
```

Export datasets to a [Shapefile format](https://en.wikipedia.org/wiki/Shapefile).

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports/shp`

### Exporting records in Turtle RDF

> Export records in turle rdf format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/turtle'
```

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports/turtle`


### Exporting records in RDF-XML

> Export records in rdf-xml format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/rdfxml'
```

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports/rdfxml`


### Exporting records in N3 RDF

> Export records in n3 rdf format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/n3'
```

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports/n3`

### Exporting records in JSON-LD RDF

> Export records in json-ld rdf format

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/exports/jsonld'
```

##### HTTP Request
`GET /api/v2/catalog/<dataset_id>/exports/jsonld`


## Looking up a record

> Lookup airbnb-listings dataset

```shell

# Get eiffel tower specific record from Unesco dataset
curl 'https://examples.opendatasoft.com/api/v2/catalog/datasets/world-heritage-unesco-list/records/0ef334837810f591330d1c6bc0e9289d00ff1c9d'
```

This endpoint allows to retrieve information about a specific record.

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/records/<record_id>`
