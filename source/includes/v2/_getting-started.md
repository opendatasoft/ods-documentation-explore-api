# Getting Started

To try out the Search API, you'll get records from a dataset that includes monthly prices for gold. You'll group records per year to check whether the list is complete with 12 records per year.

You'll get data from a portal providing public access to data. So, you don't need an account or an API key.

## Step 1: Find dataset information

For this example, you will use the [GET records endpoint](#operation/getRecords) to list records from a dataset. So, you need the dataset identifier and the name of the field that stores the dates to build your request.

1. Open a browser and go to the desired domain: `https://documentation-resources.opendatasoft.com/explore`.
The `explore` page lists all datasets on the domain.

2. Click the desired dataset.
For this example, click "Gold Prices".

3. Open the **Information** tab and check the **dataset identifier**.
In this example, the dataset identifier is `gold-prices`.

4. Open the **Table** tab and check the field containing dates.
In this example, dates are stored in the `date` field.

## Step 2: Build your ODSQL query

In this example, you want to list records and group them by year.

1. To select the data you want to retrieve from the dataset, start the query with a `select` parameter.
2. To retrieve the number of records returned by the query, use the `count(*)` ODSQL function.
3. To group records by year, use a `group_by` parameter with a `year` date function.
4. The dataset stores the dates in the `date` field. Use `date` as an argument for the `year` function.
5. Put all the elements together.

The complete query is `select=count(*)&group_by=year(date)`.

## Step 3: Build your request

To retrieve data using the Search API, use the `GET` HTTP method.

The path to a resource is made up of the following elements:

  - A domain: in this example, query the Search API on the `documentation-resources.opendatasoft.com` domain.
  - A resource: from the domain's `catalog`, retrieve the `records` of the `gold-prices` dataset.
  - A query: use the `select=count(*)&group_by=year(date)` query built in the previous step.

The complete path is `https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/gold-prices/records?select=count(*)&group_by=year(date)`.


 > Example curl command:

  ```shell
  curl -X GET "https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/gold-prices/records?select=count(*)&group_by=year(date)" 
  ```

You can access the Search API using curl or any HTTP client.

 > Response from the example curl command:
 
  ```json
  {
    "links": [
        {
            "href": "https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/gold-prices/records?group_by=year%28date%29&limit=-1&select=count%28%2A%29&offset=0",
            "rel": "self"
        },
        {
            "href": "https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets/gold-prices",
            "rel": "dataset"
        },
        {
            "href": "https://documentation-resources.opendatasoft.com/api/v2/catalog/datasets",
            "rel": "datasets"
        }
    ],
    "records": [
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1988"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1989"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1990"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1991"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1992"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1993"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1994"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1995"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1996"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1997"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1998"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "1999"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2000"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2001"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2002"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2003"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2004"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2005"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2006"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2007"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2008"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2009"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2010"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2011"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2012"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2013"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2014"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2015"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2016"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2017"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2018"
                }
            }
        },
        {
            "record": {
                "fields": {
                    "count(*)": 12,
                    "year(date)": "2019"
                }
            }
        }
    ]
}
```

The JSON response includes the following elements:

- The `links` array contains links, including pagination links.
- The `records` array contains summary records. Each summary record groups dataset records by `year` from the `date` field. For each summary record, `count(*)` shows the number of returned records.

You can see that response shows that there are 12 records per year for all years. This means that the dataset really contains all monthly prices for gold from 1989 to 2019!

## Next steps

Read the [Opendatasoft Query Language (ODSQL)](#odsql) reference documentation. It will help you build queries, search and filter data from Opendatasoft portals.
