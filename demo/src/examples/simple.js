import React from "react";
import { MentionWrapper, MentionMenu } from "react-githubish-mentions";
import { MenuItem, filterProfiles } from "./data";

class Simple extends React.Component {
  render() {
    return (
      <MentionWrapper {...this.props}>
        <MentionMenu
          className="mentionwrapper"
          trigger="@"
          item={MenuItem}
          resolve={filterProfiles}
        />
      </MentionWrapper>
    );
  }
}

export default Simple;
