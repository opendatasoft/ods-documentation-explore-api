## DescribeFeatureType

The `DescribeFeatureType` operation generates a schema description of features types serviced by the WFS.

### Parameters

This is the list of the supported parameters specific to the `DescribeFeatureType` operation. You should also take into
consideration the common parameters. [See more](#parameters)

The existing parameters in the WFS standard which are not listed in this table are currently not supported.

Parameter | Description | Optionality and use
--------- | ----------- | -------------------
`TypeName` | A comma separated list of feature types to describe. If no value is specified that is to be interpreted as all <br> feature types. | Optional. When omitted, return all types known.

### Examples

Here is an example of a `DescribeFeatureType` operation with the optional `TypeName` parameter, using a `GET` HTTP method :

```http
GET http://public.opendatasoft.com/api/wfs?service=WFS&request=DescribeFeatureType&typeName=ods:petits_marchands_sur_l_espace_public
```

And the same request using a `POST` HTTP method :

```http
POST http://public.opendatasoft.com/api/wfs
```

The request body :

```xml
<?xml version="1.0" ?>
<DescribeFeatureType
    version="1.1.0"
    service="WFS"
    xmlns="http://www.opengis.net/wfs"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/wfs ../wfs/1.1.0/WFS.xsd">
    <TypeName>ods:petits_marchands_sur_l_espace_public</TypeName>
</DescribeFeatureType>
```
