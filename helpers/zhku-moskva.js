module.exports = function () {
    return actor({

        changeTabToPay: function () {
            this.checkUrl();
            this.click('Оплатить ЖКУ в Москве');
            this.wait(3); //дождёмся открытия вкладки
        },

        checkUrl: function () {
            this.seeInCurrentUrl('/zhku-moskva');
        },

        checkValidationMessage: async function (code, period, summ) {
            const submitButton =
                locate('button').withChild(locate('h2').withText('Оплатить ЖКУ в Москве'));

            await this.waitForElement(submitButton);

            const validationMessage = locate ('div').withAttr({'data-qa-file': 'UIFormRowError'});

            const codePayerFieldWraper = locate('input').withAttr({name: 'provider-payerCode'});
            const periodFieldWraper = locate('input').withAttr({name: 'provider-period'});
            // плохой локатор у summFieldWraper, но я вообще не знаю, что можно придумать
            const summFieldWraper = {css:'html > body > div > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div > div:nth-of-type(3) > div > div:nth-of-type(2) > div > div > div > div > div:nth-of-type(4) > div > form > div:nth-of-type(4) > div > div > div > div > div > div > div > div > label > div > input'};

            this.fillField(codePayerFieldWraper, code);
            this.click(submitButton);
            this.see('Поле неправильно заполнено', validationMessage);

            this.fillField(periodFieldWraper, period);
            this.click(submitButton);
            this.see('Поле заполнено некорректно', validationMessage);

            this.fillField(summFieldWraper, summ);
            this.click(submitButton);
            this.see('Минимум — 10 ₽', validationMessage);

        }

    });
};