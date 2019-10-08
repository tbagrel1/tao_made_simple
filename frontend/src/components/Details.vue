<template lang="pug">
    h2 Utilisateur {{ id }}
    div#general
</template>
<script>
    export default {
        name: 'User',
        props: {
            id: String, // ID of the user.
        },
        data: () => ({
            name: '', // Name of the user. This can be a custom name to define that user in the TAO supervision tab.
            type: null, // Type of user (e.g. 0 : user account, 1 : emergency account, ...).
            status: { // Depending on the method we use to get these status variable, these may be
                      // in computed properties instead of data.
                state: null, // State of the user (e.g. 0 : waiting, 1 : in exam, 2 : had finished the exam).
                connexion: null, // Connexion status of the user (e.g. 0 : connected, 1 : disconnected).
                progression: null, // Progression of the user (percentage)
                question: null, // Number of the last question answered by the user.
            },
            enterTime: null, // Time when the user started the exam.
            exitTime: null, // Time when the user finished the exam.
            leftTime : null, // Time left for the user to finish the exam.
        }),
        computed: {
        },
        methods: {

        },
        mounted() {
        }
    }
</script>

<style scoped lang="stylus">
</style>
