# Dataset

All datasets contain specific data called "records".

The dataset API allows to work on these records. More specifically, the dataset API allows to:

- search records from a chosen dataset
- export records from a chosen dataset
- lookup a specific record from a chosen dataset

Each endpoint above is documented in its own section, along with its available parameters. Some of these parameters accept field literals. We recommend reading the **Field literal in dataset queries** section before diving into the dataset API.

##### Field literal in dataset queries

Some parameters, such as `select`, `where` or `group_by`, accept [field literal](#field-literal).
In dataset search, a field literal can either be a technical field or a field from dataset mapping.

###### Dataset technical fields

```shell
# Sort records by their technical size
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?order_by=record_size'
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
#Use field_name `name` to restrict records where `name` is Paris
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?where=name="Paris"'

# Select only `name` column
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?select=name'
```

Any field name from a dataset can be used as a [field literal](#field-literal) in query parameters.

<aside>
If a field name contains only numbers or is a keyword, it must be enclosed in back-quotes.
</aside>

The list of fields for a specific dataset can be obtained with the [dataset lookup API](#looking-up-a-dataset).


## Searching records

This endpoint provides a facility to access records for a given dataset.

A dataset has fields (which can be thought as column names from a tabular point of view), and contains records.

A record is a collection of values for each field of the dataset.

The API response is a list of records with their values, optionnaly grouped.


> Get the first 10 records

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?limit=10'
```

> Get 10 records starting at the 10th result

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?limit=10&offset=10'
```

> Search datasets containing `noa` in their fields

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?where="Noa"'
```
> Grouping all records of a dataset in order to perform a count

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?select=count(*) as count&group_by'
```

> API reponse

```json
{
    "records": [
        {"record":
            {"fields":
                {
                    "count": 50335
                }
            }
        }
    ]
}
```

> Grouping records by a field name (here, `country_code`) and perform an analytic

```shell
# Retrieve the total number of cities with more than 5,000 inhabitants, the country code, and the total population for each country code
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?select=count(*) as num_cities,country_code,sum(population) as sum_population&group_by=country_code'
```

> API reponse

```json
{
    "records": [
        /* ... */
        {"record":
            {"fields":
                {
                    "num_cities": 1982,
                    "country_code": "FR",
                    "sum_population": 39549205
                }
            }
        },
        /* ... */
        {"record":
            {"fields":
                {
                    "num_cities": 7197,
                    "country_code": "US",
                    "sum_population": 243520909
                }
            }
        },
        /* ... */
        {"record":
            {"fields":
                {
                    "num_cities": 43,
                    "country_code": "ZW",
                    "sum_population": 4043922
                }
            }
        }
    ]
}
```

> Invalid analytic on grouped records because no grouping is asked

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?select=country_code'
```

> Valid analytic (here, a `sum`) on grouped records, with an aggregation function

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?select=sum(population)&group_by'
```

```json
{
    "records": [
        {"record":
            {"fields":
                {
                    "sum(population)": 2992377919
                }
            }
        }
    ]
}
```

> Grouped records by grouping with multiple fields

```shell
# Retrieve the number of cities with more than 5,000 inhabitants grouped by time zone and country code
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records?select=timezone,country_code,count(*)&group_by=timezone,country_code'
```

```json
{
    "records": [
        /* ... */
        {"record":
            {"fields":
                {
                    "timezone": "America/Chicago",
                    "count(*)": 2013,
                    "country_code": "US"
                }
            }
        },
        /* ... */
        {"record":
            {"fields":
                {
                    "timezone": "America/Chihuahua",
                    "count(*)": 35,
                    "country_code": "MX"
                }
            }
        },
        /* ... */
        {"record":
            {"fields":
                {
                    "timezone": "Europe/Paris",
                    "count(*)": 1982,
                    "country_code": "FR"
                },
            }
        },
        /* ... */
        {"record":
            {"fields":
                {
                    "timezone": "Europe/Podgorica",
                    "count(*)": 25,
                    "country_code": "ME"
                }
            }
        },
        /* ... */
        {"record":
            {"fields":
                {
                    "timezone": "Pacific/Wallis",
                    "count(*)": 3,
                    "country_code": "WF"
                }
            }
        }
    ]
}
```


<aside>
It is not possible to retrieve all records from a dataset with this API. To do so, export endpoints must be used.
</aside>

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/records`

##### URL Parameters

With the `select` clause you'll be able to chose which field to return for each record result (default to all), but also rename fields or compute new ones with functions.

With the `where` clause you'll be able to filter the records results with given conditions.

With the `group_by` clause you'll be able to group the records results by field name or custom grouping functions. It's useful for specific use cases or performing analytics on the dataset content. If a query contains multiple `group_by` clauses, returned groups are combined together.


Parameter | Default | Description
--------- | ------- | -----------
`select` | * | Select expression used to retrieve specific fields (see [ODSQL documentation](#select-clause))
`where` | None | Filter expression used to restrict returned datasets (see [ODSQL documentation](#where-clause))
`refine` | None | Refine the result set on a given facet value (see [refine in Facet documentation](#refine))
`exclude` | None | Exclude a given facet value from the result set (see [exclude in Facet documentation](#exclude))
`group_by` | None    | Group by clause for aggregation (see [group_by clause in ODSQL documentation](#group-by-clause))
`order_by` | None    | Order by clause for sorting results (see [order_by clause in ODSQL documentation](#order-by-clause))
`offset` | 0 | Index of the first item to return
`limit` | 10 | Number of items to return
`include_app_metas` | false | Explicitly request application metadata for each dataset
`timezone` | UTC | Timezone applied on datetime fields in query and response

<aside>
The sum of `offset` and `limit` parameters must not exceed 10000. Use the export API to download all records.
</aside>



## Exporting records

> Get a list of available export formats

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/exports'
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
`GET /api/v2/catalog/datasets/<dataset_id>/exports`


### Exporting records in JSON

> Export records in JSON format

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/exports/json'
```

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/exports/json`

### Exporting records in GeoJSON

> Export records in GeoJSON format

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/exports/geojson'
```

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/exports/geojson`

Export records to a [GeoJSON format](http://geojson.org/).

### Exporting records in JSON Lines

> Export records in JSON Lines format

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/exports/jsonl'
```

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/exports/jsonl`

Export records to a [NDJSON](http://ndjson.org/) (JSON Lines) format.
The JSONlines format returns a record by line. It can be useful for streaming operations.

### Exporting records in CSV

> Export records in CSV format using **,** as delimiter

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/csv?delimiter=,'
```

Export records to CSV format. Default separator is `;`. It can be changed with `delimiter` parameter.

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/exports/csv`

##### URL Parameters

Parameter | Default | Description
--------- | ------- | -----------
`delimiter` | ; | Delimiter used between column values
`list_separator` | , | Character used to separate values in a list

### Exporting records in XLS

> Export records in XLS format

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/exports/xls'
```

Export records to an XLS format using [SpreadsheetML specification](https://en.wikipedia.org/wiki/SpreadsheetML).

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/exports/xls`


### Exporting records in Shapefile

> Export records to shapefile format

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/exports/shp'
```

Export datasets to a [Shapefile format](https://en.wikipedia.org/wiki/Shapefile).

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/exports/shp`

### Exporting records in Turtle RDF

> Export records in Turtle RDF format

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/exports/turtle'
```

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/exports/turtle`


### Exporting records in RDF/XML

> Export records in RDF/XML format

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/exports/rdfxml'
```

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/exports/rdfxml`


### Exporting records in N3 RDF

> Export records in N3 RDF format

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/exports/n3'
```

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/exports/n3`

### Exporting records in JSON-LD RDF

> Export records in JSON-LD RDF format

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/exports/jsonld'
```

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/exports/jsonld`


## Looking up a record

> Lookup GeoNames dataset

```shell

# Get the record for Paris, the capital of France, from the GeoNames dataset
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/doc-geonames-cities-5000/records/d087227c3595eb1e5b7d09dacfdfd6cafb86562a'
```

```json
{
    "record": {
        "id": "d087227c3595eb1e5b7d09dacfdfd6cafb86562a",
        "timestamp": "2021-01-04T11:22:14.44Z",
        "size": 1926,
        "fields": {
            "elevation": null,
            "name": "Paris",
            "modification_date": "2020-05-26",
            "geonameid": "2988507",
            "feature_class": "P",
            "admin3_code": null,
            "admin2_code": "75",
            "geo_point_2d": {
                "lat": 48.85341,
                "lon": 2.3488
            },
            "cc2": null,
            "timezone": "Europe/Paris",
            "feature_code": "PPLC",
            "dem": 42,
            "country_code": "FR",
            "admin1_code": "11",
            "alternatenames": "Baariis,Bahliz,Ile-de-France,Lungsod ng Paris,Lutece,Lutetia,Lutetia Parisorum,Lutèce,PAR,Pa-ri,Paarys,Palika,Paname,Pantruche,Paraeis,Paras,Pari,Paries,Parigge,Pariggi,Parighji,Parigi,Pariis,Pariisi,Pariizu,Pariižu,Parij,Parijs,Paris,Parisi,Parixe,Pariz,Parize,Parizh,Parizh osh,Parizh',Parizo,Parizs,Pariž,Parys,Paryz,Paryzh,Paryzius,Paryż,Paryžius,Paräis,París,Paríž,Parîs,Parĩ,Parī,Parīze,Paříž,Páras,Párizs,Ville-Lumiere,Ville-Lumière,ba li,barys,pairisa,pali,pari,paris,parys,paryzh,perisa,pryz,pyaris,pyarisa,pyrs,Île-de-France,Παρίσι,Париж,Париж ош,Парижь,Париз,Парис,Парыж,Паріж,Փարիզ,פאריז,פריז,باريس,پارىژ,پاريس,پاریس,پیرس,ܦܐܪܝܣ,पॅरिस,पेरिस,पैरिस,প্যারিস,ਪੈਰਿਸ,પૅરિસ,பாரிஸ்,పారిస్,ಪ್ಯಾರಿಸ್,പാരിസ്,ปารีส,ཕ་རི།,ပါရီမြို့,პარიზი,ፓሪስ,ប៉ារីស,パリ,巴黎,파리",
            "asciiname": "Paris",
            "admin4_code": null,
            "population": 2138551
        }
    }
}
```

This endpoint allows to retrieve information about a specific record.

##### HTTP Request
`GET /api/v2/catalog/datasets/<dataset_id>/records/<record_id>`
