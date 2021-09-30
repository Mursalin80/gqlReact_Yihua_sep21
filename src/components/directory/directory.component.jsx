import React from "react";
import { useQuery } from "@apollo/client";

import { GET_DIRECTORY } from "../../gql/apolloClient";

import MenuItem from "../menu-item/menu-item.component";

import "./directory.styles.css";

const Directory = () => {
  const {
    data: {
      directory: { sections },
    },
  } = useQuery(GET_DIRECTORY);

  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
