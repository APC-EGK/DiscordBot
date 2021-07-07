const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
const axios = require("axios");
const cheerio = require("cheerio");

const dealWithData = (html) => {
    const $ = cheerio.load(html);
    const urlMeme = $("._2_tDEnGMLxpM6uOa2kaDB3.ImageBox-image.media-element._1XWObl-3b9tPy64oaG6fax");
    const indexValue = randNo(urlMeme.length);
    console.log(`Source is:\n${urlMeme[indexValue].attribs.src}`);
    return urlMeme[indexValue].attribs.src;
};

const randNo = (limit) => {
    const thatNo = Math.floor(Math.random() * limit);
    return thatNo;
};


module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends an epic meme",
    run: async (client, message, args) => {
        // In this array, 
        // you can put the subreddits you want to grab memes from
        const subReddits = ["UncleRoger"];
        // Grab a random property from the array
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const mainUrl = `https://reddit.com/r/${random}`;
        // Get a random image from the subreddit page
        let img; 
        await axios
            .get(mainUrl)
            .then((response) => {
                img=dealWithData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)

        message.channel.send(embed);
    }

}