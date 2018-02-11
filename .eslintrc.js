module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": [
        "eslint:recommended",
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        },
        "sourceType": "module"
    },
    "rules": {
        "no-console": "warn",
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
