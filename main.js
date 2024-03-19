const HttpService = require("./service/http");
const FetchService = require("./service/fetch");
const FetchController = require("./controller/fetch");
const process = require("process");

async function main() {
  const httpService = new HttpService();
  const fetchService = new FetchService(httpService);
  const urls = process.argv.slice(2).filter((arg) => arg !== "--metadata");
  const printMetadata = process.argv.includes("--metadata");

  if (urls.length === 0) {
    console.error("No URLs provided.");
    return;
  }

  const controller = new FetchController(fetchService, urls, printMetadata);
  await controller.execute();
}

main().catch((error) => console.error("Execution failed:", error));
