# Search API v2

> Search API endpoint for the `documentation-resources` domain

```text
https://documentation-resources.opendatasoft.com/api/v2
```

The Opendatasoft search API v2 is organized around REST. It provides access to all the data available through the platform in a coherent, hierarchical way.

- Only the HTTP `GET` method is supported.
- All API endpoints return JSON.
- Endpoints are organized in a hierarchical way describing the relative relationship between objects.
- All responses contain a list of links allowing easy and relevant navigation through the API endpoints.
- The same internal query language is used for all endpoints of the search API. It means that most of the time, parameters work the same way for all endpoints.

<aside>
The domain <a target="_blank" rel="noopener noreferrer" href="https://documentation-resources.opendatasoft.com/">https://documentation-resources.opendatasoft.com/</a> is used as an example in this documentation. You should replace it with your custom domain name,  or `data.opendatasoft.com`, which is the main hub for all open data portals published by Opendatasoft customers. It contains a lot of ready-to-play interesting datasets.
</aside>
