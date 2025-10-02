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
`format`             | Format of the response output. Can be `json` (default), `jsonp`, `geojson`, `geojsonp`, `rss`, `atom`
`callback`           | JSONP or GEOJSONP callback
`sort`               | Sorts results by the specified field (for example, `record_timestamp`). By default, the sort is descending. A minus sign `-` may be used to perform an ascending sort. Sorting is only available on numeric fields (Integer, Decimal), date fields (Date, DateTime), and on text fields that have the sortable annotation
`rows`               | Number of results to return in a single call. By default, `10` results are returned. While you can request up to `10 000` results in a row, such requests are not optimal and can be throttled. So, you should consider splitting them into smaller ones or use the Records Download API. Note also that the cumulated value of the parameters `start` and `rows` cannot go over `10 000`. It means that with the Records Search API, there's no way to access a result with a position greater than `10 000`. If you need to do so, consider again using the Records Download API.
`start`              | Index of the first result to return (starting at 0). Use in conjunction with "rows" to implement paging

## Record Lookup API

```http
GET /api/datasets/1.0/<dataset_id>/records/<record_id> HTTP/1.1
```

> Example lookup for the record `d087227c3595eb1e5b7d09dacfdfd6cafb86562a` in the dataset `doc-geonames-cities-5000`:

```text
https://documentation-resources.huwise.com/api/datasets/1.0/doc-geonames-cities-5000/records/d087227c3595eb1e5b7d09dacfdfd6cafb86562a
```

```json
{
    "datasetid": "doc-geonames-cities-5000",
    "recordid": "d087227c3595eb1e5b7d09dacfdfd6cafb86562a",
    "fields": {
        "name": "Paris",
        "modification_date": "2020-05-26",
        "geonameid": "2988507",
        "feature_class": "P",
        "admin2_code": "75",
        "geo_point_2d": [
            48.85341,
            2.3488
        ],
        "timezone": "Europe/Paris",
        "feature_code": "PPLC",
        "dem": 42,
        "country_code": "FR",
        "admin1_code": "11",
        "alternatenames": "Baariis,Bahliz,Ile-de-France,Lungsod ng Paris,Lutece,Lutetia,Lutetia Parisorum,Lutèce,PAR,Pa-ri,Paarys,Palika,Paname,Pantruche,Paraeis,Paras,Pari,Paries,Parigge,Pariggi,Parighji,Parigi,Pariis,Pariisi,Pariizu,Pariižu,Parij,Parijs,Paris,Parisi,Parixe,Pariz,Parize,Parizh,Parizh osh,Parizh',Parizo,Parizs,Pariž,Parys,Paryz,Paryzh,Paryzius,Paryż,Paryžius,Paräis,París,Paríž,Parîs,Parĩ,Parī,Parīze,Paříž,Páras,Párizs,Ville-Lumiere,Ville-Lumière,ba li,barys,pairisa,pali,pari,paris,parys,paryzh,perisa,pryz,pyaris,pyarisa,pyrs,Île-de-France,Παρίσι,Париж,Париж ош,Парижь,Париз,Парис,Парыж,Паріж,Փարիզ,פאריז,פריז,باريس,پارىژ,پاريس,پاریس,پیرس,ܦܐܪܝܣ,पॅरिस,पेरिस,पैरिस,প্যারিস,ਪੈਰਿਸ,પૅરિસ,பாரிஸ்,పారిస్,ಪ್ಯಾರಿಸ್,പാരിസ്,ปารีส,ཕ་རི།,ပါရီမြို့,პარიზი,ፓሪስ,ប៉ារីស,パリ,巴黎,파리",
        "asciiname": "Paris",
        "population": 2138551
    },
    "geometry": {
        "type": "Point",
        "coordinates": [
            2.3488,
            48.85341
        ]
    },
    "record_timestamp": "2021-01-04T11:22:14.440000+00:00"
}
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

It returns analyzed results in light and easy to parse format, which can be used as an input of modern charting libraries such as **Highchart.js** or **D3.js**.

### Parameters

#### Filtering parameters

> Count cities with a population greater than 5,000 inhabitants in each country code, filtered by a polygon in Central Europe:

```text
https://documentation-resources.huwise.com/api/records/1.0/analyze/?dataset=doc-geonames-cities-5000&x=country_code&y.my_count.func=COUNT&geofilter.polygon=(50.0,0.0),(50.0,10.0),(40.0,10.0),(40.0,0.0)
```

```json
[
    {
        "x": "AD",
        "my_count": 7
    },
    {
        "x": "AT",
        "my_count": 16
    },
    {
        "x": "BE",
        "my_count": 13
    },
    {
        "x": "CH",
        "my_count": 342
    },
    {
        "x": "DE",
        "my_count": 677
    },
    {
        "x": "ES",
        "my_count": 261
    },
    {
        "x": "FR",
        "my_count": 1468
    },
    {
        "x": "IT",
        "my_count": 512
    },
    {
        "x": "LI",
        "my_count": 11
    },
    {
        "x": "LU",
        "my_count": 17
    },
    {
        "x": "MC",
        "my_count": 3
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
`csv_separator`      | If the `format` is `csv`, defines the delimiter used. Can be `;` (default), `,`, <code>&#124;</code>, or any ASCII character. Special characters may require URL encoding.
`callback`           | JSONP callback (only in JSONP requests)

#### Aggregation parameters

> Return the population size of the biggest city for each country code:

```text
https://documentation-resources.huwise.com/api/records/1.0/analyze/?dataset=doc-geonames-cities-5000&x=country_code&y.max_population.func=MAX&y.max_population.expr=population
```

```json
[
    {
        "x": "AD",
        "max_population": 20430
    },
    {
        "x": "AE",
        "max_population": 2956587
    },
    /* ... */
    {
        "x": "ZM",
        "max_population": 1267440
    },
    {
        "x": "ZW",
        "max_population": 1542813
    }
]
```

Parameter            | Description
-------------------- | -----------
`x`                  | Field on which the data aggregation will be based. This parameter is mandatory. It allows for analyzing a subset of data according to the different values of the fields. The behavior may vary according to the field type. For **Date** and **DateTime** fields, the slices are built from the dates using the level of aggregation defined through the `precision`  and `periodic`  parameters. For other field types, the actual field values are used as x values
`y.<SERIE>.func`     | The definition of the analysis aggregation function. Multiple series can be computed at once. Simply name this parameter with an arbitrary series name that you may reuse for specifying the associated aggregated expression. The list of available aggregation functions is: `COUNT` , `AVG` , `SUM` , `MIN` , `MAX` , `STDDEV` , `SUMSQUARES` . These functions return the result of their execution on the expression provided in y.<SERIE>.expr (or simply the number of records for the `COUNT`  function) for each value of x
`y.<SERIE>.expr`     | Defines the value to be aggregated. This parameter is mandatory for every aggregation function but the `COUNT`  function. The <SERIES> parameter must have the same name as the one used for the required corresponding aggregation function. The parameter may contain the name of a numeric field in the Dataset (**Int** or **Double**) or a mathematical expression (see below to get more details on the expression language).
`y.<SERIE>.cumulative` | This parameter accepts values `true`  and `false`  (default). If the parameter is set to true, the results of a series are recursively summed up (`serie(x) = serie(x) + serie(x-1)` )
`maxpoints`            | Limits the maximum number of results returned in the serie. By default, there is no limit.
`periodic`             | Used only in cases in which x is of type **Date** or **DateTime**. It defines the level at which aggregation is done. Possible values are `year`  (default), `month` , `week` , `weekday` , `day` , `hour` , `minute` . This parameter will allow you, for instance, to compute aggregations on months across all years. For instance, with a value set to `weekday` , the output will be: `[{"x": {"weekday":0},"series1": 12}, {"x": {"weekday":1},"series1": 30}]` . When `weekday`  is used, the generated value range from 0 to 6 where 0 corresponds to Monday and 6 to Sunday
`precision`            | Used only in cases in which X is of type **Date** or **DateTime**. It defines the precision of the aggregation. Possible values are `year` , `month` , `week` , `day`  (default), `hour` , `minute` . If `weekday`  is provided as a `periodic`  parameter, the `precision`  parameter is ignored. This parameter shall respect the `precision`  annotation of the field. If the field is annotated with a precision set to `day` , the series precision can at maximum be set to `day`.
`sort`                 | Sorts the aggregation values according to the specified series or to the x parameter. By default, the values are sorted in descending order, according to the x parameter. A minus sign ('-') can be prepended to the argument to make an ascending sort

### Expression language

> Return the average value of twice the square root of the population for each country code (for the sake of example):

``` text
https://documentation-resources.huwise.com/api/records/1.0/analyze/?dataset=doc-geonames-cities-5000&x=country_code&y.series1.func=AVG&y.series1.expr=sqrt(population)*2
```

```json
[
    {
        "x": "AD",
        "series1": 189.14616030045894
    },
    {
        "x": "AE",
        "series1": 849.7322922436006
    },
    /* ... */
    {
        "x": "ZM",
        "series1": 389.98380339301144
    },
    {
        "x": "ZW",
        "series1": 438.7610954217565
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
answer is streamed, which makes it possible to optimize the memory consumption client side.

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
`format`             | Format of the response output. Can be `csv` (default), `json`, `jsonp`, `geojson`, `geojsonp`
`csv_separator`      | If the `format` is `csv`, defines the delimiter used. Can be `;` (default), `,`, <code>&#124;</code>, or any ASCII character. Special characters may require URL encoding.
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
`refine.<FACET>`     | Limit the result set to records where `FACET` has the specified value. It can be used several times for the same facet or for different facets
`exclude.<FACET>`    | Exclude records where `FACET` has the specified value from the result set. It can be used several times for the same facet or for different facets
`callback`           | JSONP or GEOJSONP callback

### Clustering parameters

> Return clusters and shapes with low precision and the average population in each cluster

```text
https://documentation-resources.huwise.com/api/records/1.0/geocluster/?dataset=doc-geonames-cities-5000&shapeprecision=1&clusterprecision=3&clusterdistance=50&y.avg_population.func=AVG&y.avg_population.expr=population
```

```json
{
    "clusters": [
        /* ... */
        {
            "cluster_center": [
                64.73423996474594,
                177.51029999926686
            ],
            "count": 1,
            "series": {
                "avg_population": 10332
            },
            "cluster": {
                "type": "Point",
                "coordinates": [
                    177.51029999926686,
                    64.73423996474594
                ]
            }
        },
        {
            "cluster_center": [
                54.03621598239988,
                158.9805759564042
            ],
            "count": 5,
            "series": {
                "avg_population": 54285.8
            },
            "cluster": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            158.40468998998404,
                            52.93109998572618
                        ],
                        [
                            158.38134999386966,
                            53.18908997811377
                        ],
                        [
                            158.6206699255854,
                            54.69609996769577
                        ],
                        [
                            160.84540992043912,
                            56.32034998387098
                        ],
                        [
                            158.65075995214283,
                            53.0444399965927
                        ],
                        [
                            158.40468998998404,
                            52.93109998572618
                        ]
                    ]
                ]
            }
        },
        /* ... */
    ],
    "count": {
        "max": 5473,
        "min": 1
    },
    "series": {
        "avg_population": {
            "max": 645386.6153846154,
            "min": 2
        }
    },
    "clusterprecision": 3
}
```

Parameter            | Description
-------------------- | -----------
`clusterprecision`   | The desired precision level, depending on the current map zoom level (for example, the Leaflet zoom level). This parameter is mandatory
`shapeprecision`     | The precision of the returned cluster envelope. The sum of clusterprecision and shapeprecision must not exceed 29
`clusterdistance`   | The distance from the cluster center (the radius). This parameter is mandatory
`clustermode`        | The desired clustering mode. Supported values are `polygon` (default) and `heatmap`
`y.<SERIE>.func`, `y.<SERIE>.expr` | This API also accepts a series definition as described in the record analysis API. If a serie is defined, the aggregation will be performed using the values of the series.
