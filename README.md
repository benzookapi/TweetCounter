# Simple Tweet Counter as Chrome Extension

## How to use
### 1. download me as zip (from the right top of this page [Clone or download] and unzip somewhere

### 2. Open your Chrome and go to right [...] panel > [More Tools] > [Extensions]

### 3. [Load unpacked] and select the unzipped directory at 1.

### 4. Now you can see the following icon at the right top.
![icon](sample_image_1.png)

### 5. Let's go to https://twitter.com

### 6. Search your tweet in the search box.
![search](sample_image_2.png)

Ex1: Simple Hashtag search.
`#your_hash_tag`

Ex2: Date ranged Hashtag search.
`#your_hash_tag since:2018-10-01_00:00:00_JST until:2018-10-31_23:59:59_JST`

### 7. Once you get the result, click the icon at 4. and [Count] button
![icon](sample_image_1.png)

![count](sample_image_3.png)

### 8. Your search result will begin to scroll down automatically (and gently) and the icon will change as below.
![icon](sample_image_4.png)

![count](sample_image_5.png)

### 9. After the scroll hits the bottom, the message gets shown up and you can see the tweet count. Congrats!
![message](sample_image_6.png)

![icon](sample_image_7.png)

![count](sample_image_8.png)

## If you want to stop...
Simply click [Stop] button to show the incomplete count.

## If it doesn't work (your time line has not reached the end, or counting not completed after one hour, etc.)...
Click [Count] again!

## Best practice
Reduce your tweet search results less than 1,000 for one counting or Twitter loading gets slow.
e.g. If you want one year tweet count, separate them to each month and summarize.

## How to debug
Check your console in dev. tool which shows the progress of counting with some errors.
![console](sample_image_10.png)
