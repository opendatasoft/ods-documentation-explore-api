# Datasets

Datasets are at the core of the platform. A dataset is composed of:

- the actual data available on the portal (not available via the management API)
- metadata like a title, a description and keywords describing the data, so users can discover it in the portal's catalog
- configurations for processors, visualisation and security, which define the way data will be processed by the platform and made visible to users

Through the management API, it is possible to:

- create datasets
- attach resources to datasets
- configure datasets processing pipeline, visualisations and security attributes
- publish datasets

## The dataset object

Datasets are identified by 2 kinds of identifiers:

- the `dataset_uid` that is automatically set, and will never change through the dataset's lifetime
- the `dataset_id`, that can be chosen during dataset creation or changed on an unpublished dataset

### Attributes

Attribute | Description
--------- | -----------
`dataset_id` <br> *string*       | Human readable identifier of the dataset that can be modified when the dataset is not published
`dataset_uid` <br> *string*      | Unique identifier of the dataset that will never change through the dataset's lifetime
`metas` <br> *[metadata object](#dataset-metadata)* | Dictionary of attributes about the dataset like a title, a description, keywords, that make it easily searchable through the portal's catalog
`last_modified` <br> *datetime*  | Date when the dataset's configuration was last edited
`published` <br> *boolean*       | Flag indicating whether the dataset is published or not
`default_security` <br> *object* |
`visibility` <br> *string*       | Defines if the dataset is visible for anonymous visitors <br> Can be `domain` if visibility is the same as the domain's visibility, or `restricted` if access is restricted to allowed users and groups
`dataset_processing_status` <br> *[dataset processing status object](#dataset-processing-status)* | Keyword indicating if the dataset is waiting to be published, currently being published or if it encountered errors during last publishing <br> *expandable*
