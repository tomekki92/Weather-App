import React, { Component } from "react";
import styles from "./Weather.module.css";

class Weather extends Component {
  state = {
    forecast: [],
    temperature: [],
    conditionCode: [],
    time: [],
  };

  componentDidMount = async () => {
    const apiCall = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.meteo.lt/v1/places/vilnius/forecasts/long-term"
    );
    const data = await apiCall.json();
    this.setState({
      forecast: data.forecastTimestamps,
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const forecast = this.state.forecast;

    forecast.map((f) => {
      if (f.forecastTimeUtc === input.value) {
        this.setState({
          temperature: f.airTemperature + `C°`,
          conditionCode: f.conditionCode,
        });
      }
      return [];
    });
  };

  render() {
    return (
      <>
        <div className={styles.container}>
          {/* <h1 className={styles.header}>Weather App</h1> */}
          <h2 className={styles.temp}>{this.state.temperature}</h2>
          <p className={styles.upper}>{this.state.conditionCode}</p>
          <div className="form-group">
            {/* <label htmlFor="forecastTimeUtc">-- Select a time below --</label> */}
            <select
              name="forecastTimeUtc"
              id="forecastTimeUtc"
              className="form-control"
              onChange={this.handleChange}
              onLoad={this.handleChange}
            >
              <option value=""> -- Please select a time -- </option>
              {this.state.forecast.map((option) => (
                <option
                  key={option.forecastTimeUtc}
                  value={option.forecastTimeUtc}
                >
                  {option.forecastTimeUtc}
                </option>
              ))}
            </select>
          </div>
          <p className={styles.location}>Location: Vilnius, LTU</p>
        </div>
      </>
    );
  }
}

export default Weather;
