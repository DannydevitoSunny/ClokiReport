import React, { Component } from 'react';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { spanish } from './Translate.js';
var lang = navigator.language.substring(0, 2).toUpperCase();
const resources = {
    ES: {
        translation: spanish
    },
    EN: {
        translation: {//Original Web is already in english

        }
    }
};


i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: lang,
        fallbackLng: "ES",

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });




export function Translate(r) {
    const { t } = useTranslation();

    return t(r.word);
}