## DescribeFeatureType

> [<span style="color:white">**DescribeFeatureType** operation with the optional **TypeNames** parameter</span><style>a:hover{text-decoration: none;}</style>](https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=DescribeFeatureType&typeNames=ods:roman-emperors)
```http
GET https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=DescribeFeatureType&typeNames=ods:roman-emperors HTTP/1.1
```

> [<span style="color:white">Same request using a **POST** method</span><style>a:hover{text-decoration: none}</style>]()
```http
POST documentation-resources.opendatasoft/api/wfs HTTP/1.1
```

```xml
<?xml version="1.0" ?>
<DescribeFeatureType
    version="1.1.0"
    service="WFS"
    xmlns="http://www.opengis.net/wfs"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/wfs ../wfs/1.1.0/WFS.xsd">
    <TypeName>ods:roman-emperors</TypeName>
</DescribeFeatureType>
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
