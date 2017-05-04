# The conventions (DRAFT):


- components are pascal cased and have .jsx ext
- default exports (classes, function, vars) should be named the same way as the file

- components in `app/` folder  
    - can be connected to redux store
    - each first level folder is named after route
    - all route handlers go in `app/` folder
    - each routing handler should be named by concating its location in PascalCase, filenames ending in Route
    
    
- all common an reusable components go into `common/components/`
    - common components might have state?


## Components
- named in PascalCase with `.jsx` extension, i.e. `ArticleList.jsx`
- component Class or Function name should correspond filename, i.e. `ArticleList`
- application core components go to `app/` folder

### App core components
- go to `app/` folder

### Route handlers
### Common dumb

## Actions

## Reducers

## Middleware

----------

## TODO:

- styles (LESS / SASS)
