const fs = require("fs-extra");

(async args => {
  const env = args["env"];

  var angular = await fs.readJSON("angular.json");

  const proj = args["proj"] || angular.defaultProject;

  const prodPath = `dist/${proj}`;

  const devPath =
    `C:\\Fathym\\Git\\Apps\\Forge\\Fathym.Forge.Web\\wwwroot\\${proj}`;

  const outArgs = {
    DistPath: env == "prod" ? prodPath : env == "prod" ? devPath : null
  };

  var buildOptions = angular.projects[proj].architect.build.options;

  if (!outArgs.DistPath) {
    if (buildOptions.outputPath == prodPath) outArgs.DistPath = devPath;
    else if (buildOptions.outputPath == devPath) outArgs.DistPath = prodPath;
  }

  buildOptions.outputPath = outArgs.DistPath;

  await fs.writeJSON("angular.json", angular, { spaces: "\t" });
})(require("minimist")(process.argv.slice(2)));
