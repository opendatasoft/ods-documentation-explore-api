# Authentication

An authenticated user can be granted access to restricted datasets and benefit from extended quotas for API calls. The API features an authentication mechanism for users to be granted their specific authorizations.

For the platform to authenticate a user, you need to either:

* be logged in a portal so a session cookie authenticating your user is passed along your API calls
* provide your username and password as HTTP Basic authentication tokens
* provide an **API key** as a request parameter

## Finding and generating API keys

In order to see the list of your API keys, head to your profile page on `http://<youropendatasoftportal>.com/account/` (or by clicking on your name in the header).

![Link to account settings](common/authentication__profile-link.png)

Once there, go to the tab named **My API keys** to see your existing API keys, revoke them and create new ones.

![Account's API keys page](common/authentication__my-api-keys.png)

<aside>
   Every API key authenticates requests as coming from your user, which means they grant the same rights (yours) to any person using them. Therefore, you should not share your keys.
</aside>

## Providing API keys within your requests

API keys are passed along requests through the query parameter `apikey`.


> Unauthenticated request on private portal

``` text
> GET https://private-portal.opendatasoft.com/api/v2/catalog/datasets/ HTTP/1.1

< HTTP/1.0 401 Unauthorized
```

For example, accessing a private portal's catalog unauthenticated will return a `401 Unauthorized` error.


> Request authenticated with an API key

``` text
> GET https://private-portal.opendatasoft.com/api/v2/catalog/datasets/?apikey=7511e8cc6d6dbe65f9bc8dae19e08c08a2cab96ef45a86112d303eee HTTP/1.1

< HTTP/1.0 200 OK
```

``` json
{
    "total_count": 4,
    "links": [{
        "href": "https://private-portal.opendatasoft.com/api/v2/catalog/datasets?start=0&include_app_metas=False&rows=10",
        "rel": "self"
    }, {
        "href": "https://private-portal.opendatasoft.com/api/v2/catalog/datasets?start=0&include_app_metas=False&rows=10",
        "rel": "first"
    }, {
        "href": "https://private-portal.opendatasoft.com/api/v2/catalog/datasets?start=0&include_app_metas=False&rows=10",
        "rel": "last"
    }],
    "datasets": [...]
}
```

 But passing the API key of an authorized user will return the JSON response with the list of accessible datasets for this user on the portal.
