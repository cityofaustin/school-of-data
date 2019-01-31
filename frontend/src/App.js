import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  getDataFromEndpoint(endpointUrl) {
    axios
      .get(endpointUrl)
      .then(res => {
        console.log(res);
        this.setState({
          data: res.data
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  componentWillMount() {
    const socrataApiEndpoint =
      "https://data.austintexas.gov/resource/yfa7-33gh.json";
    this.getDataFromEndpoint(socrataApiEndpoint);
  }

  render() {
    return (
      <div className="App">
        <code>{JSON.stringify(this.state.data)}</code>
      </div>
    );
  }
}

export default App;
