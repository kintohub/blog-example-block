# Blog Example Block (for [kintohub](http://www.kintohub.com/))

> This is an example project used in kintohub, is used with [Auth Example Block](https://github.com/kintohub/auth-example-block)

This is a fake blog microservice used to create articles

In order to use it you must be logged in with the [auth block](https://github.com/kintohub/auth-example-block)



```
// POST /articles
{
  title: 'article title',
  body: 'article body'
}
```


## Commands

The following command are available:

* `npm install`: Installs all NPM dependencies.
* `npm start`: Starts a local web server at `http://localhost:8000` (can be changed by changing the PORT var).
* `npm run build`: clean and compile the app
* `npm run prod`: run the production version (must do `npm run build` before)
