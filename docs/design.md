# MkDn Design


## Runtime Life-cycle

### Web component initialization

description of web component initialization

### `md-view` initialization
1. `md-store` or `md-static-store` 
    - It loads the index specified in the `src` attribute   
    - publishes the index
1. `md-list`
    - hears the index publication
    - renders the index
    - fires default selection if found
1. `md-crumbs`
    - hear the index publication event
    - renders breadcrumbs
1. `md-store`
    - hears selection
    - request story from backend
    - fires story received event
1. `md-story`
    - hears story received event
    - renders story
1. `md-crumbs`
    - hears story received event
    - updates bread crumbs
    - updates url hash 
1. user selects a story from `md-list`
    - new selection event is fired
    - goto point 4 above
    
## Events

Hear is the list of events that an can be listened to integrate with MkDn

### Public Events

| Event Name | dispatched from | when | payload(detail)  |
|---|---|---|---|
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

### Private Events
There are some private events that are not recommended to rely on. They are listed here for the sake of documentation.

| Event Name | dispatched from | when | payload(detail)  |
|---|---|---|---|
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
