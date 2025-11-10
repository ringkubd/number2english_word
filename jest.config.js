module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.test.js'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'index.js',
        '!node_modules/**',
        '!test/**'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
