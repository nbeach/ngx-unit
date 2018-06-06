module.exports = (config: any) => {
    config.set({
        singleRun: true,
        files: ["./karma-init.ts"],
        frameworks: ["mocha"],
        reporters: ["dots"],
        browsers: ["ChromeHeadlessNoSandbox", "FirefoxHeadless"],
        preprocessors: {
            "./karma-init.ts": [ "webpack" ],
        },
        webpack:  {
            mode: "none",
            // devtool: "inline-source-map",
            resolve: {
                extensions: [".js", ".ts"],
            },
            module: {
                rules: [{ test: /\.ts?$/, loader: "ts-loader" }],
            },
        },
        webpackMiddleware: {
            stats: "errors-only",
        },
        mime: {
            "text/x-typescript": ["ts"],
        },
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: "ChromeHeadless",
                    flags: ["--no-sandbox"],
            },
        },
    })
}
