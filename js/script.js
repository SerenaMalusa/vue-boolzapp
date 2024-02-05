const { createApp } = Vue;

const app = createApp ({
    data() {
        return {
            contacts: contacts,
            // index of the contact whose chat is open
            activeChat: 0,
            // value to use for the search among contacts
            searchContact: '',

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
            // returns only the last message
            return receivedMessages[receivedMessages.length - 1];
        },
        // print the string about the last access
        printLastAccess() {
            // save the last message's date
            const lastReceivedTime = this.getLastReceivedMessage(this.activeMessages).date;
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
            let newDate = new Date;
            let newDay = (newDate.getDate() < 10) ? '0' + newDate.getDate() : newDate.getDate();
            let newMonth = newDate.getMonth() + 1;
            newMonth = (newMonth < 10) ? '0' + newMonth : newMonth;
            // return newdate in the right format
            return `${newDay}/${newMonth}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
        },
        // function to send a new message
        sendMessage(contact) {
            // if there is nothing written in the imput do nothing
            if (!contact.draft) return;            
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
                // messagge will be what I want
                message: 'è stato il gatto',
                // status wil be sent
                status: 'received'
            };
            // after 1 second
            setTimeout(()=> {
                // push this message in the messages array
                contact.messages.push(newMessage);
            }, 1000);
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
                if (msg != message) {
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

        deleteMessage(messageIndex) {
            console.log(messageIndex,this.activeContact.messages[messageIndex].isArrowShown);
            this.activeContact.messages.splice(messageIndex,1);
            this.activeContact.messages[messageIndex].isArrowShown = false;
            console.log(messageIndex,this.activeContact.messages[messageIndex].isArrowShown);
        },
    },
});

app.mount('#app');