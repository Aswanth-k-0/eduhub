# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class WebspiderItem(scrapy.Item):
    title = scrapy.Field()
    pdf_url = scrapy.Field()
    date = scrapy.Field()
    pass
