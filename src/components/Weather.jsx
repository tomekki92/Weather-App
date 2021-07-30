import React, { Component } from "react";

class Weather extends Component {
  state = {
    forecast: [],
    temperature: [],
  };

  componentDidMount = async () => {
    const api_call = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.meteo.lt/v1/places/vilnius/forecasts/long-term"
    );
    const data = await api_call.json();
    this.setState({ forecast: data.forecastTimestamps });
    console.log(this.state.forecast);
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ value: input.value });
    const forecast = [...this.state.forecast];

    forecast.map((f) => {
      if (f.forecastTimeUtc === input.value) {
        this.setState({ temperature: f.airTemperature + `C` });
      }
      return (
        <span className="badge bg-secondary">{this.state.temperature}</span>
      );
    });
  };

  render() {
    return (
      <>
        <h1>Sveikutiz</h1>
        <button className="btn btn-primary btn-">
          Temperatūra: {this.state.temperature}
        </button>
        <div className="form-group">
          <label htmlFor="forecastTimeUtc">Select the time</label>
          <select
            name="forecastTimeUtc"
            id="forecastTimeUtc"
            value={this.state.value}
            className="form-control"
            onChange={this.handleChange}
          >
            <option value=""> -- Pasirinkite laiką -- </option>
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
      </>
    );
  }
}

export default Weather;
