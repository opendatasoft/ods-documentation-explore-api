## GetFeature

> [GetFeature operation with the optional PropertyName parameter](https://documentation-resources.huwise.com/api/wfs?service=WFS&request=GetFeature&version=2.0.0&typename=ods:gender-equality-in-europe&propertyname=country)

>

```http
GET https://documentation-resources.huwise.com/api/wfs?service=WFS&request=GetFeature&version=2.0.0&typename=ods:gender-equality-in-europe&propertyname=country HTTP/1.1
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
| `Count`         | Used to define the maximum number of records that should be returned from the result set of a query                                                                               | Optional                                                                |
| `TypeNames`     | A list of feature type names to query                                                                                                                                             | Optional                                                                |
| `PropertyNames` | A list of properties (dataset columns) that should be returned                                                                                                                    | Optional                                                                |
| `FeatureId`     | An enumerated list of feature instances to fetch identified by their feature identifiers                                                                                          | Optional                                                                |
| `Bbox`          | A bounding box used to filter the results by spatial extent                                                                                                                       | Optional                                                                |
*(OutputFormat and SortBy are not supported)*
