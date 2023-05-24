/* eslint-disable @typescript-eslint/no-explicit-any */
const removeDataTestId = () => (config: { module: { rules: any[] } }) => {
  const loaders = config.module.rules.find((rule: { oneOf: any }) =>
    Array.isArray(rule.oneOf)
  ).oneOf;
  const babelLoader = loaders.find(
    (loader: { loader: string | string[] }) =>
      loader.loader && loader.loader.includes("babel-loader")
  );
  babelLoader.options.plugins.push([
    "react-remove-properties",
    { properties: ["data-testid"] },
  ]);
  return config;
};

export const webpack = {
  configure: removeDataTestId(),
};
