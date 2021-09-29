import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import CollectionItem from "../../components/collection-item/collection-item.component";
import Spiner from "../../components/spinner/spinner.component";

import "./collection.styles.css";

const GET_COLLECT_BY_TITLE = gql`
  query Get_By_Tille($title: String!) {
    getCollectionsByTitle(title: $title) {
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

const CollectionPage = () => {
  let { collectionId } = useParams();

  let { loading, error, data } = useQuery(GET_COLLECT_BY_TITLE, {
    variables: { title: collectionId },
  });
  if (loading) return <Spiner />;
  if (error) return <p>Error :(</p>;
  const { title, items } = data.getCollectionsByTitle;

  //render component
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
