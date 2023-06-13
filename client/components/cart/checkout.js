// checkout page

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { checkoutSubmitAsync } from "./orderConfirmationSlice";


const Checkout = () => {
    const [email, setEmail] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');

    const [creditDebit, setCreditDebit] = useState('');
    const [nameCard, setNameCard] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvc, setCvc] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    const cart = useSelector((state) => {
        state.cart.cartItems
    });
    const userId = useSelector((state) => {
        state.auth.me.id
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('')
        setFirstName('');
        setLastName('');
        setAddress('');
        setCity('');
        setCountry('');
        setRegion('');
        setZip('');
        setPhone('');
        setCreditDebit('');
        setNameCard('');
        setExpiration('');
        setCvc('');

        dispatch(checkoutSubmitAsync(userId, cart)) //dispatching

        navigate("/confirmation");//changed to navigate to a confirmation page/N
    }

    const selectCountry = (val) => {
        setCountry(val);
        setRegion('');
    }

    const selectRegion = (val) => {
        setRegion(val);
    }

    const handleZipChange = (e) => {
        const { value } = e.target;
        const formattedZip = value.replace(/\D/g, '')
        setZip(formattedZip);
    }

    const handlePhoneChange = () => {
        const { value } = e.target;
        const formattedPhone = value
            .replace(/\D/g, '')
            .slice(0, 10)
            .replace(/(\d{4})/g, '$1-')
            .slice(0, 13);
        setPhone(formattedPhone);
    }

    function handleCardNumberChange(e) {
        const { value } = e.target;
        const formattedCreditDebit = value
            .replace(/\D/g, '')
            .slice(0, 16)
            .replace(/(\d{4})/g, '$1-')
            .slice(0, 19);
        setCardNumber(formattedCreditDebit);
    }

    const handleExpirationChange = (e) => {
        const { value } = e.target;
        const formattedExp = value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d{0,2})/, '$1/$2')
            .substr(0, 5);
        setExpiration(formattedExp);
    }

    const handleCvcChange = (e) => {
        const { value } = e.target;
        const formattedCvc = value
        .replace(/\D/g, '')
        .substr(0, 3);
        setCvc(formattedCvc);
    }

    return (
        <div>
            <h2>Checkout</h2>
            <h3>Shipping Information</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="phone">Phone</label>
                <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <br />

                <br />
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <br />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                <br />
                <label htmlFor="address">Address</label>
                <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} />
                <br />
                <label htmlFor="city">City</label>
                <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
                <br />
                <label htmlFor="country">Country</label>
                <CountryDropdown value={country} onChange={selectCountry} priorityOptions={["CA", "US", "GB"]} />
                <br />
                <label htmlFor="region">Region</label>
                <RegionDropdown country={country} value={region} onChange={selectRegion} />
                <br />
                <label htmlFor="zip">ZIP</label>
                <input type="text" name="zip" value={zip} onChange={handleZipChange} />
                <br />
                <br />

                <h3>Payment Information</h3>
                <label htmlFor="creditDebit">Credit/Debit Number</label>
                <input type="text" name="creditDebit" value={creditDebit} onChange={handleCardNumberChange} />
                <br />
                <label htmlFor="nameCard">Name on Card</label>
                <input type="text" name="nameCard" value={nameCard} onChange={e => setNameCard(e.target.value)} />
                <br />
                <label htmlFor="expiration">Expiration</label>
                <input type="text" name="expiration" value={expiration} onChange={handleExpirationChange} />
                <br />
                <label htmlFor="cvc">CVC</label>
                <input type="text" name="cvc" value={cvc} onChange={handleCvcChange} />
                <br />
                <button type="submit">Order</button>
            </form>
        </div>
    );
};

export default Checkout;

//render cart items to this page as well