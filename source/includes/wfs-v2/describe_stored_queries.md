## DescribeFeatureType

> `DescribeFeatureType` operation with the optional `TypeName` parameter

```http
GET https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=DescribeFeatureType&typeName=ods:roman-emperors HTTP/1.1
```

The `DescribeFeatureType` operation generates a schema description of features types serviced by the WFS.

### Parameters

This is the list of the supported parameters specific to the `DescribeFeatureType` operation. You should also take into
consideration the common parameters. [See more](#parameters)

The existing parameters in the WFS standard that are not listed in this table are currently not supported.

Parameter | Description | Optionality and use
--------- | ----------- | -------------------
`TypeName` | A comma-separated list of feature types to describe. | Optional. When omitted, return all feature types known.
