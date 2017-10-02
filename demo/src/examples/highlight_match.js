import React from "react";
import profiles from "./data";
import cn from "classnames";
import { MentionWrapper, MentionMenu } from "react-githubish-mentions";

const MenuItem = props => {
  const { active, username, match_range } = props;
  let display_name = username;
  if (match_range) {
    const prefix = username.substring(0, match_range[0]),
      match = username.substr(match_range[0], match_range[1]),
      postfix = username.substring(match_range[1]);

    display_name = (
      <span>
        {prefix}
        <span className="match">{match}</span>
        {postfix}
      </span>
    );
  }
  return (
    <div className={cn("menuitem", { active: active })}>{display_name}</div>
  );
};

const filterProfiles = prefix => {
  if (prefix === "") {
    return profiles.slice(0, 10);
  }
  prefix = prefix.toLowerCase();
  return profiles
    .filter(profile => profile.username.startsWith(prefix))
    .map(profile => ({
      ...profile,
      query: prefix,
      match_range: [0, prefix.length]
    }))
    .slice(0, 10);
};

class HighlightedMatch extends React.Component {
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

export default HighlightedMatch;
