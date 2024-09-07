import { useEffect, useState } from "react";
import img from "../../assets/bg-cafe.jpg";
import starFillImg from "../../assets/Star_fill.svg";
import starImg from "../../assets/Star.svg";
import axios from "axios";

function Landing() {
  const [collection, setCollection] = useState([]);
  const [active, setActive] = useState(false);
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get(
          "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json"
        )
        .then((response) => response.data);

      console.log("data", data);
      setCollection(data);
      setAvailable(data);
    };

    fetchData();
  }, []);

  const availableNowButton = () => {
    setActive(true);
    const availableItems = collection.filter((item) => {
      return item.available === true;
    });
    setAvailable(availableItems);
  };

  const allProudctsButton = () => {
    setActive(false);
    const allProudcts = collection.filter((item) => {
      return item.available === true || item.available === false;
    });

    setAvailable(allProudcts);
  };

  return (
    <div>
      <div className="img">
        <img src={img} alt="" />
      </div>

      <div className="collection">
        <div className="title">
          <h1> Our Collection</h1>
          <p>
            Introducing our Coffee Collection, a selection of unique coffees
            from different roast types and origins, expertly roasted in small
            batches and shipped fresh weekly.
          </p>
          <div className="buttons">
            <span
              className={active ? null : "active"}
              onClick={() => allProudctsButton()}
            >
              All Products
            </span>
            <span
              className={active ? "active" : null}
              onClick={() => availableNowButton()}
            >
              Available Now
            </span>
          </div>
        </div>

        <div className="collection-content">
          {available.map((item) => {
            return (
              <div className="box" key={item.id}>
                <div className="popular-img">
                  {item.popular ? <span>popular</span> : null}
                  <img src={item.image} alt="" />
                </div>
                <div className="details">
                  <h3>{item.name} </h3>
                  <span>{item.price}</span>
                </div>
                <div className="rating-votes">
                  {item.rating === null ? (
                    <div className="no-rate">
                      <img src={starImg} alt="" />
                      <span>No Ratings</span>
                    </div>
                  ) : (
                    <>
                      <div className="rate">
                        <img src={starFillImg} alt="" />
                        <span>{item.rating} </span>
                      </div>
                      <span className="vote">({item.votes}) votes</span>
                      {!item.available && (
                        <span className="sold-out">Sold Out</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Landing;
