## GetRecordById

> `GetRecordById` operation with the optional `outputSchema` parameter

```http
GET https://documentation-resources.opendatasoft.com/api/csw?service=CSW&request=GetRecordById&outputschema=http://www.isotc211.org/2005/gmd&id=roman-emperors HTTP/1.1
```

> Same request using a POST method

```http
POST https://documentation-resources.opendatasoft.com/api/csw HTTP/1.1
```

```xml
<?xml version="1.0" ?>
  <GetRecordById
      service="CSW"
      version="2.0.2"
      outputFormat="application/xml"
      outputSchema="http://www.isotc211.org/2005/gmd"
      xmlns="http://www.opengis.net/cat/csw/2.0.2"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2/csw/2.0.2/CSW-discovery.xsd">
      <Id>roman-emperors</Id>
  </GetRecordById>
```

The `GetRecordById` operation allows clients to retrieve the representation of catalog records using their
identifier. The response is an XML document and the output schema can be specified.

### Parameters

This is the list of the supported parameters specific to the `GetRecordById` operation. You should also take into
consideration the common [parameters](#parameters).

The existing parameters in the CSW standard which are not listed in this table are currently not supported.

Parameter |	Description	| Optionality and use
--------- | ----------- | -------------------
`outputSchema` | Used to indicate the schema of the output that is generated in response to a GetRecordById request. | Optional <br> Values can be `http://www.opengis.net/cat/csw/2.0.2` or `http://www.isotc211.org/2005/gm` <br> Default value is `http://www.opengis.net/cat/csw/2.0.2`
`ElementSetName` | Used to indicate which named set the service shall present to the client. It usually defines the level of details present in the result set. | Optional <br> Values can be `full`, `summary` or `brief` <br> Default value is `summary`
`Id` | A list of record identifiers for the records that a CSW shall return to the client. | Mandatory <br> List of resource identifier
