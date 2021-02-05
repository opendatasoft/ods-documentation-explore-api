# RDF exports

Opendatasoft datasets can be exported in multiple RDF formats. More information on RDF [here](https://en.wikipedia.org/wiki/Resource_Description_Framework).

## RDF serialization formats
Opendatasoft RDF datasets are available in 4 serialization formats:

Format name | Description | Syntax specification
--------- | ----------- | -----------
`n3` | Compact and human-friendly line based format | [Here](https://www.w3.org/TR/n-triples/)
`turtle` | Simplified and RDF-only subset of `n3` format | [Here](https://www.w3.org/TR/turtle/)
`rdfxml` | XML-based format | [Here](https://www.w3.org/TR/rdf-syntax-grammar/)
`jsonld` | Json-based format | [Here](https://www.w3.org/TR/json-ld/)

## Service address

> Export a dataset using turtle format

```http
GET http://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/roman-emperors/exports/turtle
```

RDF exports of datasets are available at this address and use the format name in the previous table.

GET http://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/{DATASET_ID}/exports/{FORMAT_NAME}
