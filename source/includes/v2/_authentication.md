# Authentication

> API key as rest parameter

```shell
curl "<api_endpoint>?apikey=<your_apikey>"
```

> API key as a header

```shell
curl "<api_endpoint>"
   -H "Authorization: meowmeowmeow"
```

> Replace <api_endpoint> with an API entry point and <your_apikey> with a valid API key. 

All search API entrypoints use API key and basic authentication to allow authenticated search. If no authentication method is provided, search is performed as "anonymous".