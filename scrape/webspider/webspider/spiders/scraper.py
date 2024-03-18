from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from datetime import datetime


class CrawlingSpider(CrawlSpider):
    # name = "tester"
    allowed_domains = ["ktu.edu.in"]
    start_urls = ["https://ktu.edu.in/Menu/announcements"]  #"https://ktu.edu.in/Menu/events"
    rules = (
        Rule(LinkExtractor(allow=("Menu/announcements")), callback="parse_announcements", follow=True),
        # Rule(LinkExtractor(allow=("Menu/events")), callback="parse_events", follow=True),

    )

 

    def parse_announcements(self, response):
         print("testing...")