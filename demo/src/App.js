import React, { Component } from "react";
import "./App.css";

import profiles from "./examples/data";
import { Simple, Highlighted } from "./examples";

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

            <div>
              <h2>Highlighted Match</h2>
              <p>
                Here the matching part of the string is underlined. <br />
                The mention dropdown is also aligned with the beginning of the
                string (as opposed to the current caret position)
              </p>
              <Highlighted placeholder="@-mentioning" position="start" />
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
