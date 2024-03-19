const fs = require("fs").promises;
const cheerio = require("cheerio");

class FetchService {
  constructor(httpService) {
    this.timeout = 10 * 1000;
    this.httpService = httpService;
  }
  async fetchAndSave(url) {
    const response = await this.httpService.get(url, { timeout: this.timeout });
    const filename = this.getFilenameFromUrl(url);
    await fs.writeFile(filename, response.data, "utf8");
    return response.data;
  }

  getFilenameFromUrl(url) {
    const urlObj = new URL(url);
    return `${urlObj.hostname}.html`;
  }

  async getLastFetchInfo(filename) {
    try {
      const stats = await fs.stat(filename);
      return stats.mtime.toISOString();
    } catch (error) {
      return null;
    }
  }

  async getFileMetadata(htmlContent) {
    const $ = cheerio.load(htmlContent);
    const links = $("a").length;
    const images = $("img").length;
    return { links, images };
  }

  printSiteMetadata(url, links, images, lastFetch) {
    console.log(
      `site: ${url}\nnum_links: ${links}\nimages: ${images}\nlast_fetch: ${lastFetch}`
    );
  }
}

module.exports = FetchService;
