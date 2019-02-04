import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Map, TileLayer, Circle, Tooltip } from "react-leaflet";
import { overrideLeafletIcons } from "./leafletOverrides";
import "./App.css";

overrideLeafletIcons();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isDataLoaded: false,
      activeTooltip: ""
    };
  }

  getDataFromEndpoint(endpointUrl) {
    axios
      .get(endpointUrl)
      .then(res => {
        console.log(res);
        this.setState({
          data: res.data,
          isDataLoaded: true,
          position: [30.28, -97.735],
          zoom: 10,
          circleRadius: 500
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

  handleRowClick = (event, rowData) => {
    console.log(rowData);
    this.setState({
      position: [rowData.location_latitude, rowData.location_longitude],
      zoom: 14,
      circleRadius: 100,
      activeTooltip: rowData.request_id
    });
  };

  handleCircleClick = (event, circleData) => {
    console.log(event);
    console.log(circleData);
    this.setState({
      position: [circleData.location_latitude, circleData.location_longitude],
      zoom: 14,
      circleRadius: 100,
      activeTooltip: circleData.request_id
    });
  };

  render() {
    const columns = [
      { title: "Location Name", field: "location_name" },
      { title: "Type", field: "eval_type" },
      { title: "Request Status", field: "request_status" }
    ];

    const mapCss = {
      width: "100%",
      height: "100vh"
    };

    const circleMarkerStyle = {
      PHB: {
        color: "#fff",
        weight: 1,
        fillColor: "#a65628",
        fillOpacity: 0.8
      },
      TRAFFIC: {
        color: "#fff",
        weight: 1,
        fillColor: "#237FB4",
        fillOpacity: 0.8
      }
    };

    return (
      <div className="App">
        {this.state.isDataLoaded && (
          <div className="row">
            <div className="col">
              <MaterialTable
                title="Signal Requests"
                columns={columns}
                data={this.state.data}
                onRowClick={this.handleRowClick}
              />
            </div>
            <div className="col map-container">
              <Map
                center={this.state.position}
                zoom={this.state.zoom}
                style={mapCss}
              >
                <TileLayer
                  attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}"
                  ext="png"
                  subdomains="abcd"
                />
                {this.state.data.map((item, i) => (
                  <Circle
                    center={[item.location_latitude, item.location_longitude]}
                    radius={this.state.circleRadius}
                    key={`${i}_marker`}
                    fillColor={circleMarkerStyle[item.eval_type].fillColor}
                    color={circleMarkerStyle[item.eval_type].color}
                    weight={circleMarkerStyle[item.eval_type].weight}
                    fillOpacity={circleMarkerStyle[item.eval_type].fillOpacity}
                    onClick={e => this.handleCircleClick(e, item)}
                  >
                    {this.state.activeTooltip === item.request_id && (
                      <Tooltip opacity={1} permanent>
                        <h3>{`${item.eval_type} REQUEST`}</h3>
                        <p>{`${item.location_name}`}</p>
                        <p>{`Status ${item.request_status}`}</p>
                      </Tooltip>
                    )}
                  </Circle>
                ))}
              </Map>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
