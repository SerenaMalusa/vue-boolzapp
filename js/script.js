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
    },
});

app.mount('#app');