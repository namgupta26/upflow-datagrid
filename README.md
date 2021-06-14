# Upflow DataGrid

A re-usable datagrid component in React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The Grid Component takes 2 parameters:
- gridData : Array of JSON objects representing the data.

```
[
    {
      "name": "My Name is Naman Gupta 0",
      "address": "Country is 0",
      "age": 9,
      "score": 82
    }
]
```

- gridHeaderData: Array of header fields and their configuration.

```
[
    {
        name: prop[0].toUpperCase() + prop.slice(1),
        id:prop,
        sortable: true,
        align: AlignmentEnum['center']
    }
]
```


# Features

- Handles Large Number of Rows (Infinite Scrolling) - tested for 1,00,00 rows
- Reusable API
- Light Backend for DataGrid
- Able to sort by click on header
- Able to delete rows
- Autosize based on content (Experimental)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

