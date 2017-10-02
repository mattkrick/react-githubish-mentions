import React, { Component } from "react";
import "./App.css";

import { profiles } from "./examples/data";
import { Simple } from "./examples";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">react-githubish-mentions</h1>
        </header>
        <div className="App-body">
          <div className="demos">
            <div>
              <h2>Simple Demo</h2>
              <Simple placeholder="@-mentioning" />
            </div>
          </div>
          <hr />

          <p>
            <b>
              Unless mentioned otherwise this is the data that will be matched
              against:
            </b>{" "}
            <em>{profiles.map(p => p.username).join(", ")}</em>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
