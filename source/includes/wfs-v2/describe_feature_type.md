## DescribeFeatureType

> [DescribeFeatureType operation with the optional TypeNames parameter](https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=DescribeFeatureType&version=2.0.0&typeNames=ods:roman-emperors)

>

```http
GET https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=DescribeFeatureType&version=2.0.0&typeNames=ods:roman-emperors HTTP/1.1
```


The `DescribeFeatureType` operation generates a schema description of features types serviced by the WFS.

### Parameters

This is the list of the supported parameters specific to the `DescribeFeatureType` operation. You should also take into
consideration the common parameters. [See here](#parameters)

The existing parameters in the WFS standard that are not listed in this table are currently not supported.

| Parameter  | Description                                          | Optionality and use                                     |
|------------|------------------------------------------------------|---------------------------------------------------------|
| `TypeName` | A comma-separated list of feature types to describe. | Optional. When omitted, return all feature types known. |
**(OutputFormat is not supported)*
