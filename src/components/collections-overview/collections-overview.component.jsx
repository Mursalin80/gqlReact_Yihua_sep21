import { useQuery, gql } from "@apollo/client";
import React from "react";
// components
import CollectionPreview from "../collection-preview/collection-preview.component";
import Spiner from "../spinner/spinner.component";

import "./collections-overview.styles.css";
// gql;
const GET_COLLECT = gql`
  query GET_COLLECTION {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverview = () => {
  let { loading, error, data } = useQuery(GET_COLLECT);
  if (loading) return <Spiner />;
  if (error) return <p>Error :(</p>;
  let { collections } = data;

  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};
export default CollectionsOverview;
