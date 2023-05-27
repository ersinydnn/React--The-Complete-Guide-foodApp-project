import classes from './Checkout.module.css';
import {useRef, useState} from "react"

const isEmpty = value => value.trim()==="";
const isFiveChars = value => value.trim().length !==5;


const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
name: true,
street: true,
city: true,
postalCode: true
  });
 const nameInputRef = useRef();
 const streetInputRef = useRef();
 const postalInputRef = useRef();
 const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = !isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid
    })

    const formIsValid = 
    enteredNameIsValid &&
    enteredCityIsValid &&
    enteredPostalIsValid &&
    enteredStreetIsValid;

if(!formIsValid) {
  return;
}
props.onSubmit({
  name: enteredName,
  street: enteredStreet,
  city : enteredCity,
  postalCode : enteredPostal,
});
};
 const nameControlClasses = `${classes.control}
${formInputsValidity.name ? "" :
 classes.invalid}`;
  const streetControlClasses = `${classes.control}
 ${formInputsValidity.street ? "" :
  classes.invalid}`;
  const postalControlClasses = `${classes.control}
${formInputsValidity.postalCode ? "" :
 classes.invalid}`;
 const cityControlClasses = `${classes.control}
${formInputsValidity.city ? "" :
 classes.invalid}`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
      {!formInputsValidity.name && <p>Please enter a valid name !</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street !</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code ! (5 characters long.)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city !</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

