import classes from "./AvailableMeals.module.css";
import Card from "../../Shared/Card";
import MealItem from "../MealItem/MealItem";
import { Spinner } from "react-bootstrap/";
import { useEffect, useState } from "react";
import axios from "axios";

const AvailableMeals = () => {
  const [commingMeals, setCommingMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const baseURL = "https://react-meals-7b0d3-default-rtdb.firebaseio.com/meals.json";

  useEffect(() => {
    // Axios method
    setIsLoading(true);
    axios.get(baseURL)
      .then((res) => {
        setCommingMeals(Object.values(res.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  // useEffect(() => { // Fetch method
  //   getMeals()
  // }, [])
  // const getMeals = async () => {
  //   const response = await fetch("https://react-meals-7b0d3-default-rtdb.firebaseio.com/meals.json");
  //   setCommingMeals( Object.values(await response.json()) );
  // }

  const Meals = commingMeals.map((meal) => {
    return <MealItem key={meal.id} meal={meal} />;
  });

  return (
    <section className={classes.meals}>
      { error ?
        <h5 style={{color:'red', textAlign: 'center'}}>{error}</h5>
        : 
        <div>
          {isLoading ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div>
                <Spinner animation="grow" variant="danger" className="me-3" />
                <Spinner animation="grow" variant="danger" className="me-3" />
                <Spinner animation="grow" variant="danger" className="me-3" />
                <Spinner animation="grow" variant="danger" className="me-3" />
              </div>
              <h4 className="mt-3">Loading ...</h4>
            </div>
          ) : (
            <Card>
              <ul>{Meals}</ul>
            </Card>
          )}
        </div>
      }

    </section>
  );
};

export default AvailableMeals;
