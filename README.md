# Yelp Clone

[live][live]
[live]: http://scottYup.com/

## Minimum Viable Product
I will make a yelp clone. Users can:
- [x] Create accounts and sign in
- [x] Add a profile picture
- [x] Edit profile information
- [x] View businesses
- [x] Browse businesses by category
- [x] Search for businesses
- [x] Filter search results
- [x] Rate and review businesses
- [ ] Edit ratings and reviews

* [DB schema][schema]
* [Wireframes][wireframes]

[wireframes]: ./wireframes
[schema]: ./schema.md

## Implementation Timeline
### PHASE 1: User authentication, seed data for businesses (1 day)
Users will be able to sign up and sign in, and have a basic profile page.
There will also be enough seed data so that app can be used in a meaningful
way. By the end of this phase, the app will have been pushed to Heroku.

* [Phase 1 Details][phase-1]

### PHASE 2: Showing businesses (1 day)
Businesses can be viewed regardless of log-in status. There will be API routes
to show json data for businesses and reviews, and the business collection and
model will fetch from these routes.

* [Phase 2 Details][phase-2]

### PHASE 3: Writing/editing reviews (1 day)
Logged-in users will be able to write and edit reviews. I will add a Backbone
ReviewsIndexItem view so that reviews can be seen on a business show page.

* [Phase 3 Details][phase-3]

### PHASE 4: Home page and browsing (2 days)
The home page will allow users to browse and pick businesses by categories. I
will add a search route to the BusinessesController and a Backbone
BusinessIndexItem view so that searched businesses can be displayed.

* [Phase 4 Details][phase-4]

### PHASE 5: Index page and showing search results (2 days)
The index page will show search results and will allow filtering by most
reviewed, highest rated, date, category, and price. I will create a navbar
header so users can search by keywords, as well as a Backbone SearchResults
view to display BusinessIndexItem subviews.

* [Phase 5 Details][phase-5]

### PHASE 6: Showing locations on map (1-2 days)
On the search results page, there will be a map with pointers to all the
businesses listed on that page. There will also be a map on each businesses'
show page.

* [Phase 6 Details][phase-6]

## BONUS FEATURES
- [x] Pagination
- [x] Friending / Following
- [ ] Type-ahead search bar
- [ ] Feedback for reviews
- [ ] Filter reviews
- [ ] Filter businesses by distance
- [ ] Allow users to add pictures to businesses

[phase-1]: ./phases/phase1_details.md
[phase-2]: ./phases/phase2_details.md
[phase-3]: ./phases/phase3_details.md
[phase-4]: ./phases/phase4_details.md
[phase-5]: ./phases/phase5_details.md
[phase-6]: ./phases/phase6_details.md
