import axios from "axios";
import React, { useState, useEffect } from "react";
import NewItem from "../UI/NewItem";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const state = {
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  console.log(items);

  async function getNew() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getNew();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
            nav
            loop
            items={4}
            margin={16}
            responsive={state.responsive}
          >
            {loading ? (
              items.map((item) => {
                return (
                  <NewItem
                    // key={index}
                    title={item.title}
                    image={item.authorImage}
                    expire={item.expiryDate}
                    likes={item.likes}
                    nftImage={item.nftImage}
                    price={item.price}
                    authorId={item.authorId}
                    nftId={item.nftId}
                  />
                );
              })
            ) : (
              <Skeleton
                width={"244px"}
                height={"408px"}
                borderRadius={"16px"}
              />
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
