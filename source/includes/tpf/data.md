# OpenDataSoft RDF data

Data retrieved with the OpenDataSoft TPF API is in triple format described with RDF.
Data in such format can use ontologies (vocabularies) to define their meaning.

## Structure

For the moment, OpenDataSoft datasets are not enriched with ontologies. A direct mapping
of datasets to triple is used and follows 3 rules:

* A `record` is the `subject` of a triple
* A `field` is the `predicate` of a triple
* A `field value` is the `object` of a triple

Data resulting from this transformation describe dataset structure and contents but not its semantic.
OpenDataSoft is working on enhancing linked data features.
