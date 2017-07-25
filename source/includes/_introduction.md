# Introduction

> API endpoint

```text
https://mydomain.opendatasoft.com/api/v2
```

The OpenDataSoft search API v2 is organized around REST. It provides access in a coherent, hierarchical way to all the data available through the platform. 

- only HTTP `GET` method is supported
- all API endpoints return JSON
- endpoints are organized in a hierarchical way describing the relative relationship between objects
- all responses contain a list of links allowing easy and relevant navigation through the API endpoints
- search API use the same internal query language. That means, that parameters "mostly" work the same way in all entrypoints
