import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isDataLoaded: false
    };
  }

  getDataFromEndpoint(endpointUrl) {
    axios
      .get(endpointUrl)
      .then(res => {
        console.log(res);
        this.setState({
          data: res.data,
          isDataLoaded: true
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  componentWillMount() {
    this.getDataFromEndpoint(
      "https://data.austintexas.gov/resource/yfa7-33gh.json"
    );
  }

  render() {
    const columns = [
      { title: "Location Name", field: "location_name" },
      { title: "Type", field: "eval_type" },
      { title: "Request Status", field: "request_status" }
    ];

    return (
      <div className="App">
        {this.state.isDataLoaded && (
          <MaterialTable
            title="Signal Requests"
            columns={columns}
            data={this.state.data}
          />
        )}
      </div>
    );
  }
}

export default App;
