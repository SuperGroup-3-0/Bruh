import React from "react";
import { useTranslation } from 'react-i18next'

const Languageselector = () => {
    const { i18n } = useTranslation()

    const languages =  { 
        "en": "English 🇺🇸",
        "uk": "Українська 🇺🇦"
    }

    return (
        <div className="language-selector-container">
        {
            Object.keys(languages).map((code) => (
                <button 
                    key={code}
                    className={ i18n.resolvedLanguage === code ? "language-selected" : "language-not-selected" } 
                    type="submit"
                    onClick={() => i18n.changeLanguage(code)}
                >
                    {languages[code]}
                </button>
        ))}
      </div>
    )
}

export default Languageselector;