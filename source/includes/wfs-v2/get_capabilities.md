# Operations

## GetCapabilities

> [GetCapabilities operation with the optional Sections parameter](https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetCapabilities&sections=OperationsMetadata,FeatureTypeList)

>

```http
GET https://documentation-resources.opendatasoft.com/api/wfs?service=WFS&request=GetCapabilities&sections=OperationsMetadata,FeatureTypeList HTTP/1.1
```

The `GetCapabilities` operation allows clients to retrieve service metadata. The response is an XML document
containing the information.

### Parameters

This is the list of the supported parameters specific to the `GetCapabilities` operation. You should also take into
consideration the common parameters. [See here](#parameters).

The existing parameters in the WFS standard that are not listed in this table are currently not supported.

| Parameter        | Description                                                                                                                     | Optionality and use                                                     |
|------------------|---------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| `Sections`       | Unordered list of zero or more names of sections of service metadata document to be returned in service metadata <br> document. | Optional. When omitted, returns the complete service metadata document. |
| `AcceptVersions` | Prioritized sequence of one or more specification versions accepted by client, with preferred versions listed <br> first.       | Optional. When omitted, returns the latest supported version.           |
**(AcceptFormats and UpdateSequences are not supported)*

### Response document
The WFS API returns from a GetCapabilities request sections in the service metadata. The section name can be used as a value for the
`Sections` parameter.

| Section name            | Content                                                             |
|-------------------------|---------------------------------------------------------------------|
| `ServiceIdentification` | Metadata about the WFS implementation                               |
| `ServiceProvider`       | Metadata about the organization offering the WFS service            |
| `OperationsMetadata`    | Metadata about the WFS operations offered by the WFS implementation |
| `FeatureTypeList`       | List of features types that are available from the service          |
| `Languages`             | Languages supported from the service                                |
| `Filter_Capabilities`   | Metadata about the Filter encoding implementation                   |
