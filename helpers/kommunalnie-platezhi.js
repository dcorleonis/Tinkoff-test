const assert = require('assert');

const regions = require('./regions');

module.exports = function () {
    return actor({

        switchRegion: async function (region) {
            this.checkUrl();

            //проверим что мы знаем про переданный регион
            assert(regions.hasOwnProperty(region), `Не корректный регион ${region}`);

            const regionObj = regions[region];
            const changeRegionLocator = locate('span[role="button"][tabindex="0"]'); 

            this.waitForElement(changeRegionLocator);

            const textRegionLocator = await this.grabTextFrom(changeRegionLocator);
            if (textRegionLocator !== regionObj.dative) {
                await this.click(changeRegionLocator);
                await this.wait(3);//ждём открытия модалки
                await this.seeInCurrentUrl('/?popup=REGIONS_CHANGE');
                await this.click(regionObj.city);
            }
        },

        getFirstProvider: async function () {
            await this.checkUrl();

            const findFirstProvider = locate('li')
                .inside(
                    locate('ul')
                        .withAttr({'data-qa-file': 'UIScrollList'})
                ).first();
            const theFirstProvider = findFirstProvider.find('a');

            return await this.grabTextFrom(theFirstProvider);
        },

        searchFirst: async function (provider) {

            //проверим что передан поставщик
            assert(provider, 'Не указан поставщик для поиска');
            this.fillField({css:'input[data-qa-file="SearchInput"]'}, provider);
            this.wait(3); //ждём пока отработает поиск

            let firstProviderInSearch =
                locate('div[data-qa-file="Text"]')
                    .inside('div[data-qa-file="SearchSuggested"]');

            firstProviderInSearch = {xpath: `(${firstProviderInSearch.toXPath()})[1]`};

            this.seeElement(firstProviderInSearch);

            return firstProviderInSearch;
        },

        checkUrl: function () {
            this.seeInCurrentUrl('/payments/categories/kommunalnie-platezhi/');
        }

    });
};
