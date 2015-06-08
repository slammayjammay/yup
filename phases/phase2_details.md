# Phase 2: Showing businesses

## Rails
### Models
* Business

### Controllers
* Api::BusinessesController (show)

### Views
* businesses/show.json.jbuilder

## Backbone
### Models
* business (parses nested `reviews` association)

### Collections
* businesses

### Views
BusinessShow (composite view, will contain ReviewsIndexItem subview)

## Gems/Libraries
