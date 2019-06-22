module.exports = function () {
    return actor({

        goToMain: async function () {
            this.amOnPage('https://www.tinkoff.ru/');
            this.see('Тинькофф');
        },

        goToFooterPayments: async function () {
            const payments = locate('footer').find('a').withText('Платежи');
            this.click(payments);
            this.seeInCurrentUrl('/payments');
        },

        goToPaymentCategory: async function (categoryName, categoryLink) {
            this.seeInCurrentUrl('/payments'); //работает только на странице '/payments/'
            this.clickLink(categoryName);
            this.seeInCurrentUrl(`/payments/categories/${categoryLink}/`);
        },

        goToPaymentCategoryFast: async function () {
            this.amOnPage('https://www.tinkoff.ru/payments/categories/kommunalnie-platezhi/');
        }

    });
};