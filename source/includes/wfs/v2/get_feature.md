## GetFeature

> [<span style="color:white">**GetFeature** operation with the optional **PropertyName** parameter</span><style>a:hover{text-decoration: none;}</style>](https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetFeature&typename=ods:roman-emperors&propertyname=ods:roman-emperors/name)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetFeature&typename=ods:roman-emperors&propertyname=ods:roman-emperors/name HTTP/1.1
```
> [<span style="color:white">Same request using a **POST** method</span><style>a:hover{text-decoration: none;}</style>]()
```http
POST https://documentation-resources.opendatasoft.com/api/wfs HTTP/1.1
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<wfs:GetFeature
  service="WFS"
  version="1.1.0"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:myns="http://www.someserver.com/myns"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs ../wfs/1.1.0/WFS.xsd">
  <wfs:Query typeName="ods:roman-emperors">
      <wfs:PropertyName>name</wfs:PropertyName>
  </wfs:Query>
</wfs:GetFeature>
```

The `GetFeature` operation allows retrieval of features from the WFS, and output them using the GML 3.1.1
representation.

### Parameters

This is the list of the supported parameters specific to the `GetFeature` operation. You should also take into
consideration the common parameters. [See here](#parameters).

The existing parameters in the WFS standard that are not listed in this table are currently not supported.

| Parameter       | Description                                                                                                                                                                       | Optionality and use                                                     |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| `ResultType`    | Used to indicate whether a WFS should generate a complete response document or an <br> empty response document indicating only the number of features that the query would return | Optional. Values can be `hits` or `results`. Default value is `results` |
| `StartIndex`    | The starting index of the features to retrieve. This can be used for pagination of large datasets                                                                                 | Optional                                                                |
| `Count`         | Used to define the maximum number of records that should be returned from the result set of a query                                                                               | Optional                                                                |
| `TypeNames`     | A list of feature type names to query                                                                                                                                             | Optional                                                                |
| `PropertyNames` | A list of properties (dataset columns) that should be returned                                                                                                                    | Optional                                                                |
| `FeatureId`     | An enumerated list of feature instances to fetch identified by their feature identifiers                                                                                          | Optional                                                                |
| `Bbox`          | A bounding box used to filter the results by spatial extent                                                                                                                       | Optional                                                                |
| `Filter`        | A filter expression used to filter the results by attribute values                                                                                                                | Optional                                                                |
*(OutputFormat and SortBy are not supported)*

### Response paging

​One of the new features introduced from version 1.1.0 to 2.0.0 of the WFS API is the ability to set pagination for the results of this action. NumberMatched and NumberReturned allow you to determine the total number of results matching the query and the number of results returned, respectively. The "startindex" and "count" parameters are available for this operation and allow you to interact with the paging mechanism. 

It's important to note that enabling paging limits the number of results to 10,000 (**start_index + count must be lower than 10,000**) and is recommended for visualizing extents that contain relatively small amounts of data. In order to get all data, do not use the **count** parameter.

### Filter encoding

The WFS API standard implement the FilterEncoding Standard in order to filter certain features. [See more](https://www.ogc.org/standard/filter/).

This is the list of supported filter parameters specific to the `GetFeature` operation.

The existing filter parameters in the **Filter Encoding Standard** that are not listed in this table are currently not supported.

| Parameter                                                                                                                                                                                          | Description                                                                                                                                                           | Optionality and use                                                     |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| `AND`, `OR`, `NOT`                                                                                                                                                                                 | `AND` & `OR` are **logical operators** and can be used to combine one or more conditional expressions. The `NOT` operator reverses the logical value of an expression | Optional. Values can be `hits` or `results`. Default value is `results` |
| `PropertyIsEqualTo`, `PropertyIsNotEqualTo`, `PropertyIsLessThan`, `PropertyIsGreaterThan`, `PropertyIsLessThanOrEqualTo`, `PropertyIsGreaterThanOrEqualTo`, `PropertyIsBetween`, `PropertyIsNull` | **Comparison operators** are used to form expressions that evaluate the mathematical comparison between two arguments                                                 | Optional                                                                |
**(PropertyIsLike, PropertyIsNil, Equals, Disjoint, Touches, Within, Overlaps, Crosses, Intersects, Contains, DWithin, Beyond, After, Before, Begins, BegunBy, TContains, During, EndedBy, Ends, TEquals, Meets, MetBy, TOverlaps, OverlappedBy and  AnyInteracts are not supported)*

#### Filter parameter

Filter parameter is used to specify a filter expression that can be used to retrieve only the relevant features that match the given condition from a dataset. The filter expression is typically written in XML format and is used to query the data based on specific criteria.

* Example 1 : To retrieve features from the `roman-emperors` dataset with a filter expression. *(replace <filter_expression> by your own expression)*
> [<span style="color:white">**GetFeature** operation with the optional **Filter** parameter</span><style>a:hover{text-decoration: none;}</style>](https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetFeature&typename=ods:roman-emperors&filter=<filter_expression>)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetFeature&typename=ods:roman-emperors&filter=<filter_expression> HTTP/1.1
```

* Example 2 : To retrieve the features from the `roman-emperors` dataset which refer to Caligula emperor.
> [<span style="color:white">**GetFeature** operation with the optional **PropertyIsEqualTo Filter** parameter</span><style>a:hover{text-decoration: none}</style>](https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetFeature&typename=ods:roman-emperors&filter%3D%3Cfes%3AFilter%20xmlns%3Afes%3Dhttp%3A%2F%2Fwww.opengis.net%2Ffes%2F2.0%3E%3Cfes%3APropertyIsEqualTo%3E%3Cfes%3AValueReference%3Ename%3C%2Ffes%3AValueReference%3E%3Cfes%3ALiteral%3ECaligula%3C%2Ffes%3ALiteral%3E%3C%2Ffes%3APropertyIsEqualTo%3E%3C%2Ffes%3AFilter%3E)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetFeature&typename=ods:roman-emperors&filter=<fes:Filter xmlns:fes=http://www.opengis.net/fes/2.0"><fes:PropertyIsEqualTo><fes:ValueReference>name</fes:ValueReference><fes:Literal>Caligula</fes:Literal></fes:PropertyIsEqualTo></fes:Filter> HTTP/1.1
```

* Example 3 : To retrieve the features from the `roman-emperors` dataset which refer to Caligula emperor.
> [<span style="color:white">**GetFeature** operation with the optional **PropertyIsBetween Filter** parameter</span><style>a:hover{text-decoration: none}</style>](https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetFeature&typename=ods:roman-emperors&filter%3D%3Cfes%3AFilter%20xmlns%3Afes%3D%22http%3A%2F%2Fwww.opengis.net%2Ffes%2F2.0%22%3E%3Cfes%3APropertyIsBetween%3E%3Cfes%3AValueReference%3Ereign_start%3C%2Ffes%3AValueReference%3E%3Cfes%3ALowerBoundary%3E%3Cfes%3ALiteral%3E200-01-01%3C%2Ffes%3ALiteral%3E%3C%2Ffes%3ALowerBoundary%3E%3Cfes%3AUpperBoundary%3E%3Cfes%3ALiteral%3E300-01-01%3C%2Ffes%3ALiteral%3E%3C%2Ffes%3AUpperBoundary%3E%3C%2Ffes%3APropertyIsBetween%3E%3C%2Ffes%3AFilter%3E%0A)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetFeature&typename=ods:roman-emperors&filter=<fes:Filter xmlns:fes="http://www.opengis.net/fes/2.0"><fes:PropertyIsBetween><fes:ValueReference>reign_start</fes:ValueReference><fes:LowerBoundary><fes:Literal>200-01-01</fes:Literal></fes:LowerBoundary><fes:UpperBoundary><fes:Literal>300-01-01</fes:Literal></fes:UpperBoundary></fes:PropertyIsBetween></fes:Filter> HTTP/1.1
```

