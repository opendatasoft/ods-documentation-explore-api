# Dataset Records APIs

## Record Search API

```http
GET /api/records/1.0/search HTTP/1.1
```

This API makes it possible to perform complex queries on the records of a dataset, such as full-text search or geo filtering.

It also provides faceted search features on dataset records.

### Parameters

Parameter            | Description
-------------------- | -----------
`dataset`            | Identifier of the dataset. This parameter is mandatory
`q`                  | Full-text query performed on the result set
`geofilter.distance` | Limit the result set to a geographical area defined by a circle center (WGS84) and radius (in meters): `latitude, longitude, distance`
`geofilter.polygon`  | Limit the result set to a geographical area defined by a polygon (points expressed in WGS84): `((lat1, lon1), (lat2, lon2), (lat3, lon3))`
`facet`              | Activate faceting on the specified field. This parameter can be used multiple times to simultaneously activate several facets. By default, faceting is disabled. Example: `facet=city`
`refine.<FACET>`     | Limit the result set to records where `FACET` has the specified value. It can be used several times for the same facet or for different facets
`exclude.<FACET>`    | Exclude records where `FACET` has the specified value from the result set. It can be used several times for the same facet or for different facets
`fields`             | Restricts field to retrieve. This parameter accepts multiple field names separated by commas. Example: `fields=field1,field2,field3`
`pretty_print`       | If set to true (default is false), pretty prints JSON and JSONP output
`format`             | Format of the response output. Can be `json` (default), `jsonp`, `csv`, `geojson`, `geojsonp`
`callback`           | JSONP or GEOJSONP callback
`sort`               | Sorts results by the specified field (e.g. `record_timestamp`). By default, the sort is descending. A minus sign `-` may be used to perform an ascending sort. Sorting is only available on numeric fields (Integer, Decimal), date fields (Date, DateTime) and on text fields which have the sortable annotation
`rows`               | Number of results to return in a single call. By default, `10` results are returned. While you can request for up to `10 000` results in a row, such requests are not optimal and can be throttled so you should consider splitting them into smaller ones or use the Records Download API. Note also that the cumulated value of the parameters `start` and `rows` cannot go over `10 000`. It means that with the Records Search API, there's no way to access a result with a position greater than `10 000`. If however you need to do so, consider again using the Records Download API.
`start`              | Index of the first result to return (starting at 0). Use in conjunction with "rows" to implement paging

## Record Lookup API

```http
GET /api/datasets/1.0/<dataset_id>/records/<record_id> HTTP/1.1
```

> Example lookup for record `ff1f5b718ce2ee87f18dfaf20610f257979f2f4a` in dataset `world-heritage-unesco-list`:

```text
https://examples.opendatasoft.com/api/datasets/1.0/world-heritage-unesco-list/records/ff1f5b718ce2ee87f18dfaf20610f257979f2f4a
```

This API makes it possible to fetch an individual record using its identifier (Record ID).

### Parameters

Parameter      | Description
-------------- | -----------
`datasetid`    | Part of the URL path. Identifier of the dataset
`recordid`     | Part of the URL path. Identifier of the record
`pretty_print` | If set to true (default is false), pretty prints JSON and JSONP output
`format`       | Format of the response output. Can be `json` (default) or `jsonp`
`callback`     | JSONP callback

## Record Analysis API

```http
GET /api/records/1.0/analyze HTTP/1.1
```

This API provides powerful analytics features over a set of selected records.

It returns analyzed results in light and easy to parse format which can used as an input of modern charting libraries such as **Highchart.js** or **D3.js**.

### Parameters

#### Filtering parameters

> Count World Heritage Unesco sites in each category, filtered by a polygon in Central Europe:

```text
https://examples.opendatasoft.com/api/records/1.0/analyze/?dataset=world-heritage-unesco-list&x=category&y.my_count.func=COUNT&geofilter.polygon=(50.0,0.0),(50.0,10.0),(40.0,10.0),(40.0,0.0)
```

```json
[{
        "x": "Cultural",
        "my_count": 59
    },
    {
        "x": "Natural",
        "my_count": 5
    }
]
```

Parameter            | Description
-------------------- | -----------
`dataset`            | Identifier of the dataset. This parameter is mandatory
`q`                  | Full-text query performed on the result set
`geofilter.distance` | Limit the result set to a geographical area defined by a circle center (WGS84) and radius (in meters): `latitude, longitude, distance`
`geofilter.polygon`  | Limit the result set to a geographical area defined by a polygon (points expressed in WGS84): `((lat1, lon1), (lat2, lon2), (lat3, lon3))`
`refine.<FACET>`     | Limit the result set to records where `FACET` has the specified value. It can be used several times for the same facet or for different facets
`exclude.<FACET>`    | Exclude records where `FACET` has the specified value from the result set. It can be used several times for the same facet or for different facets
`pretty_print`       | If set to true (default is false), pretty prints JSON and JSONP output
`format`             | Format of the response output. Can be `json` (default), `jsonp`, `csv`
`callback`           | JSONP callback (only in JSONP requests)

#### Aggregation parameters

> Return the area in hectares of the biggest World Heritage Unesco site in each country:

```text
https://examples.opendatasoft.com/api/records/1.0/analyze/?dataset=world-heritage-unesco-list&x=country_en&y.max_area.func=MAX&y.max_area.expr=area_hectares
```

```json
[{
        "x": "Afghanistan",
        "max_area": 158.9265
    },
    {
        "x": "Albania",
        "max_area": 58.9
    },
    {
        "x": "Algeria",
        "max_area": 665.03
    },
    /* ... */
    {
        "x": "Zimbabwe",
        "max_area": 676600
    },
    {
        "x": "the Former Yugoslav Republic of Macedonia",
        "max_area": 83350
    }
]
```

> Return the count of sites inscribed each month and year:

```text
https://examples.opendatasoft.com/api/records/1.0/analyze/?dataset=world-heritage-unesco-list&x=date_inscribed&periodic=year&precision=month&y.another_count.func=COUNT
```

```json
[{
        "x": {
            "month": 1,
            "year": 1978
        },
        "another_count": 12
    },
    /* ... */
    {
        "x": {
            "month": 1,
            "year": 1980
        },
        "another_count": 27
    }
]
```

Parameter            | Description
-------------------- | -----------
`x`                  | Field on which the data aggregation will be based. This parameter is mandatory. It allows for analyzing a subset of data according to the different values of the fields. The behavior may vary according to the field type. For **Date** and **DateTime** fields, the slices are built from the dates using the level of aggregation defined through the `precision`  and `periodic`  parameters. For other field types, the actual field values are used as x values
`y.<SERIE>.func`     | The definition of the analysis aggregation function. Multiple series can be computed at once, simply name this parameter with an arbitrary serie name that you may reuse for specifying the associated aggregated expression. The list of available aggregation functions is: `COUNT` , `AVG` , `SUM` , `MIN` , `MAX` , `STDDEV` , `SUMSQUARES` . These functions return the result of their execution on the expression provided in y.<SERIE>.expr (or simply the number of records for the `COUNT`  function) for each value of x
`y.<SERIE>.expr`     | Defines the value to be aggregated. This parameter is mandatory for every aggregation function but the `COUNT`  function. The <SERIES> parameter must have the same name as the one used for the required corresponding aggregation function. The parameter may contain the name of a numeric field in the Dataset (**Int** or **Double**), or a mathematical expression (see below to get more details on the expression language).
`y.<SERIE>.cumulative` | This parameter accepts values `true`  and `false`  (default). If the parameter is set to true, the results of a series are recursively summed up (`serie(x) = serie(x) + serie(x-1)` )
`maxpoints`            | Limits the maximum number of results returned in the serie. By default there is no limit
`periodic`             | Used only in cases in which x is of type **Date** or **DateTime**. It defines the level at which aggregation is done. Possible values are `year`  (default), `month` , `week` , `weekday` , `day` , `hour` , `minute` . This parameter will allow you, for instance, to compute aggregations on months across all years. For instance, with a value set to `weekday` , the output will be: `[{"x": {"weekday":0},"series1": 12}, {"x": {"weekday":1},"series1": 30}]` . When `weekday`  is used, the generated value range from 0 to 6 where 0 corresponds to Monday and 6 to Sunday
`precision`            | Used only in cases in which X is of type **Date** or **DateTime**. It defines the precision of the aggregation. Possible values are `year` , `month` , `week` , `day`  (default), `hour` , `minute` . If `weekday`  is provided as a `periodic`  parameter, the `precision`  parameter is ignored. This parameter shall respect the `precision`  annotation of the field. If the field is annotated with a precision set to `day` , the serie precision can at maximum be set to `day`
`sort`                 | Sorts the aggregation values according to the specified series, or to the x parameter. By default, the values are sorted in descending order, according to the x parameter. A minus sign ('-') can however be prepended to the argument to make an ascending sort

### Expression language

> Return the average value of twice the sinus of the areas for each category (for the sake of example):

``` text
https://examples.opendatasoft.com/api/records/1.0/analyze/?dataset=world-heritage-unesco-list&x=category&y.series1.func=AVG&y.series1.expr=sin(area_hectares)*2
```

```json
[{
        "x": "Cultural",
        "series1": 0.06208366995525825
    },
    {
        "x": "Mixed",
        "series1": 0.47869568886889907
    },
    {
        "x": "Natural",
        "series1": 0.018136045219311035
    }
]
```

An arbitrary expression can be used as the value of the definition of an aggregated.

* Classical numerical operators are available: `+`, `-`, `*`, `/`
* Parenthesis can be used to group sub expressions together
* The following functions are also available: `time`, `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `toRadians`, `toDegrees`, `exp`, `log`, `log10`, `sqrt`, `cbrt`, `IEEEremainder`, `ceil`, `floor`, `rint`, `atan2`, `pow`, `round`, `random`, `abs`, `max`, `min`, `ulp`, `signum`, `sinh`, `cosh`, `tanh`, `hypot`

## Records Download API

```http
GET /api/records/1.0/download HTTP/1.1
```

This API provides an efficient way to download a large set of records out of a dataset. The HTTP
answer is streamed which makes it possible to optimize the memory consumption client side.

### Parameters

Parameter            | Description
-------------------- | -----------
`dataset`            | Identifier of the dataset. This parameter is mandatory
`q`                  | Full-text query performed on the result set
`geofilter.distance` | Limit the result set to a geographical area defined by a circle center (WGS84) and radius (in meters): `latitude, longitude, distance`
`geofilter.polygon`  | Limit the result set to a geographical area defined by a polygon (points expressed in WGS84): `((lat1, lon1), (lat2, lon2), (lat3, lon3))`
`facet`              | Activate faceting on the specified field. This parameter can be used multiple times to simultaneously activate several facets. By default, faceting is disabled. Example: `facet=city`
`refine.<FACET>`     | Limit the result set to records where `FACET` has the specified value. It can be used several times for the same facet or for different facets
`exclude.<FACET>`    | Exclude records where `FACET` has the specified value from the result set. It can be used several times for the same facet or for different facets
`fields`             | Restricts field to retrieve. This parameter accepts multiple field names separated by commas. Example: `fields=field1,field2,field3`
`pretty_print`       | If set to true (default is false), pretty prints JSON and JSONP output
`format`             | Format of the response output. Can be `json` (default), `jsonp`, `csv`, `geojson`, `geojsonp`
`callback`           | JSONP or GEOJSONP callback

## Records Geo Clustering API

```http
GET /api/records/1.0/geocluster HTTP/1.1
```

This API provides powerful geo clustering features over a set of selected records.

The return format can easily be used to build comprehensive data visualizations on a map, using a very large number of records.

This API takes as an input:

- the cluster precision
- a polygon representing the current view on a map

It returns a list of clusters with the number of points contained in each cluster and the polygon of the cluster envelope, along with computed aggregations when required.

The clustering results are returned in JSON.

### Filtering parameters

Parameter            | Description
-------------------- | -----------
`dataset`            | Identifier of the dataset. This parameter is mandatory
`q`                  | Full-text query performed on the result set
`geofilter.distance` | Limit the result set to a geographical area defined by a circle center (WGS84) and radius (in meters): `latitude, longitude, distance`
`geofilter.polygon`  | Limit the result set to a geographical area defined by a polygon (points expressed in WGS84): `((lat1, lon1), (lat2, lon2), (lat3, lon3))`
`facet`              | Activate faceting on the specified field. This parameter can be used multiple times to simultaneously activate several facets. By default, faceting is disabled. Example: `facet=city`
`refine.<FACET>`     | Limit the result set to records where `FACET` has the specified value. It can be used several times for the same facet or for different facets
`exclude.<FACET>`    | Exclude records where `FACET` has the specified value from the result set. It can be used several times for the same facet or for different facets
`fields`             | Restricts field to retrieve. This parameter accepts multiple field names separated by commas. Example: `fields=field1,field2,field3`
`pretty_print`       | If set to true (default is false), pretty prints JSON and JSONP output
`format`             | Format of the response output. Can be `json` (default), `jsonp`, `csv`, `geojson`, `geojsonp`
`callback`           | JSONP or GEOJSONP callback

### Clustering parameters

> Return clusters and shapes with low precision and the average area in each cluster

```text
https://examples.opendatasoft.com/api/records/1.0/geocluster/?dataset=world-heritage-unesco-list&shapeprecision=1&clusterprecision=3&y.avg_area.func=AVG&y.avg_area.expr=area_hectares```
```

```json
{
    "clusters": [{
            "cluster_center": [
                10.523538180927272, -60.95864515091818
            ],
            "cluster": {
                "type": "Polygon",
                "coordinates": [
                    [[-62.00833333, -2.333333333],[-66.89068,10.49073],[-66.125,18.46666667],[-61.7616666667,17.0069444444],[-55.15,5.82611],[-56.5,4],[-62.00833333, -2.333333333]]
                ]
            },
            "count": 11,
            "series": {
                "avg_area": 917952.2154545453
            }
        },
        /* ... */
        {
            "cluster_center": [
                49.942863890000005, -55.08576666776667
            ],
            "cluster": {
                "type": "Polygon",
                "coordinates": [
                    [[-53.2111111111, 46.635],[-56.4295222222, 51.726925],[-55.61666667, 51.46666667],[-53.2111111111, 46.635]]
                ]
            },
            "count": 3,
            "series": {
                "avg_area": 2838.3243333333335
            }
        }
    ],
    "count": {
        "max": 137,
        "min": 1
    },
    "series": {
        "avg_area": {
            "max": 40825000,
            "min": 0
        }
    },
    "clusterprecision": 3
}
```

Parameter            | Description
-------------------- | -----------
`clusterprecision`   | The desired precision level, depending on the current map zoom level (for example, the Leaflet zoom level). This parameter is mandatory
`shapeprecision`     | The precision of the returned cluster envelope. The sum of clusterprecision and shapeprecision must not exceed 29
`clustermode`        | The desired clustering mode. Supported values are `polygon` (default) and `heatmap`
`y.<SERIE>.func`, `y.<SERIE>.expr` | This API also accepts a serie definition as described in the record analysis API. If a serie is defined, the aggregation will be performed using the values of the serie
