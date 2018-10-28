# MkDn Data APi

This section describes data structures and how it is loaded by the components

## Data Structures

## Story

It's a text file with the `.md` extension at a reacheable URL that follows the markdown notation convention. 

## Story Definition

Story definitions are key/value pairs consisting of a unique URL key and a map of meta-data as a property. In it's simplest valid form a story consists of a url and title. 

In most cases it should be enough to specify 
```
    {
        "my-blog-asset-name": {
            "title": "My First Blog: Introduction to MkDn",         
            "short-title": "My First Blog"
        }
    }
```

The minimum is to provide just a key and a title, This is enough for simple cases.
```
    {
        "my-blog-asset-name": "My First Blog"
        
    }
```
---
note: To use keys with 'aliased' names you will have to specify the `stories` attribute on `md-store`. 

---
### Options
There are some optional fields.

```
    {
        "my-blog-asset-name": {
            "title": "My First Blog: Introduction to MkDn",
            
            "redirect": "false",
            "hash": "my-first-blog",
            "short-title": "My First Blog",
            "content":"This is the content"
        }
    }
```
| option | default  | type  | usage |
|---|---|---|---|
| `redirect`  |  `false` | booolean  | used to redirect page to non-markdown page  |
|  `hash` | `undefined`  | String  | used as the hash url segment. If not provided then the `short-title` will be used, if not present then the key(url) will be used. |
| `short-title`  | `undefined`  | String  | used by `md-crumbs` because space is limited|
| `content`  | `undefined`  | String  | used internally to store retrieved content|

### Redirecting Story

This is a special case. It provides the ability to add to the list of Stories external links.

 ```
 {
     "https://google.com": {
         "redirect": "true", 
         "title": "google"}
 }
 ```


## Section

A section defines a logical set of related stories. A common way to do this in  blogs is to do it by year and month. But sections could be defined for other purposes.

 ```
 {
     "section": {
         "title": "November",
         "url": "md/2018/index.json",
         "member-of": {
             "title": "2018",
             "url": "md/2018/index.json"
         }
     }
 }
 ```
| option | default  | type  | usage |
|---|---|---|---|
| `title`  |  `undefined` | String  | section name  |
|  `url` | `undefined`  | URL  | url to index files. |
| `member-of`  | `undefined`  | Object  | define ancestor relationship|
| `member-of.title`  | `undefined`  | String  | display title of parent section|
| `member-of.url`  | `undefined`  | URL  | URL of json file to load parent section|

## Index 

An index brings together a list of related `stories` and a `section` to describe that set of stories.
 
 ```
 {
     "section": {
         "title": "November",
         "url": "md/2018/index.json",
         "member-of": {
             "title": "2018",
             "url": "md/2018/index.json"
         }
     },
     "stories": {
         "my-first-Blog": "My First Blog",
         "my-second-blog": {
             "title": "My Second Blog: Introduction to MkDn",
             "hash": "my-second-blog",
             "short-title": "My 2nd Blog"
         },
         "https://google.com": {"redirect": "true", "title": "google"}
     },
     "default":"my-first-Blog"
 }
 ```
| option | default  | type  | usage |
|---|---|---|---|
| `section` | `undefined` | String | section  |
| `stories` | `undefined` | Object | map of stories |
| `default` | `undefined` | String | key of story to display first|


Indexes can be minimal as well
```
{
    "stories": {
        "my-first-chapter": "My First Chapter",
        "my-second-chapter": "My Second Chapter",
        "my-third-chapter": "My Third and Final Chapter"
    }
}
```



