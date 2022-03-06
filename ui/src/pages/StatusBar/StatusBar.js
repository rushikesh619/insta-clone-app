import React, { Component } from "react";
import "./StatusBar.css";
import pp4 from "../../images/pp4.jpeg";

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusList: [],
    };
  }

  render() {
    return (
      <div>
        <div className="statusbar__container">
          <div className="fileupload">
            <img
              className="statusbar__upload"
              src={pp4}
              width="55px"
              height="55px"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StatusBar;
