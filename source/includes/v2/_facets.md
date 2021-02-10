# Facets

A facet can be considered as a valued tag associated with a dataset or a record. For example, datasets of a catalog could have `language` as a facet: associated values for this facet could be `English`, `French`, or other languages (depending on the domain configuration and the publisher's choice).

In an Opendatasoft portal, facets are specially used for building the left filtering column of both the datasets catalog and dataset records exploration pages.

## Enumerating facets values

Enumerating facets values allows to discover the existing values for a facet.

For example, an API call to enumerate facets in a catalog can show that there are 11 datasets in English and 1 in French.

### Catalog

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/facets'
```

> API Response

```json
{
    "facets": [
        /*...*/
        {
            "name": "language",
            "facets": [
                {
                    "count": 7,
                    "state": "displayed",
                    "name": "en",
                    "value": "en"
                },
                {
                    "count": 1,
                    "state": "displayed",
                    "name": "fr",
                    "value": "fr"
                }
            ]
        },
        {
            "name": "modified",
            "facets": [
                {
                    "count": 8,
                    "state": "refined",
                    "name": "2020",
                    "value": "2020",
                    "facets": [
                        {
                            "count": 2,
                            "state": "displayed",
                            "name": "11",
                            "value": "2020/11"
                        },
                        {
                            "count": 6,
                            "state": "displayed",
                            "name": "12",
                            "value": "2020/12"
                        }
                    ]
                }
            ]
        },
        {
            "name": "theme",
            "facets": [
                {
                    "count": 2,
                    "state": "displayed",
                    "name": "Culture, Heritage",
                    "value": "Culture, Heritage"
                },
                {
                    "count": 1,
                    "state": "displayed",
                    "name": "Administration, Government, Public finances, Citizenship",
                    "value": "Administration, Government, Public finances, Citizenship"
                },
                {
                    "count": 1,
                    "state": "displayed",
                    "name": "Environment",
                    "value": "Environment"
                },
                {
                    "count": 1,
                    "state": "displayed",
                    "name": "Spatial planning, Town planning, Buildings, Equipment, Housing",
                    "value": "Spatial planning, Town planning, Buildings, Equipment, Housing"
                }
            ]
        },
        /*...*/
    ]
}
```

#### HTTP Request

`GET /api/v2/catalog/facets`

#### URL Parameters

Parameter  | Default | Multiple | Description
---------- | ------- | -------- | -----------
`facet`    | None    | Yes      | Which facet should be enumerated. If absent, all facets are returned
`where`    | None    | Yes      | Filter expression used to restrict returned datasets ([ODSQL documentation](#where-clause))
`refine`   | None    | Yes      | Refine the result set on a given facet value (see [refine](#refine))
`exclude`  | None    | Yes      | Exclude a given facet value from the result set (see [exclude](#exclude))
`timezone` | UTC     | No       | Timezone applied on datetime fields in query and response

### Datasets

#### HTTP Request

`GET /api/v2/catalog/<dataset_id>/facets`

#### URL Parameters

Parameter  | Default | Multiple | Description
---------- | ------- | -------- | -----------
`facet`    | None    | Yes      | Which facet should be enumerated. If absent, all facets are returned
`where`    | None    | Yes      | Filter expression used to restrict returned datasets ([ODSQL documentation](#where-clause))
`refine`   | None    | Yes      | Refine the result set on a given facet value (see [refine](#refine))
`exclude`  | None    | Yes      | Exclude a given facet value from the result set (see [exclude](#exclude))
`timezone` | UTC     | No       | Timezone applied on datetime fields in query and response

## Filtering with facets values

Filtering facets values allows to limit the result set, either by refining or excluding.

For example, an API call that enumerates the facets in a catalog can be refined to limit the result set to English datasets only. The subsequent call will show that among the 12 datasets of the catalog that are in English, only one dataset deals with the environment. It could then be possible to exclude this dataset, etc.

### Refine

```shell
curl 'https://documentation-resources.opendatasoft.com/api/v2/catalog/facets?refine=modified:2020'
```

```json
{
    "links": [
        {
            "href": "https://documentation-resources.opendatasoft.com/api/v2/catalog/facets",
            "rel": "self"
        },
        {
            "href": "https://documentation-resources.opendatasoft.com/api/v2/catalog",
            "rel": "source"
        }
    ],
    "facets": [
        /* ... */  
        {
            "name": "modified",
            "facets": [
                {
                    "count": 8,
                    "state": "refined",
                    "name": "2020",
                    "value": "2020",
                    "facets": [
                        {
                            "count": 2,
                            "state": "displayed",
                            "name": "11",
                            "value": "2020/11"
                        },
                        {
                            "count": 6,
                            "state": "displayed",
                            "name": "12",
                            "value": "2020/12"
                        }
                    ]
                }
            ]
        },
        /* ... */
    ]
}
```

It is possible to limit the result set by refining on a given facet value.

For example, when using `refine=modified:2020`, only datasets modified in 2020 will be returned.

#### Format:

`refine=FACETNAME:FACETVALUE`

<aside>
For date, and other hierarchical facets, when refining on one value, all second-level values related to that entry will appear in facets enumeration. Example: after refining on the year 2019, the related second-level month will appear. And when refining on August 2019, the third-level day will appear.
</aside>

### Exclude

Using the same principle as above, it is possible to exclude a given facet value from the result set.

For example, when using `exclude=modified:2020`, only results that have not been modified in 2020 will be returned. Facets enumeration will display 2020 as `excluded` without any count information.

#### Format:

`exclude=FACETNAME:FACETVALUE`
