function solve(input) {
    class User {
        constructor(name) {
            this.name = name;
            this.articles = [];
        }
    }

    class Article {
        constructor(name) {
            this.name = name;
            this.comments = [];
        }

        get commentsCount() {
            return this.comments.length;
        }
    }

    class Comment {
        constructor(title, content, user) {
            this.title = title;
            this.content = content;
            this.user = user;
        }
    }

    let allComments = [];
    let allUsers = [];
    let allArticles = [];

    let regex = /(.+?)\s+posts\s+on\s+(.+?):\s+(.+?),\s+(.+)$/;

    input.forEach(el => {
        if (el.includes('user')) {
            let username = el.split('user ')[1];
            allUsers.push(new User(username));
        } else if (el.includes('article')) {
            let articleName = el.split('article ')[1];
            allArticles.push(new Article(articleName));
        } else if (el.includes('posts on')) {
            let match = el.match(regex);

            if (match) {
                let username = match[1];
                let articleName = match[2];
                let commentTitle = match[3];
                let commentContent = match[4];

                if (allUsers.some(x => x.name == username) && allArticles.some(x => x.name == articleName)) {
                    let userObj = allUsers.find(x => x.name == username);
                    let articleObj = allArticles.find(x => x.name == articleName);
                    let newComment = new Comment(commentTitle, commentContent, userObj);
                    articleObj.comments.push(newComment);
                    userObj.articles.push(articleObj);
                }
            }
        }
    });

    let sortedArticles = allArticles.sort((a, b) => b.commentsCount - a.commentsCount);

    for (const article of sortedArticles) {
        console.log(`Comments on ${article.name}`);
        let sortedArticles = article.comments.sort((a, b) => a.user.name.localeCompare(b.user.name));
        for (const comment of sortedArticles) {
            console.log(`--- From user ${comment.user.name}: ${comment.title} - ${comment.content}`);
        }
    }
}

solve(['user Mark', 'Mark posts on someArticle: NoTitle, stupidComment',
    'article Bobby', 'article Steven',
    'user Liam', 'user Henry',
    'Mark posts on Bobby: Is, I do really like them',
    'Mark posts on Steven: title, Run',
    'someUser posts on Movies: Like']);

// Write a function that stores information about users and their comments on a website. You have to store the users,
// the comments as an object with title and content, and the article that the comment is about.
// The user can only comment, when he is on the list of users and the article is in the list of articles.
// The input comes as an array of strings. The strings will be in the format:

// "user {username}" – add the user to the list of users
// "article {article name}" – add the article to the article list
// "{username} posts on {article name}: {comment title}, {comment content}" – save the info

// At the end sort the articles by a count of comments and print the users with their comments ordered by usernames in ascending.

// Output
// Print the result in the following format:
// "Comments on {article1 name}
// --- From user {username1}: {comment title} - {comment content}
// --- From user {username2}: …
// Comments on {article2 name}
