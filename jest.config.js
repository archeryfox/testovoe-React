export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // исправлено
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {
            tsconfig: "tsconfig.json"
        }]
    }
};
