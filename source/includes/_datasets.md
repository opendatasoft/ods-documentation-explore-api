# Datasets

## The dataset object

Datasets are identifed by two kinds of identifiers:

- the `dataset_id` can be chosen during dataset creation or changed on an unpublished dataset
- the `dataset_uid` is automatically set, and will never change through the dataset's lifetime

### Attributes

Attribute | Description
--------- | -----------
`dataset_id` <br> *string*       | An human readable identifier of the dataset that can be modified when the dataset is not published
`dataset_uid` <br> *string*      | Unique identifier of the dataset that will never change throught the dataset's lifetime
`metas` <br> *[metadata object](#dataset-metadata)* | The dataset's metadata
`last_modified` <br> *datetime*  | The last modification date
`published` <br> *boolean*       | Flag indicating whether the dataset is published or not
`default_security` <br> *object* |
`visibility` <br> *string*       | Can be `domain` if visibility is the same as the domain's visibility, or `restricted` if access is restricted to allowed users and groups
`dataset_processing_status` <br> *[dataset processing status object](#dataset-processing-status)* <br> <em class="expandable">expandable</em> | The dataset's processing status
