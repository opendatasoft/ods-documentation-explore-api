## GetFeature

> [GetFeature operation with the optional PropertyName parameter](https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetFeature&version=2.0.0&typename=ods:roman-emperors&propertyname=ods:roman-emperors/name)

>

```http
GET https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetFeature&version=2.0.0&typename=ods:roman-emperors&propertyname=ods:roman-emperors/name HTTP/1.1
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
*(OutputFormat and SortBy are not supported)*

### Response paging

​One of the new features introduced in 2.0.0 of the WFS API is the ability to set pagination for the results of this action. NumberMatched and NumberReturned allow you to determine the total number of results matching the query and the number of results returned, respectively. The "startindex" and "count" parameters are available for this operation and allow you to interact with the paging mechanism. 

It's important to note that enabling paging limits the number of results to 10,000 (**start_index + count must be lower than 10,000**) and is recommended for visualizing extents that contain relatively small amounts of data. In order to get all data, do not use the **count** parameter.
