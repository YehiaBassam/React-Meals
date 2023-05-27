import classes from './AvailableMeals.module.css';
import Card from '../../Shared/Card';
import MealItem from '../MealItem/MealItem';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 20.00,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 30.00,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const Meals = DUMMY_MEALS.map( meal => {
    return <MealItem key={meal.id} meal={meal} />
  })
  
  
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          { Meals }
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals;