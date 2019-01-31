import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Map, TileLayer, Circle, Popup } from "react-leaflet";
import { overrideLeafletIcons } from "./leafletOverrides";
import "./App.css";

overrideLeafletIcons();

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
      "http://schoolofdata.austintexas.io/signal_requests"
    );
  }

  render() {
    const columns = [
      { title: "Location Name", field: "location_name" },
      { title: "Type", field: "eval_type" },
      { title: "Request Status", field: "request_status" }
    ];

    const position = [30.28, -97.735];
    const zoom = 10;

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
              />
            </div>
            <div className="col map-container">
              <Map center={position} zoom={zoom} style={mapCss}>
                <TileLayer
                  attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}"
                  ext="png"
                  subdomains="abcd"
                />
                {this.state.data.map((item, i) => {
                  return (
                    <Circle
                      center={[item.location_latitude, item.location_longitude]}
                      radius={500}
                      key={`${i}_marker`}
                      fillColor={circleMarkerStyle[item.eval_type].fillColor}
                      color={circleMarkerStyle[item.eval_type].color}
                      weight={circleMarkerStyle[item.eval_type].weight}
                      fillOpacity={
                        circleMarkerStyle[item.eval_type].fillOpacity
                      }
                    >
                      <Popup>
                        <h3>{`${item.eval_type} REQUEST`}</h3>
                        <p>{`${item.location_name}`}</p>
                        <p>{`Status ${item.request_status}`}</p>
                      </Popup>
                    </Circle>
                  );
                })}
              </Map>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
