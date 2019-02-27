# OpenDataSoft RDF data

Data retrieved with the OpenDataSoft TPF API is in triple format described with RDF.
Data in such format can use ontologies (vocabularies) to define their meaning.

## Default Structure

By default, OpenDataSoft datasets are not enriched with ontologies. A direct mapping
of datasets to triple is used and follows 3 rules:

* A `record` is the `subject` of a triple
* A `field` is the `predicate` of a triple
* A `field value` is the `object` of a triple

Data resulting from this transformation describe dataset structure and contents but not its semantic.

## Edit Structure

OpenDataSoft datasets RDF structure can be described using [YARRRML](http://rml.io/yarrrml/) the YAML representation of RML (RDF Mapping Language).
Editing the RML mapping of a dataset modifies the structure and resources of the RDF dataset. Thus, it has an impact on RDF features such as TPF API, RDF exports, `Classes` filter, `Properties` filter, etc.

### Classes and Properties filters

The `Classes` and `Properties` filters contain all the classes and properties used in the RML mapping of the dataset.
They can be used to search datasets representing a specific concept such as Persons, Cars or properties such as age or fuel consumption.
