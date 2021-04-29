# Search API v2 basics

## Introduction

The Opendatasoft search API v2 is organized around REST. It provides access to all the data available through the platform in a coherent, hierarchical way.

- Only the HTTP `GET` method is supported.
- All API endpoints return JSON.
- Endpoints are organized in a hierarchical way describing the relative relationship between objects.
- All responses contain a list of links allowing easy and relevant navigation through the API endpoints.
- All endpoints use the Opendatasoft Query Language (ODSQL). This means that, most of the time, parameters work the same way for all endpoints.

## Base URL

> Search API endpoint for the `documentation-resources` domain

```text
https://documentation-resources.opendatasoft.com/api/v2
```

The Search API is accessed using a base URL that is specific to a domain. In the examples provided in the documentation, we use the domain `documentation-resources.opendatasoft.com`.

URL paths start with `/api/v2/`. A path to a resource looks like this: `https://<domain>/api/v2/<resource>`.
