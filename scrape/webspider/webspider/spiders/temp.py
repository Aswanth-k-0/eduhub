import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from datetime import datetime, timedelta


class CrawlingSpider(CrawlSpider):
    name = "tester"
    allowed_domains = ["gecidukki.ac.in","gectcr.ac.in","cet.ac.in","nitc.ac.in"]
    start_urls = ["https://www.gecidukki.ac.in/notice", "https://gectcr.ac.in/all-announcements/" ,
                  "https://www.cet.ac.in/category/events/","https://nitc.ac.in/upcoming-events"]
    rules = (
        Rule(LinkExtractor(allow="notice", deny="students-information-notice"), callback="parse_geci", follow=True),
        Rule(LinkExtractor(allow=("all-announcements"), unique=True), callback="parse_gect"),
        Rule(LinkExtractor(allow=("category/events"), unique=True), callback="parse_cet",follow=True),
        Rule(LinkExtractor(allow=("upcoming-events"), unique=True), callback="parse_nitc",follow=True),
    )

 

    def parse_geci(self, response):
        items = response.xpath('//section[@class="content"]//div[@class="col-12 notice-item"]')
        for item in items:
            document_link = item.xpath('.//p//a//@href').get()
            if document_link:
                document_link = response.urljoin(document_link)
                            # Extract date components
            day = item.css('h3::text').get()
            month_year = item.css('div.col-1.notice-item-date span::text').get()
            page_link = response.url
            # Parse and format the date
            parsed_date = datetime.strptime(f"{day} {month_year}", "%d %b,%Y")
            formatted_date = parsed_date.strftime("%d %b %Y")
            today = datetime.now()
            two_months_ago = today - timedelta(days=60)  # Calculate two months ago
            if parsed_date >= two_months_ago and parsed_date <= today:
                yield {
                    "title": item.css('.news-title::text').get(),
                    "date": formatted_date,
                    "geci_document_link": document_link,
                    "college": "geci",
                    "tag": "Geci Announcements",
                    "page_link":page_link,
                }
            # yield scrapy.Request(document_link, callback=self.save_pdf, meta={'title': item.css('.news-title::text').get(),'date': formatted_date,
            #                                                                    'college': 'geci'})
    def parse_gect(self, response):
        print("here")

        announcements = response.css('div.all-announcements ul li')
        # print(announcements)
        for announcement in announcements:
            document_link = announcement.css('a::attr(href)').get()

            yield { 
                "title": announcement.css('a::text').get(),
                "gect_document_link": document_link,
                "college":"gect",
                "tag":"Gect Announcements",
            }

    def parse_cet(self, response):
        print("here")

        announcements = response.css('div#primary article.post')
        
        for announcement in announcements:
            header_title = announcement.css('h2.entry-title a::text').get()
            page_link=announcement.css('h2.entry-title a::attr(href)').get()
            date = announcement.css('time.entry-date.published::text').get()
            # Parse and format the date
            parsed_date = datetime.strptime(date, "%B %d, %Y")  # Use '%B' for the full month name
            formatted_date = parsed_date.strftime("%d %b %Y")

            content = announcement.css('div.entry-content p::text').get()
               # Check if the announcement date is within the last two months
            today = datetime.now()
            two_months_ago = today - timedelta(days=60)
            if parsed_date >= two_months_ago and parsed_date <= today:
                print("saving nitc....")
                yield {
                    "title": header_title,
                    "date": formatted_date,
                    "cet_content": content,
                    "tag":"Cet Events",
                    "college":"cet",
                    "page_link":page_link,
                }

    def parse_nitc(self, response):
        event_data = response.css('div.xc-c-name.xc-w-100')

        for event in event_data:
            link = event.css('a::attr(href)').get()
            date = event.css('div.xc-date p.c-name::text').get()
            title = event.css('div.xc-title p.c-name::text').get()
            title = title.strip() if title else None
            current_year = datetime.now().year

            combined_date_str = f'{date} {current_year}'
            combined_date = datetime.strptime(combined_date_str, '%b %d %Y')
            formatted_date = combined_date.strftime('%d-%m-%Y')
            yield {
                "link": link,
                "date": formatted_date,
                "title": title,
                "college":"nitc",
                "tag":"Nitc Events",
            }

    # def save_pdf(self, response):
    #     # Extract information from meta
    #     title = response.meta['title']
    #     date = response.meta['date']
    #     college = response.meta['college']

    #     # Save the PDF file with a filename based on title, date, and college
    #     filename = f"C:/Users/Lenovo/Desktop/project/webspider/webspider/files/{title}_{date}_{college}.pdf"
    #     with open(filename, 'wb') as f:
    #         f.write(response.body)

    #     self.log(f"PDF saved: {filename}")