## GetRecords

> `GetRecords` operation with the optional `resultType`, `outputSchema` and
`ElementSetName` parameters

```http
GET https://documentation-resources.opendatasoft.com/api/csw?service=CSW&request=GetRecords&resulttype=results&elementsetname=full&outputschema=http://www.isotc211.org/2005/gmd&typenames=csw:Record HTTP/1.1
```

> Same request using a POST method

```http
POST https://documentation-resources.opendatasoft.com/api/csw HTTP/1.1
```

```xml
<?xml version="1.0" ?>
<GetRecords
  service="CSW"
  resultType="results"
  outputSchema="http://www.isotc211.org/2005/gmd"
  xmlns="http://www.opengis.net/cat/csw/2.0.2"
  xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2/CSW-discovery.xsd">
  <Query typeNames="Record">
      <ElementSetName>full</ElementSetName>
  </Query>
</GetRecords>
````

The `GetRecords` operation allows clients to discover resources (datasets). The response is an XML document and
the output schema can be specified.

### Parameters

This is the list of the supported parameters specific to the `GetRecords` operation. You should also take into
consideration the common parameters. [See more](#parameters).

The existing parameters in the CSW standard which are not listed in this table are currently not supported.

Parameter | Description | Optionality and use
--------- | ----------- | -------------------
`resultType` | Determines whether the catalogue returns just a summary of the result set, or includes one or more records from the result set. | Optional. Values can be `hits` or `results`. Default value is `hits`.
`outputSchema` | Used to indicate the schema of the output that is generated in response to a `GetRecords` request. | Optional. Values can be `http://www.opengis.net/cat/csw/2.0.2` or `http://www.isotc211.org/2005/gmd`. <br> Default value is `http://www.opengis.net/cat/csw/2.0.2`.
`startPosition` | Used to indicate at which record position the catalogue should start generating output. | Optional. Value must be a non-zero positive integer. Default value is 1.
`maxRecords` | Used to define the maximum number of records that should be returned from the result set of a query. | Optional. Value must be a positive integer. Default value is 10.
`ElementSetName` | Used to indicate which named set the service shall present to the client. It usually defines the level of details present in the result set. | Optional. Values can be `full`, `summary` or `brief`. Default value is `summary`.
`typeNames` | Used to indicate which named set the service shall present to the client. It usually defines the level of details present in the result set. | Mandatory. Values can be `csw:Record` or `gmd:MD_Metadata`.
