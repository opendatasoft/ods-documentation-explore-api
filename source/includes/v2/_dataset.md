# Dataset

This section lists all entry points to work on a specific dataset data called `records`.

## Field literal in dataset queries

Some parameters, such as `select`, `where` or `group_by`, in the following entry points accept [field literal](#field-literal)
In catalog search, a field literal can either be a technical field or a field from dataset mapping.

<div class=“clearfix”></div>
### Record technical fields:

Field name | Description
---------- | -----------
datasetid | Human readable dataset identifier
record_timestamp | Date field indicating publishing date
recordid | Unique identifier the record
record_size | Size of the record

<div class=“clearfix”></div>
### Dataset field
> Use a field name as field_literal
