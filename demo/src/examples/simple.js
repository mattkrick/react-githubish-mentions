import React from "react";
import { MentionWrapper, MentionMenu } from "react-githubish-mentions";
import profiles from "./data";
import cn from "classnames";

const MenuItem = props => {
  const { active, username } = props;
  let display_name = username;
  return (
    <div className={cn("menuitem", { active: active })}>{display_name}</div>
  );
};

const filterProfiles = prefix => {
  if (prefix === "") {
    return profiles.slice(0, 10);
  }
  return profiles
    .filter(profile => profile.username.startsWith(prefix))
    .slice(0, 10);
};

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
