const { createApp } = Vue;

const app = createApp ({
    data() {
        return {

        }
    },

    methods: {
        testVue() {
            console.log('vue connected');
        }
    },
});

app.mount('#app');