const { createApp } = Vue;

const app = createApp ({
    data() {
        return {
            contacts: contacts,
            // index of the contact whose chat is open
            activeChat: 0,
            // value to use for the search among contacts
            searchContact: '',
            // array of replies
            replies: replies,
        }
    },

    computed: {
        // always get the data of the contact with i = activChat
        activeContact() {
            return this.contacts[this.activeChat];
        },
        // messages of the active contact
        activeMessages() {
            return this.activeContact.messages;
        },
        // array of filtered contacts 
        similarContacts() {
            // find the contacts whose name contains the searchContact string
            return this.contacts.filter((contact) => {
                const isThere = contact.name.toLowerCase().includes(this.searchContact.toLowerCase());
                // console.log(this.searchContact,contact.name,isThere);
                return isThere;
            });
        },
    },

    methods: {
        // function that changes the active contact to the index of the clicked chat
        goToChat(index) {
            this.activeChat = index;
        },
        // function that gets the time from the date string
        messageTime(date) {
            return date.substr(11,5);
        },
        // function that gets the date from the date string
        messageDate(date) {
            return date.substr(0,10);
        },
        // function that gets filter for the received messages and gets the last one
        getLastReceivedMessage(messages) {
            // filter for the received messages
            const receivedMessages = messages.filter((message) => message.status == 'received');
            // if there aren't any received messages return an object with an ampty date
            if (receivedMessages.length <= 0 ) {
                const emptyDate = {
                    date: '',
                };
                return emptyDate;
            };
            // returns only the last message
            return receivedMessages[receivedMessages.length - 1];
        },
        // print the string about the last access
        printLastAccess() {
            // save the last message's date
            const lastReceivedTime = this.getLastReceivedMessage(this.activeMessages).date;
            // if lastReceivedTime is empty: stop
            if (!lastReceivedTime) return;
            // returns the string to be printed in page
            return `Ultimo accesso alle 
                    ${this.messageTime(lastReceivedTime)} 
                    del 
                    ${this.messageDate(lastReceivedTime)}
                    `
        },
        // function to get the date and time and print them in the right format
        printDate() {
            // get the date of the moment
            let now = new Date;
            let newDay = (now.getDate() < 10) ? '0' + now.getDate() : now.getDate();
            let newMonth = now.getMonth() + 1;
            newMonth = (newMonth < 10) ? '0' + newMonth : newMonth;
            let newHours = (now.getHours() < 10) ? '0' + now.getHours() : now.getHours();
            let newMinutes = (now.getMinutes() < 10) ? '0' + now.getMinutes() : now.getMinutes(); 
            // return now in the right format
            return `${newDay}/${newMonth}/${now.getFullYear()} ${newHours}:${newMinutes}:${now.getSeconds()}`;    
        },
        // function to send a new message
        sendMessage(contact) {
            // get the words of the draft separated by every space
            const draftWords = contact.draft.trim().split(' ');
            // if there is nothing written in the imput, or if the first word 
            // of the array created before is empty: do nothing
            if (!contact.draft || !draftWords[0]) return;            
            // create a new message   
            const newMessage = {
                date: this.printDate(),
                // messagge will be the content of the draft
                message: contact.draft,
                // status wil be sent
                status: 'sent'
            };
            // console.log(newMessage.date);
            // push this message in the messages array
            contact.messages.push(newMessage);
            // empty the draft (and consequently the imput)
            contact.draft = '';
            // instant reply
            this.receiveMessage(contact);
        },
        // function to create a new received message
        receiveMessage(contact) {
            // create a new message   
            const newMessage = {
                date: this.printDate(),
                // messagge will be one ramdom element of the replies array
                message: this.replies[this.getRandomNum(this.replies.length-1)],
                // status wil be sent
                status: 'received'
            };
            // after 1 second
            setTimeout(()=> {
                // push this message in the messages array
                contact.messages.push(newMessage);
            }, 1000);

            // after half second get the last nsg with the "ref template" and
            // scroll it into view
            setTimeout(()=> {
                // console.log(lastMsgEl);
                const lastMsgEl = this.$refs.msgs[this.$refs.msgs.length-1];
                lastMsgEl.scrollIntoView({ behavior: 'smooth' });
            },500);
        },
        // function that changes the value of the 'visible' key for the argument contact
        changeVisible() {
            // cicle all the contacts
            this.contacts.forEach((contact) => {
                // put all the visible keys to false
                contact.visible = false;
                // if this contact name is included in the similar contact array
                if (this.similarContacts.includes(contact)) {
                    // change the visible key to true
                     contact.visible = true;
                }
                // return the changed contacts
                return contact;
            });           
            // console.log(this.contacts);            
        },
        // function to show the arrow of a message
        showArrow(message) {
            // create new key for message and set it to true
            message.isArrowShown = true;            
            // close arrows and menus of all other messages
            this.activeContact.messages.forEach((msg)=>{
                if (msg.date != message.date) {
                    msg.isArrowShown = false;
                    msg.isMenuShown = false;
                }
            });            
            // after 20 sec set the variables to false to hide the arrow and the menu
            setTimeout(()=> {
                message.isArrowShown = false;
                message.isMenuShown = false;
            }, 1000 * 20);
        },
        // function to show the message menu
        showMenu(message) {
            // create new key for message and set it to true
            message.isMenuShown = true;
        },
        // function to delete the message from the array
        deleteMessage(messageIndex) {
            // remove the message with this index from the array
            this.activeContact.messages.splice(messageIndex,1);
        },
        // function to get a random num between a max (included) and a min 
        getRandomNum(max,min=0) {
            return Math.floor(Math.random() * (max - min + 1) - min);
        },
        // function to add a new contact
        addNewContact() {
            // ask the contact name and img url to the user with prompts
            let newContactName = prompt('nome contatto',this.searchContact).trim();
            // while the name is empty or only spaces ask again
            let nameWords = newContactName.split(' ');
            while(!newContactName || !nameWords[0]){
                newContactName = prompt('inserisci il nome del nuovo contatto');
                nameWords = newContactName.split(' ');
            };
            // ask the url for the contact img
            let newContactImg = prompt('url immagine').trim();
            // while the url is empty or only spaces ask again
            let urlWords = newContactImg.split(' ');
            while(!newContactImg || !nameWords[0]){
                newContactImg = prompt('inserisci un url');
                urlWords = newContactName.split(' ');
            };
            // create a new contact obj
            const newContact = {
                name: newContactName,
                avatar: newContactImg,
                visible: true,
                messages: [ ],    
            };
            // empty the search bar
            this.searchContact = '';
            // add this new contact as the first contact
            this.contacts.unshift(newContact);
            // make all contacts visible
            this.contacts.forEach((contact)=> {
                contact.visible = true;
            });        
        },
    },
});

app.mount('#app');