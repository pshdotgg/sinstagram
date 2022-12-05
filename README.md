# Sinstagram

[Check it out](https://sinstagram.netlify.app/)

A fully functional photo sharing social media app to share your moments with friends and family in real-time.
I learn't a lot completing this project. I used Firebase for the backend, and Tailwind CSS instead of CSS modules. It was fun and challenging at the same time.

- As you visit the site, you're asked to either log in or signup.

![Log-in-·-Sinstagram](https://user-images.githubusercontent.com/104677763/204483261-093e57a5-e67d-445e-a6ad-1864c8258d1b.png)

- After you log in, you're greeted by your personalized feed. If you're a new user or if you don't follow anyone, then you're greeted by the other user's post whom you can follow to get a personalized feed.

![smartmockups_lb18wxrt](https://user-images.githubusercontent.com/104677763/204484159-3ccb5f74-ed11-4d5d-b1a3-82d868e34d09.png)

- The posts are lazily queried, as well as infinite scroll is implemented for a smooth experience and faster load times.
![Feed-·-Sinstagram (2)](https://user-images.githubusercontent.com/104677763/204494524-24666096-3180-49db-9b7a-8591f3d0c67a.gif)


- When someone follows you or interacts with your post, you'll receive a notification.

<p align='center'><img src='https://user-images.githubusercontent.com/104677763/204484944-b23518ae-c37e-4e21-8f0b-1bf96649442d.png' alt='' width='300px'/></p>

- If you don't feel like browsing your feed, then you can visit the explore page to view posts from strangers.
As you're switching to the explore page a progress bar is shown at the top,

![Feed-·-Sinstagram](https://user-images.githubusercontent.com/104677763/204488321-85c2dbcd-a3f5-4888-9c8a-bb0f2a562b4c.gif)

- You can click on the post to open it in a modal, as the post is being fetched you are greeted by a loading post skeleton.
You can like, comment, as well as save the post. After interacting with the post, click outside the modal or the close button at the top right corner to get back to your postion at the explore page.

![Explore-·-Sinstagram](https://user-images.githubusercontent.com/104677763/204490352-954100ef-2743-4036-bea5-6fef0abce7cd.gif)

- You can easily visit your friends or family members profile using the dedicated search bar.
![Explore-·-Sinstagram (1)](https://user-images.githubusercontent.com/104677763/204491381-f24b9e79-63ed-43ff-b8e0-66d2f4f940e4.gif)

- If instead you visit your own profile, then you are displayed some extra options to see your saved posts, as well as to edit your profile.
![Feed-·-Sinstagram (1)](https://user-images.githubusercontent.com/104677763/204492977-3c0df990-88bd-4a78-8992-070fd500c53f.gif)

- You can edit your profile including your profile pic, email, and username.
![Tony-Stark-stark-·-Sinstagram](https://user-images.githubusercontent.com/104677763/204493399-600e2381-831e-4d46-b6cf-e09916f23134.gif)

- If you're done for the day, then you can log out using the options dialog by clicking on the gear icon.

![Tony-Stark-stark-·-Sinstagram (2)](https://user-images.githubusercontent.com/104677763/204495901-0e538add-3238-42cf-b0d2-2a0eb7810ef8.gif)

See you tomorrow. :)

- One more thing, of course you can add a new post by clicking on the plus icon at the navbar. 

![Tony-Stark-stark-·-Sinstagram (1)](https://user-images.githubusercontent.com/104677763/204495520-278d0fd0-c786-4c37-bdb7-7014e3c9f19c.gif)

[Check it out](https://sinstagram.netlify.app/)


**Tech I Used:**

- React
- Firebase
- Tailwind CSS
- JavaScript

## Project Planning

## Routes

- / (Feed Page)

Components:

- FeedPost
- FeedPostSkeleton
- FeedSideSuggestions

- /explore (Explore Page)

Components:

- ExploreSuggestions
- ExploreGrid

- /p/:postId (Post Page)

Components:

- Post
- PostSkeleton
- PostModal
- MorePostsFromUser

- notifications

Components:

- NotificationList
- NotificationTooltip

- /:username (Profile Page)

Components:

- ProfileTabs

- /accounts/edit (Edit Profile Page)

- /accounts/login (Login Page)

- /accounts/emailsignup/ (Signup Page)

- /\* (Not Found Page)

## Shared Components

- Navbar
- FollowSuggestions
- UserCard
- ProfilePicture
- FollowButton
- LoadingScreen
- OptionsDialogue
- Layout
- GridPost
- SEO
