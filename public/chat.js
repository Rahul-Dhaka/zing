// const socket = io();
let username = document.querySelector('.usernameInp');
let chatBox = document.querySelector('.chatBox');
let btn1 = document.querySelector('.btn1');
let btn2 = document.querySelector('.btn2');
let userDetails = document.querySelector('.userDetails');
let chattingApp = document.querySelector('.chattingApp');
let chatScreen = document.querySelector('.chatScreen');
let activeUserss = document.querySelector('.activeUsers');
let headUname = document.getElementById('headUname');


// console.log(activePeopleList, 'list bhailog')

btn1.addEventListener('click', (ev)=>{
    console.log(username.value , socket.id);
    socket.emit('saveuser',{username: username.value});
    userDetails.classList.add('hide');
    chattingApp.classList.remove('hide');
    chatScreen.classList.remove('hide');
    headUname.innerText = `@${username.value}`;
} );

username.addEventListener('keypress', (e)=>{
    if(e.key==="Enter"){
        console.log(username.value , socket.id);
        socket.emit('saveuser',{username: username.value});
        userDetails.classList.add('hide');
        chattingApp.classList.remove('hide');
        chatScreen.classList.remove('hide');
        headUname.innerText = `@${username.value}`;
    }
    
} );

function updateActiveUsers(activeUsers){
   activeUserss.innerHTML= '';
    activeUsers.forEach(element => {
        let item = document.createElement('div');
        item.innerHTML = `<i class="fa-solid fa-circle"></i>${element}`;
        item.classList.add('aUser');
        activeUserss.appendChild(item);
    });
}

socket.on('msg', (msg)=>{
    let text = msg.text;
    let senderName = msg.senderName;
    let msgBody = document.createElement('div');
    msgBody.classList.add('msgBody', 'shadow');
    msgBody.innerHTML = `<span>@${senderName}</span>
    <p>${text}</p>`;
    chatScreen.appendChild(msgBody);
    chatScreen.scrollTo(0,9999999999);
})

socket.on('joinedChat',({username, activeUsers})=>{
console.log(username,' has joined the chat, active users:',activeUsers);
updateActiveUsers(activeUsers);
})

socket.on('disconnectedUser',({username, activeUsers})=>{
    console.log(username, 'has left the chat, active users:', activeUsers);
    updateActiveUsers(activeUsers);
})


btn2.addEventListener('click', (ev)=>{
   socket.emit('chat', {msg: chatBox.value},(res)=>{
    console.log(res.status);
    console.log('chat sent')
   });
   chatBox.value = '';
   chatScreen.scrollBy(0,1000);
});

chatBox.addEventListener('keypress', (e)=>{
    if(e.key==="Enter"){
        console.log('enter pressed');
        socket.emit('chat', {msg: chatBox.value},(res)=>{
            console.log(res.status);
            console.log('chat sent')
           });
           chatBox.value = '';
           chatScreen.scrollBy(0,1000);
    } else{

    }
    

})


chattingApp.classList.add('hide');
chatScreen.classList.add('hide');