## DescribeRecord


> `DescribeRecord` operation with the optional `TypeName` parameter

```http
GET https://documentation-resources.huwise.com/api/csw?service=CSW&request=DescribeRecord&typename=csw:Record HTTP/1.1
```

> Same request using a POST method

```http
POST https://documentation-resources.huwise.com/api/csw HTTP/1.1
```

```xml
<?xml version="1.0" ?>
<DescribeRecord
    service="CSW"
    version="2.0.2"
    outputFormat="application/xml"
    schemaLanguage="http://www.w3.org/2001/XMLSchema"
    xmlns="http://www.opengis.net/cat/csw/2.0.2"
    xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2/CSW-discovery.xsd">
    <TypeName>csw:Record</TypeName>
</DescribeRecord>
```

The `DescribeRecord` operation allows clients to discover elements of the information model supported by the
catalog service.

### Parameters

This is the list of the supported parameters specific to the `DescribeRecord` operation. You should also take into
consideration the common [parameters](#parameters).

The existing parameters in the CSW standard which are not listed in this table are currently not supported.

Parameter | Description | Optionality and use
--------- | ----------- | -------------------
`TypeName` | Unordered list of zero or more type names that are to be described by the catalog. | Optional. When omitted, return all types known.
