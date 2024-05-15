import { APP_ROUTE } from 'app/appConsts';

enum VOIVODESHIP {
    Zachodniopomorskie = 'Zachodniopomorskie',
    Pomorskie = 'Pomorskie',
    Warmińsko_Mazurskie = 'Mazurskie',
    Lubuskie = 'Lubuskie',
    Wielkopolskie = 'Wielkopolskie',
    Kujawsko_Pomorskie = 'Kujawsko-pomorskie',
    Mazowieckie = 'Mazowieckie',
    Podlaskie = 'Podlaskie',
    Dolnośląskie = 'Dolnośląskie',
    Łódzkie = 'Łódzkie',
    Lubelskie = 'Lubelskie',
    Opolskie = 'Opolskie',
    Śląskie = 'Śląskie',
    Świętokrzyskie = 'Świętokrzyskie',
    Małopolskie = 'Małopolskie',
    Podkarpackie = 'Podkarpackie',
}

export const pages = [
    {
        name: 'Rzeszowiak',
        url: APP_ROUTE.RZESZOWIAK,
        voivodeship: VOIVODESHIP.Podkarpackie,
    },
    {
        name: 'Tarnowiak',
        url: APP_ROUTE.TARNOWIAK,
        voivodeship: VOIVODESHIP.Małopolskie,
    },
    {
        name: 'Brzozowiak',
        url: APP_ROUTE.BRZOZOWIAK,
        voivodeship: VOIVODESHIP.Podkarpackie,
    },
] as const;
