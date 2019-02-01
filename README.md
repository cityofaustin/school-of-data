# School of Data LA 2019

Source code for Austin Transportation's [School of Data LA 2019](https://schoolofdata.la/) workshop.

![Pink Donut Chart Logo](./readme_images/pink-donut-logo.png)
![School of Data Logo](./readme_images/schoolofdata-logo.png)
![City of Austin Seal](./readme_images/coa_seal.png)


## Slides

Here's the link to our [Google Slides](https://docs.google.com/presentation/d/e/2PACX-1vSCDBN_unOSoqTEyENDAU7dN7TD0cZdWe4N8XoLsLw3uibyl-JkSK1YfCAuqmiU91EYwZwqxS2ahPBp/pub?start=false&loop=false&delayms=3000&slide=id.p) for this workshop.

## Outline

We'll be using data from our Traffic Signal Request program.

### Part 1: Backend — Python ETL

1. [Click here to load the notebook](https://mybinder.org/v2/gh/cityofaustin/school-of-data/master) This will take a few minutes.

2. Once the notebook dashboard loads, click on the link for `School of Data 2019.ipynb`

![Notebook Link](https://github.com/cityofaustin/school-of-data/blob/johns-readme/img/ipynb.png?raw=true)



### Part 2: Frontend — Javascript Dataviz

```
cd frontend

# to see a list of all our steps along the way:
git tag
````

1.  Getting Started with [Create React App](https://github.com/facebook/create-react-app)
    
    - `git checkout step1`
    - `npx create-react-app frontend`
    - `cd frontend`
    - `npm start`
    - A development server should start up and open `http://localhost:3000/` in your default browser.

2.  Get data from the server (Socrata API or PostgREST endpoint)
    
    - `git checkout step2`
    - `npm intall axios --save`
    - Write a function, "getDataFromEndpoint"
      - get signal request data from [Socrata](https://data.austintexas.gov/Transportation-and-Mobility/Traffic-and-Pedestrian-Signal-Requests/f6qu-b7zb)
    - Call that function inside the `componentWillMount()` lifecycle method.
    - `console.log()` the data or print it to page with `JSON.stringify(this.state.data)`

3.  Put the data into a sortable/searchable table
    
    - `git checkout step3`
    - `npm install material-table --save` to install [Material Table](https://mbrn.github.io/material-table/#/)
    - add `@import url("https://fonts.googleapis.com/icon?family=Material+Icons");` to App.css file for table Icons
    - define column headers in `columns` array of objects
    - pass columns and data into `<MaterialTable/>` component

4.  Add a map
    
    - `git checkout step4.1`
    - `npm install react-leaflet leaflet bootstrap --save` to install React-Leaflet, Leaflet & Bootstrap
    - use Bootstrap grid to put Table and Map sections side by side
    - `git checkout step4.2`
    - add Map component with Markers
    - add Leaflet L.Icon.Default overrides
    - `git checkout step4.3`
    - add some styling to map markers

5.  deploy to gh-pages

    - `git checkout step5`
    - `npm install gh-pages --save-dev`
    - update `package.json`
    - To create a static build: `npm run predeploy`
    - To publich a static build: `npm run deploy`
