// checkout page

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { checkoutSubmitAsync } from "./orderConfirmationSlice";
import { useTranslation } from "react-i18next";


const Checkout = () => {
    const { t } = useTranslation();
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

    const handlePhoneChange = (e) => { // handle proper area code and auto fill number fields with correct numbers deleting dashes and parenthesis
        const { value } = e.target;
        const formattedPhone = value
            .replace(/\D/g, '')
            .slice(0, 10)
            .replace(/(\d{4})/g, '$1-')
            .slice(0, 13);
        setPhone(formattedPhone);
    }

    function handleCardNumberChange(e) { //autofill correct dashes and number of digits in credit card spacing while also being able to delete them
        const { value } = e.target;
        const formattedCreditDebit = value
            .replace(/\D/g, '')
            .slice(0, 16)
            .replace(/(\d{4})/g, '$1-')
            .replace(/-$/, '')
            .slice(0, 19);
        setCardNumber(formattedCreditDebit);
    }

    const handleExpirationChange = (e) => {
        const { value } = e.target;
        let formattedExp = value
          .replace(/[^\d]/g, '')
          .substr(0, 4);
      
        if (formattedExp.length > 2) {
          formattedExp = `${formattedExp.substr(0, 2)}/${formattedExp.substr(2)}`;
        }
      
        setExpiration(formattedExp);
      };

    const handleCvcChange = (e) => {
        const { value } = e.target;
        const formattedCvc = value
        .replace(/\D/g, '')
        .substr(0, 3);
        setCvc(formattedCvc);
    }

    return (
        <div>
            <h2>{t('checkout-header')}</h2>
            <h3>{t('shipping-information')}</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="email">{t('email')}</label>
                <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <br />

                <br />
                <label htmlFor="firstName">{t('first-name')}</label>
                <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <br />
                <label htmlFor="lastName">{t('last-name')}</label>
                <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                <br />
                <label htmlFor="address">{t('address')}</label>
                <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} />
                <br />
                <label htmlFor="city">{t('city')}</label>
                <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
                <br />
                <label htmlFor="country">{t('country')}</label>
                <CountryDropdown value={country} onChange={t('select-country')} priorityOptions={["CA", "US", "GB"]} />
                <br />
                <label htmlFor="region">{t('region')}</label>
                <RegionDropdown country={country} value={region} onChange={selectRegion} />
                <br />
                <label htmlFor="zip">{t('zip')}</label>
                <input type="text" name="zip" value={zip} onChange={handleZipChange} />
                <br />
                <br />
                <label htmlFor="phone">{t('phone')}</label>
                <input type="text" name="phone" value={phone} onChange={handlePhoneChange} />
                <br />

                <h3>{t('payment-information')}</h3>
                <label htmlFor="creditDebit">{t('credit-debit-number')}</label>
                <input type="text" name="creditDebit" value={creditDebit} onChange={handleCardNumberChange} />
                <br />
                <label htmlFor="nameCard">{t('name-on-card')}</label>
                <input type="text" name="nameCard" value={nameCard} onChange={e => setNameCard(e.target.value)} />
                <br />
                <label htmlFor="expiration">{t('expiration')}</label>
                <input type="text" name="expiration" value={expiration} onChange={handleExpirationChange} />
                <br />
                <label htmlFor="cvc">{t('cvc')}</label>
                <input type="text" name="cvc" value={cvc} onChange={handleCvcChange} />
                <br />
                <button type="submit">{t('order')}</button>
            </form>

            {/* Order Summary */}

        </div>
    );
};

export default Checkout;

//render cart items to this page as well