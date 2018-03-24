/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //This suite is all about the RSS feeds definitions, the allFeeds variable in our application.
    describe('RSS Feeds', function() {

        // tests that the allFeeds variable has been defined and that it is not empty. 

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* loops through each feed in the allFeeds
         * object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        /* loops through each feed in the allFeeds
         * object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has Name', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    //This suite is all about the menu
    describe('The menu', function() {

        //This test ensures that the menu element is hidden by default
        it('is hidden', function() {
            var element = $('body').hasClass('menu-hidden');
            expect(element).toBe(true);
        });

         //This test ensures that the menu changes visibility when the menu icon is clicked.
        it('changes visibility', function() {
            $(document).ready(function() {
                var element = $('body').hasClass('menu-hidden');
                //Does the menu display when clicked
                $('.icon-list').click();
                element = $('body').hasClass('');
                expect(element).toBe(true);
                //Does it hide when clicked again
                $('.icon-list').click();
                element = $('body').hasClass('menu-hidden');
                expect(element).toBe(true);
            });            
        });
    });

    //This suite is all about the Initial Entries
    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, done);
        });
        /* This test ensures when the loadFeed function is called
         * and completes its work, there is at least a single .entry
         * element within the .feed container.
         */
        it('has at least a single element within the feed container', function() {
            $(document).ready(function() {
                var container = $('.feed .entry');
                expect(container.length).not.toBe(0);
            });
        });
    });

    //This suite is all about the New Feed Selection
    describe('New Feed Selection', function() {
        var oldFeeds,
            newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeeds = $('.feed').text();
                loadFeed(1, function() {
                	newFeed = $('.feed').text();
                	done();
            	});
            });
            
        });

        //This test ensures when a new feed is loaded that the content actually changes.
        it('when a new feed is loaded the content changes', function() {
            expect(newFeed).not.toBe(oldFeeds);
        });
    });
}());
