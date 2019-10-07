<template lang="pug">
    div#general
    h2 Informations générales
    span#datetime {{ currentDate }} - {{ currentTime }}
    span#start Heure de départ : {{ startTime }}
    span#end Heure de clôture : {{ endTime }}
    span#remaining Il reste : {{ remainingTime }}
</template>
<script>
    export default {
        name: 'GeneralInformation',
        data: () => ({
            module: '', // Name of the module of the exam.
            room: '', // Name of the room of the exam.
            keyAccess: '', // Password to connect to the exam.
            currentDate: (new Date()).getDate(), // Today's date.
            startTime: null, // Start time of the exam.
            endTime: null, // End time of the exam.
            questions: null, // Number of questions in the exam.
        }),
        computed: {
            currentTime: () => {
                return (new Date).getTime();
            },
            remainingTime: () => { // Time left before the end of the exam.
                return this.endTime - this.currentTime();
            }
        },
        methods: {
        },
        mounted() {
            // Retrieve all data here or pass them through props of this component.
            this.module = 'Math';
            this.room = 'E120';
            this.keyAccess = '123456';
            this.startTime = new Date('October 6 2019 14:15');
            this.endTime = new Date('October 6 2019 16:40');
        }
    }
</script>

<style scoped lang="stylus">
</style>
