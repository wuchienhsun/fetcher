class FetchController {
  constructor(fetchService, urls, printMetadata) {
    this.fetchService = fetchService;
    this.urls = urls;
    this.printMetadata = printMetadata;
  }

  isValidUrl(urlString) {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
  }

  async execute() {
    for (const url of this.urls) {
      if (!this.isValidUrl(url)) {
        console.error(`Error, invalid url: ${url}`);
        continue;
      }
      try {
        const filename = this.fetchService.getFilenameFromUrl(url);
        const lastFetch = await this.fetchService.getLastFetchInfo(filename);
        const htmlContent = await this.fetchService.fetchAndSave(url);

        if (this.printMetadata) {
          const metadata = await this.fetchService.getFileMetadata(htmlContent);
          this.fetchService.printSiteMetadata(
            url,
            metadata.links,
            metadata.images,
            lastFetch
          );
        } else {
          console.log(`${url} has been saved.`);
        }
      } catch (error) {
        console.error(`Error processing ${url}: ${error.message}`);
      }
    }
  }
}

module.exports = FetchController;
