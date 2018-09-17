# url shortener
URLShortener Assignment

# Features
    1. Accept any URL as input. (eg. https://www.google.com/intl/en/policies/privacy/)
    2. Produce a secure short output URL. (eg. https://shrt.com/h3Zk32p)
    3. When users visit the output URL, they should be redirected to the original URL.*
    4. Accept a requested URL as input. (eg. “goog” to get https://short.url/goog)

*if you want redirect like a http://localhost/h3Zk32p please add rewrite rule on nginx server on site-enable 
```
location ~* "^/[0-9a-z@]{5,15}$"  {
            rewrite ^/(.*)$ http://localhost:9000/api/item/$1 redirect;
    }
```