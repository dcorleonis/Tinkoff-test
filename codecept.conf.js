exports.config = {
    tests: './tests/*-test.js',
    output: './output',
    helpers: {
        Puppeteer: {
            url: 'http://localhost',
            show: true,
            waitForNavigation: "networkidle0",
            waitForAction: 500,
            windowSize: '1400x1000',
        }
    },
    include: {
        I: './steps_file.js',
        Navigation: './helpers/navigation.js',
        GKH: './helpers/kommunalnie-platezhi',
        ZHKU: './helpers/zhku-moskva'
    },
    bootstrap: null,
    mocha: {},
    name: 'testTest'
};