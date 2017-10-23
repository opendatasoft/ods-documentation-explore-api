# Dataset Catalog APIs

## Dataset Lookup API

```http
GET /api/datasets/1.0/<dataset_id> HTTP/1.1
```

> Example Dataset Lookup API URL

```text
https://examples.opendatasoft.com/api/datasets/1.0/world-heritage-unesco-list/?pretty_print=true&format=json
```

> Example of JSONP request

```text
https://examples.opendatasoft.com/api/datasets/1.0/world-heritage-unesco-list/?format=jsonp&callback=myFunction
```

This API makes it possible to fetch an individual dataset information.

### Parameters

The dataset identifier is passed as a part of the URL as indicated by the `<dataset_id>` placeholder in the exemple on the right.

Other parameters, passed as query parameters, are described below:

Parameter      | Description
-------------- | -----------
`pretty_print` | If set to true (default is false), pretty prints output
`format`       | Format of the response output. Can be `json` (default) or `jsonp`
`callback`     | JSONP callback (only in JSONP requests)

## Dataset Search API

```http
GET /api/datasets/1.0/search HTTP/1.1
```

> Example Dataset Search Queries

```text
https://examples.opendatasoft.com/api/datasets/1.0/search?refine.language=en&refine.modified=2017/10
https://examples.opendatasoft.com/api/datasets/1.0/search?exclude.publisher=UNESCO&sort=-modified
```

This API provides a search facility in the dataset catalog. Full text search as well as multi-criteria field queries
are made possible and results facetting is provided as well.

### Parameters

Parameter         | Description
----------------- | -----------
`q`               | Full-text query performed on the result set
`facet`           | Activate faceting on the specified field (see list of fields in the [Query Language](#field-queries) section). This parameter can be used multiple times to activate several facets. By default, faceting is disabled
`refine.<FACET>`  | Limit the result set to records where `FACET` has the specified value. It can be used several times for the same facet or for different facets
`exclude.<FACET>` | Exclude records where `FACET` has the specified value from the result set. It can be used several times for the same facet or for different facets
`sort`            | Sorts results by the specified field. By default, the sort is descending. A minus sign `-` may be used to perform an ascending sort. Sorting is only available on numeric fields (int, double, date and datetime) and on text fields which have the `sortable`  annotation
`rows`            | Number of results to return in a single call. The maximum number of rows returned is 1000. By default, 10 results are returned
`start`           | Index of the first result to return (starting at 0). Use in conjunction with "rows" to implement paging
`pretty_print`    | If set to true (default is false), pretty prints JSON and JSONP output
`format`          | Format of the response output. Can be `json` (default), `jsonp`, `csv` or `rss`
`callback`        | JSONP callback (only in JSONP requests)
