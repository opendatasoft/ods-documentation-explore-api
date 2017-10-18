## DescribeFeatureType

> `DescribeFeatureType` operation with the optional `TypeName` parameter

```http
GET https://examples.opendatasoft.com/api/wfs?service=WFS&request=DescribeFeatureType&typeName=ods:world-heritage-unesco-list HTTP/1.1
```

> Same request using a POST method

```http
POST https://examples.opendatasoft.com/api/wfs HTTP/1.1
```

```xml
<?xml version="1.0" ?>
<DescribeFeatureType
    version="1.1.0"
    service="WFS"
    xmlns="http://www.opengis.net/wfs"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/wfs ../wfs/1.1.0/WFS.xsd">
    <TypeName>ods:world-heritage-unesco-list</TypeName>
</DescribeFeatureType>
```

The `DescribeFeatureType` operation generates a schema description of features types serviced by the WFS.

### Parameters

This is the list of the supported parameters specific to the `DescribeFeatureType` operation. You should also take into
consideration the common parameters. [See more](#parameters)

The existing parameters in the WFS standard which are not listed in this table are currently not supported.

Parameter | Description | Optionality and use
--------- | ----------- | -------------------
`TypeName` | A comma separated list of feature types to describe. If no value is specified that is to be interpreted as all <br> feature types. | Optional. When omitted, return all types known.
