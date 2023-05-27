import { useEffect, useState } from "react";
import classes from "./AvaibleMeals.module.css"
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";



const AvaibleMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpErrror] = useState();
  
  useEffect(() => {
    const fetchMeals = async () => {
     const response = await fetch("https://food-order-app-fd6ea-default-rtdb.firebaseio.com/meals.json");
    if(!response.ok) {
      throw new Error ("Something went wrong !");
    }
     const responseData = await response.json();

    const loadedMeals = [];
    for (const key in responseData) {
      loadedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price,
      });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
    }

  fetchMeals().catch(error => {
    setIsLoading(false);
  setHttpErrror(error.message);
  });
},[]);

if(isLoading) {
  return <section className={classes.MealsLoading} >
    <p>Loading...</p>
  </section>
}

if(httpError) {
  return (
    <section className={classes.MealsError} >
       <p>{httpError}</p>
    </section>
  );
}

    const MealsList = meals.map(meal =>
      <MealItem 
      key={meal.id} 
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      /> );
    return ( 
    <section className={classes.meals}>
        <Card>
        <ul>{MealsList}</ul>
        </Card>
    </section>
    
    );
};
export default AvaibleMeals;