const assert = require('assert');

const nameOfProvider = 'ЖКУ-Москва';
const providerUrl = 'https://www.tinkoff.ru/zhku-moskva/';
const incorrectPayerCode = '14';
const incorrectPeriodOfPayment = '1';
const incorrectSummOfPayment = '2'

Feature(`Оплата ЖКХ через ${nameOfProvider}`);

Scenario('для Москвы', async (I, Navigation, GKH, ZHKU) => {

    I.say('step 1', 'blue');
    await Navigation.goToMain(); //1

    I.say('step 2', 'blue');
    await Navigation.goToFooterPayments(); //2

    I.say('step 3', 'blue');
    await Navigation.goToPaymentCategory('ЖКХ', 'kommunalnie-platezhi'); //3

    I.say('step 4', 'blue');
    await GKH.switchRegion('msk'); //4

    I.say('step 5', 'blue');
    const firstProviderFromPage = await GKH.getFirstProvider(); //5
    assert.equal(firstProviderFromPage, nameOfProvider);//5.1
    I.wait(3);
    await I.clickLink(firstProviderFromPage); //5.2
    I.wait(3); // ожидание загрузки страницы с инпутами для оплаты
    await I.seeInCurrentUrl(providerUrl);

    await ZHKU.changeTabToPay(); //6 
    await ZHKU.checkValidationMessage(incorrectPayerCode, incorrectPeriodOfPayment, incorrectSummOfPayment); //7

    I.say('step 8', 'blue');
    await Navigation.goToFooterPayments(); //8

    I.say('step 9', 'blue');
    await I.wait(3);
    const firstProviderNameFromSearch = await I.grabTextFrom(await GKH.searchFirst(nameOfProvider)); //9

    I.say('step 10', 'blue');
    assert.equal(firstProviderFromPage, firstProviderNameFromSearch); //10

    I.say('step 11', 'blue');
    await I.click(await GKH.searchFirst(firstProviderNameFromSearch)); //11
    I.seeInCurrentUrl(providerUrl); //11

});


Scenario('для Питера', async (I, Navigation, GKH) => {

    await Navigation.goToMain(); //1
    await Navigation.goToFooterPayments(); //2
    await Navigation.goToPaymentCategory('ЖКХ', 'kommunalnie-platezhi'); //3

    await GKH.switchRegion('spb'); //13

    const firstProviderFromPage = await GKH.getFirstProvider();
    assert(firstProviderFromPage !== nameOfProvider, `Для региона отличного от г. Москва присутствует поставщик "${nameOfProvider}"`);

});

