<template lang="pug">
  div#parent
    nav.navbar.navbar-dark.bg-dark
      span.navbar-brand TAO Made Simple
      span.navbar-text Additional interfaces for the TAO system
    b-container#app-actions(fluid align-v="center")
      b-row#app-row(align-h="center")
        b-col#app-col(xs="12" sm="11" md="10" lg="9" xl="8")
          h1 Welcome on TAO Made Simple !
            ul
              li(v-for="user in users" :key="user.id") {{ user.username }}
          h2 Posts
            ul
              li(v-for="post in posts" :key="post.id") {{ post.title }} ({{ post.author }})
    span#child1(@click="changeText") {{ child1Text }}
    span#child2 {{ child2Text }}
</template>

<script>
export default {
  name: 'Test',
  data: () => ({
    child1Text: 'Hello',
    child2Text: 'World!',
      users: [{
          id: -1,
          username: '... loading ...',
          email: ''
      }],
      posts: [{
          id: -1,
          title: '... loading ...',
          content: '',
          author_id: -1
      }]
  }),
  methods: {
    changeText () {
      this.child1Text = 'Yop!!'
    }
  },
    mounted () {
        this.$axios.get('http://localhost:10080/api/user')
            .then(response => {
                this.$jsonLog(response)
                this.users = response.data
            })
        this.$axios.get('http://localhost:10080/api/post')
            .then(response => {
                this.$jsonLog(response)
                this.posts = response.data
            })
    },
}
/*

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
        mounted: function () {
// Retrieve all data here or pass them through props of this component.
            this.module = 'Math';
            this.room = 'E120';
            this.keyAccess = '123456';
            this.startTime = new Date('October 6 2019 14:15');
            this.endTime = new Date('October 6 2019 16:40');
        }
    }


 */

</script>

<style scoped lang="stylus">
  #child1
    font-weight bold
    #app
    height 100%
    display flex
    flex-direction column
    align-content center
    justify-content start
  #app-actions
    flex-grow 1
    display flex
    flex-direction column
    align-content center
    justify-content center
</style>