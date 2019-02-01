# School of Data LA 2019

Source code for Austin Transportation's [School of Data LA 2019](https://schoolofdata.la/) workshop.

![Pink Donut Chart Logo](./readme_images/pink-donut-logo.png)
![School of Data Logo](./readme_images/schoolofdata-logo.png)
![City of Austin Seal](./readme_images/coa_seal.png)

## Outline

We'll be using Signal Request data similar to our existing "Data Tracker" Knack application.

### Python Data ETL

- Python Client
  - download repo
  - `pip install -requirments`
- Extract/Download via Knack API
- Transform \*optional
  - filter or GIS join?
- Load data
  - PostgREST Sandbox
  - www.endpoint.internet

### Javascript Dataviz

1.  Getting Started with [Create React App](https://github.com/facebook/create-react-app)

    - `npx create-react-app frontend`
    - `cd frontend`
    - `npm start`
    - A development server should start up and open `http://localhost:3000/` in your default browser.

2.  Get data from the server (Socrata API or PostgREST endpoint)

    - `npm intall axios --save`
    - Write a function, "getDataFromEndpoint"
      - get signal request data from [Socrata](https://data.austintexas.gov/Transportation-and-Mobility/Traffic-and-Pedestrian-Signal-Requests/f6qu-b7zb)
    - Call that function inside the `componentWillMount()` lifecycle method.
    - `console.log()` the data or print it to page with `JSON.stringify(this.state.data)`

3.  Put the data into a sortable/searchable table

    - `npm install material-table --save` to install [Material Table](https://mbrn.github.io/material-table/#/)
    - add `@import url("https://fonts.googleapis.com/icon?family=Material+Icons");` to App.css file for table Icons
    - define column headers in `columns` array of objects
    - pass columns and data into `<MaterialTable/>` component

4.  Add a map

    - `npm install react-leaflet leaflet bootstrap --save` to install React-Leaflet, Leaflet & Bootstrap
    - use Bootstrap grid to put Table and Map sections side by side
    - add Map component with Markers
    - add Leaflet L.Icon.Default overrides

5.  deploy to gh-pages
