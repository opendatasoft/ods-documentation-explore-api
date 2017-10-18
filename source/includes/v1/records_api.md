# Dataset Records APIs

## Records Analysis API

```http
GET /api/records/1.0/analyze HTTP/1.1
```

This API provides powerful analytics features over a set of selected records. It returns analyzed results in light and
easy to parse format which can used as an input of modern charting libraries such as **Highchart.js** or **D3.js**.


### Parameters

Parameter | Description
--------- | -----------
`datasetid` | Identifier of the dataset. This field is mandatory.
`q` | The full-text query. This parameter can be left empty, in which case no full-text filtering on the result set occurs.
`geofilter.distance` | Limits the result set to a geographical area defined by a circle (coordinates of the center of the circle expressed in WGS84 and distance expressed in meters): `latitude,longitude,distance` . Example: `geofilter.distance=48.8520930694,2.34738897685,1000`
`geofilter.polygon` | Limits the result set to a geographical area defined by a polygon (coordinates of the points expressed in WGS84): `(lat1,lon1),(lat2,lon2),(lat3,lon3)` . Example: `geofilter.polygon=(48.883086,2.379072),(48.879022,2.379930),(48.883651,2.386968)`
`refine.<FACET>` | Facet based filtering. This parameter limits the result set to the results matching a facet value. It can be used several times for the same facet or for different facets. Examples: `refine.city=Paris` , `refine.city=Paris&refine.year=2013`
`exclude.<FACET>` | Facet based filtering. This parameter excludes the results matching a facet's value from the result set. It can be used several times for the same facet or for different facets. Examples: `exclude.city=Paris` , `exclude.city=Paris&exclude.year=2013`
`format` | Format of the response output. One of JSON (default), CSV and GeoJSONP.
`callback` | JSONP callback. Example: `format=jsonp&callback=myFunction`
`x` | The name of the field on which the data aggregation will be based. This is a mandatory parameter. It allows for analyzing a subset of data according to the different values of the fields. The behavior may vary according to the field type. For **Date** and **DateTime** fields, the slices are built from the dates using the level of aggregation defined through the `precision`  and `periodic`  parameters. For other field types, the actual field values are used as x values.
`y.<SERIE>.func` | The definition of the analysis aggregation function. Multiple series can be computed at once, simply name this parameter with an arbitrary serie name that you may reuse for specifying the associated aggregated expression. The list of available aggregation functions is: `COUNT` , `AVG` , `SUM` , `MIN` , `MAX` , `STDDEV` , `SUMSQUARES` . These functions return the result of their execution on the expression provided in y.<SERIE>.expr (or simply the number of records for the `COUNT`  function) for each value of x.
`y.<SERIE>.expr` | Defines the value to be aggregated. This parameter is mandatory for every aggregation function but the `COUNT`  function. The <SERIES> parameter must have the same name as the one used for the required corresponding aggregation function. The parameter may contain the name of a numeric field in the Dataset (**Int** or **Double**), or a mathematical expression (see below to get more details on the expression language).
`y.<SERIE>.cumulative` | This parameter accepts values `true`  and `false`  (default). If the parameter is set to true, the results of a series are recursively summed up (`serie(x) = serie(x) + serie(x-1)` ).
`maxpoints` | Limits the maximum number of results returned in the serie. By default there is no limit.
`periodic` | Used only in cases in which x is of type **Date** or **DateTime**. It defines the level at which aggregation is done. Possible values are `year`  (default), `month` , `week` , `weekday` , `day` , `hour` , `minute` . This parameter will allow you, for instance, to compute aggregations on months across all years. For instance, with a value set to `weekday` , the output will be: `[{"x": {"weekday":0},"series1": 12}, {"x": {"weekday":1},"series1": 30}]` . When `weekday`  is used, the generated value range from 0 to 6 where 0 corresponds to Monday and 6 to Sunday.
`precision` | Used only in cases in which X is of type **Date** or **DateTime**. It defines the precision of the aggregation. Possible values are `year` , `month` , `week` , `day`  (default), `hour` , `minute` . If `weekday`  is provided as a `periodic`  parameter, the `precision`  parameter is ignored. This parameter shall respect the `precision`  annotation of the field. If the field is annotated with a precision set to `day` , the serie precision can at maximum be set to `day` . For Example: `x=event_date&periodic=year&precision=month&y.series1.func=COUNT`  will output `[{"x": {"year": 2002, "month":1},"series1": 3}, {"x": {"year": 2002, "month":1},"series1": 5}]`
`sort` | sorts the aggregation values according to the specified series, or to the x parameter. By default, the values are sorted in descending order, according to the x parameter. A minus sign ('-') can however be prepended to the argument to make an ascending sort. Examples: `x=city&y.series1.func=SUM&y.series1.expr=population&sort=-x` , ` x=city&y.series1.func=SUM&y.series1.expr=population&sort=-series1`

### Expression language

> Example analysis query

```text
x=espece_arbre&y.series1.func=Min&y.series1.expr=sin(height)*2
```

An arbitrary expression can be used as the value of the definition of an aggregated.

* Classical numerical operators are available: `+`, `-`, `*`, `/`
* Parenthesis can be used to group sub expressions together
* The following functions are also available: time, sin, cos, tan, asin, acos, atan, toRadians, toDegrees, exp, log, log10, sqrt, cbrt, IEEEremainder, ceil, floor, rint, atan2, pow, round, random, abs, max, min, ulp, signum, sinh, cosh, tanh, hypot

## Records Download API

```http
GET /api/records/1.0/download HTTP/1.1
```

This API provides an efficient way to download a large set of records out of a dataset. The HTTP
answer is streamed which makes it possible to optimize the memory consumption client side.

### Parameters

Parameter | Description
--------- | -----------
`datasetid` | Identifier of the dataset. This field is mandatory.
`q` | The full-text query. This parameter can be left empty, in which case no full-text filtering on the result set occurs.
`geofilter.distance` | Limits the result set to a geographical area defined by a circle (coordinates of the center of the circle expressed in WGS84 and distance expressed in meters): `latitude,longitude,distance` . Example: `geofilter.distance=48.8520930694,2.34738897685,1000`
`geofilter.polygon` | Limits the result set to a geographical area defined by a polygon (coordinates of the points expressed in WGS84): `(lat1,lon1),(lat2,lon2),(lat3,lon3)` . Example: `geofilter.polygon=(48.883086,2.379072),(48.879022,2.379930),(48.883651,2.386968)`
`facet` | Activates faceting on the specified field (see Appendices for the available list of facets on Datasets). This parameter can be used multiple times to simultaneously activate several facets. By default, faceting is disabled. Example: `facet=city`
`refine.<FACET>` | Facet based filtering. This parameter limits the result set to the results matching a facet value. It can be used several times for the same facet or for different facets. Examples: `refine.city=Paris` , `refine.city=Paris&refine.year=2013`
`exclude.<FACET>` | Facet based filtering. This parameter excludes the results matching a facet's value from the result set. It can be used several times for the same facet or for different facets. Examples: `exclude.city=Paris` , `exclude.city=Paris&exclude.year=2013`
`pretty_print` | If set to true (default is false), pretty prints JSON and JSONP outputs.
`fields` | Restricts fields to retrieve. This parameter accepts multiple field names separated by commas. Example: `fields=field1,field2,field3`
`format` | Format of the response output. One of CSV, JSON (default), JSONP, GeoJSON and GeoJSONP.
`callback` | JSONP or GeoJSONP callback. Example: `format=jsonp&callback=myFunction`

## Records Geo Clustering API

```http
GET /api/records/1.0/geocluster HTTP/1.1
```

This API provides powerful geo clustering features over a set of selected records. It returns results under a format
which can easily be used to build comprehensive data visualizations on a map, using a very large number of records.

This API takes, as an input, the cluster precision and a polygon representing the current view (on a map) and returns a
list of clusters with the number of points contained in each cluster and the polygon of the cluster envelope (along
with computed analytical series when required).

The clustering results are returned in JSON.

### Parameters

Parameter | Description
--------- | -----------
`datasetid` | Identifier of the dataset. This field is mandatory.
`q` | The full-text query. This parameter can be left empty, in which case no full-text filtering on the result set occurs.
`geofilter.distance` | Limits the result set to a geographical area defined by a circle (coordinates of the center of the circle expressed in WGS84 and distance expressed in meters): `latitude,longitude,distance` . Example: `geofilter.distance=48.8520930694,2.34738897685,1000`
`geofilter.polygon` | Limits the result set to a geographical area defined by a polygon (coordinates of the points expressed in WGS84): `(lat1,lon1),(lat2,lon2),(lat3,lon3)` . Example: `geofilter.polygon=(48.883086,2.379072),(48.879022,2.379930),(48.883651,2.386968)`
`refine.<FACET>` | Facet based filtering. This parameter limits the result set to the results matching a facet value. It can be used several times for the same facet or for different facets. Examples: `refine.city=Paris` , `refine.city=Paris&refine.year=2013`
`exclude.<FACET>` | Facet based filtering. This parameter excludes the results matching a facet's value from the result set. It can be used several times for the same facet or for different facets. Examples: `exclude.city=Paris` , `exclude.city=Paris&exclude.year=2013`
`format` | Format of the response output. One of JSON (default), CSV and GeoJSONP.
`callback` | JSONP callback. Example: `format=jsonp&callback=myFunction`
`clusterprecision` | The desired precision level, depending on the current map zoom level (if used through Leaflet, the Leaflet zoom level can be used). This parameter is mandatory.
`shapeprecision` | Defines the precision of the returned cluster envelope. The sum of clusterprecision and shapeprecision may not exceed 29.
`clustermode` | Defines the desired clustering mode. Supported values are `polygon`  (default) and `heatmap`. `y.<SERIE>.fun and y.<SERIE>.expr` This API may also accept a serie definition as described in the records analysis API. If a serie is defined, the aggregation will be performed using the values of the serie. For example: `clusterprecision=6&y.serie1.expr=height&y.series1.func=SUM`

## Record Lookup API

```http
GET /api/datasets/1.0/<dataset_id>/records/<record_id> HTTP/1.1
```

This API makes it possible to fetch an individual record using its identifier (Record ID).

### Parameters

Parameter | Description
--------- | -----------
`datasetid` | Part of the URL path. Identifier of the dataset. Example: `https://opendata.paris.fr/api/dataset/1.0/arbresremarquablesparis2011/`
`recordid` | Part of the URL path. Identifier of the record. Example: `https://opendata.paris.fr/api/dataset/1.0/<dataset_id>/records/758885b5183fd28f14ecf39e44484fdccf/`
`pretty_print` | If set to true (default is false), pretty prints JSON and JSONP outputs.
`format` | Format of the response output. One of JSON (default) and JSONP.
`callback` | JSONP callback. Example: `format=jsonp&callback=myFunction`

## Record Search API

```http
GET /api/records/1.0/search HTTP/1.1
```

This API makes it possible to perform complex queries on the records of a dataset, such as full-text search or geo
search. It also provides faceted search features on dataset records.

### Parameters

Parameter | Description
--------- | -----------
`datasetid` | Identifier of the dataset. Datasets that are hosted in the same domain may be queried simultaneously. Simply repeat the dataset parameter for each dataset you need to query. This field is mandatory.
`q` | The full-text query. This parameter can be left empty, in which case no full-text filtering on the result set occurs.
`geofilter.distance` | Limits the result set to a geographical area defined by a circle (coordinates of the center of the circle expressed in WGS84 and distance expressed in meters): `latitude,longitude,distance` . Example: `geofilter.distance=48.8520930694,2.34738897685,1000`
`geofilter.polygon` | Limits the result set to a geographical area defined by a polygon (coordinates of the points expressed in WGS84): `(lat1,lon1),(lat2,lon2),(lat3,lon3)` . Example: `geofilter.polygon=(48.883086,2.379072),(48.879022,2.379930),(48.883651,2.386968)`
`facet` | Activates faceting on the specified field (see Appendices for the available list of facets on Datasets). This parameter can be used multiple times to simultaneously activate several facets. By default, faceting is disabled. Example: `facet=city`
`refine.<FACET>` | Facet based filtering. This parameter limits the result set to the results matching a facet value. It can be used several times for the same facet or for different facets. Examples: `refine.city=Paris` , `refine.city=Paris&refine.year=2013`
`exclude.<FACET>` | Facet based filtering. This parameter excludes the results matching a facet's value from the result set. It can be used several times for the same facet or for different facets. Examples: `exclude.city=Paris` , `exclude.city=Paris&exclude.year=2013`
`sort` | Sorts results according to the specified field. By default, the sort is descending (from the highest value to the smallest value). A minus sign ('-') may be used to perform an ascending sort. Sorting is only available on numeric fields (int, double, date and datetime) and on text fields which have the `sortable`  annotation. Examples: `sort=price` , `sort=-width`
`rows` | Number of results to return in a single call. The maximum number of rows returned is 1000. By default, 10 results are returned.
`start` | Index of the first result to return (starting at 0). To be used in conjunction with "rows" to implement paging.
`fields` | Restricts fields to retrieve. This parameter accepts multiple field names separated by commas. Example: `fields=field1,field2,field3`
`pretty_print` | If set to true (default is false), pretty prints JSON and JSONP outputs.
`format` | Format of the response output. One of JSON (default), JSONP, GeoJSON and GeoJSONP.
`callback` | JSONP or GeoJSONP callback. Example: `format=jsonp&callback=myFunction`
