(async argsV => {
  const fs = require("fs-extra");

  const args = require("minimist")(argsV);

  const env = args["env"];

  const devPath =
    "C:\\Fathym\\Git\\Apps\\Forge\\Fathym.Forge.Web\\wwwroot\\forge";

  const prodPath = "dist/forge-app";

  const outArgs = {
    DistPath: env == "prod" ? prodPath : env == "prod" ? devPath : null
  };

  var angular = await fs.readJSON("angular.json");

  var buildOptions = angular.projects["forge-app"].architect.build.options;

  if (!outArgs.DistPath) {
    if (buildOptions.outputPath == prodPath) outArgs.DistPath = devPath;
    else if (buildOptions.outputPath == devPath) outArgs.DistPath = prodPath;
  }

  buildOptions.outputPath = outArgs.DistPath;

  // angular.projects["forge-app"].architect.build.options = buildOptions;

  await fs.writeJSON("angular.json", angular, { spaces: "\t" });
})(process.argv.slice(2));
