const { createApp } = Vue;

const app = createApp ({
    data() {
        return {
            contacts: contacts,
            // index of the contact whose chat is open
            activeChat: 0,
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

        sendMessage(contact) {
            // if there is nothing written in the imput do nothing
            if (!contact.draft) return;
            // get the date of the moment
            let newDate = new Date;
            let newDay = (newDate.getDate() < 10) ? '0' + newDate.getDate() : newDate.getDate();
            let newMonth = newDate.getMonth() + 1;
            newMonth = (newMonth < 10) ? '0' + newMonth : newMonth;
            // create a new message   
            const newMessage = {
                // data = newdate in the right format
                date: `${newDay}/${newMonth}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`,
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
        },
    },
});

app.mount('#app');