module.exports ={
    name: 'ping',
    description: "This is a ping command!",
    execute(message,args){
        //write my code here for execution
        message.channel.send('pong');
    }
}