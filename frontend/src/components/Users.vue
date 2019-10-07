<template lang="pug">
    h2 Utilisateurs
    li(v-for="user in users" :key="user.id")
        Users(id="users.id")
</template>
<script>
    export default {
        name: 'Users',
        data: () => ({
            users: { // List of all user's ID. ID will be used as key in the display loop above.
                id: null,
            },
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
