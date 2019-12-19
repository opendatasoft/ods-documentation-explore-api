# Facets

A facet can be considered as a valued tag associated with a dataset or a record. For example, datasets of a catalog could have `language` as facet: associated values for this facet could be `English`, `French` or `Swedish`.

In an Opendatasoft portal, facets are especially used for building the left filtering column of both the datasets catalog and dataset records exploration pages.

## Enumerating facets values

Enumerating facets values allows to discover the existing values for a facet.

For example, an API call to enumerate facets in a catalog can show that there are 13 datasets in English, 10 in French and 2 in Swedish.

### Catalog

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/facets'
```

> API Response

```json
{
    /*...*/
  "facets": [
    {
      "name": "language",
      "facets": [
        {
          "count": 13,
          "state": "displayed",
          "name": "en",
          "value": "en"
        },
        {
          "count": 10,
          "state": "displayed",
          "name": "fr",
          "value": "fr"
        },
        {
          "count": 2,
          "state": "displayed",
          "name": "sv",
          "value": "sv"
        },
      ]
    },
    {
      "name": "modified",
      "facets": [
        {
          "count": 25,
          "state": "displayed",
          "name": "2019",
          "value": "2019"
        }
      ]
    },
    {
      "name": "federated",
      "facets": [
        {
          "count": 8,
          "state": "displayed",
          "name": "false",
          "value": "false"
        },
        {
          "count": 17,
          "state": "displayed",
          "name": "true",
          "value": "true"
        }
      ]
    }
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

For example, an API call that enumerates the facets in a catalog can be refined to limit the result set to English datasets only. The subsequent call will show that among the 13 datasets of the catalog that are in English, 5 are federated datasets, and 8 aren't. It could then be possible to exclude federated datasets, etc.

### Refine

```shell
curl 'https://examples.opendatasoft.com/api/v2/catalog/facets?refine=modified:2019'
```

```json
{
    "facets": [
        {
            "name": "modified",
            "facets": [
                {
                    "name": "2019",
                    "path": "2019",
                    "count": 154,
                    "state": "refined",
                    "facets": [
                        {
                            "name": "08",
                            "path": "2019/08",
                            "count": 74,
                            "state": "displayed"
                        },
                        /* ... */
                    ]
                }
            ]
        }
    ]
}
```

It is possible to limit the result set by refining on a given facet value.

For example, when using `refine=modified:2019`, only datasets modified in 2019 will be returned.

#### Format:

`refine=FACETNAME:FACETVALUE`

<aside>
For date, and other hierarchical facets, when refining on one value, all second-level values related to that entry will appear in facets enumeration. Example: after refining on the year 2019, the related second-level month will appear. And when refining on August 2019, the third-level day will appear.
</aside>

### Exclude

Using the same principle as above, it is possible to exclude a given facet value from the result set.

For example, when using `exclude=modified:2019`, only results that have not been modified in 2019 will be returned. Facets enumeration will display 2019 as `excluded` without any count information.

#### Format:

`exclude=FACETNAME:FACETVALUE`
