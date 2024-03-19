# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import jsonlines
import pymongo

class JsonLinesWriterPipeline:
    def __init__(self):
        self.file = open("output.jsonl", "w", encoding="utf-8")
        self.writer = jsonlines.Writer(self.file)

    def process_item(self, item, spider):
        self.writer.write(item)
        return item

    def close_spider(self, spider):
        self.file.close()

class MongoDBPipeline:
    collection_name = 'data'

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE')
        )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
 
        unique_identifier = {'college': item['college'], 'title': item['title']}

        # Use update_one with upsert option to insert or update the document
        self.db[self.collection_name].update_one(
            filter=unique_identifier,
            update={'$set': dict(item)},
            upsert=True
        )


class WebspiderPipeline:
    def process_item(self, item, spider):
        return item
