<template>
    <section>
        <h2>About</h2>
        <p>Made this project to show all I've been learning about Vue JS in a simple but quite complete application.</p>

        <h3>What is Pinia Knowledge?</h3>
        <p>
            The aim of this app is to help keep track of learning tasks or courses, similar to a TODO list.
            <br/>
            <br/>
            Each "course" stores some extra information, like the duration of the course, the source (using some of the most common online learning sources), whether the course or staks has been completed, and whether it's the user's favourite or not.
            <br/>
            <br/>
            The list of courses is stored in an online Firebase DB, and Pinia store is used to manipulate the state of the app and to sync changes with the DB.
            <br/>
            <br/>
            The list of courses can also be filtered or searched, and a detailed view of the course's relevant contents can be seen when clicking on them.
            <br/>
            <br/>
            There are also 2 forms: one to add a course, and one to edit the course information (title, source, duration).
        </p>
    </section>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>
<style scoped>

section {
    max-width: 640px;
    margin: 20px auto;
    text-align: justify;
    text-justify: inter-word;
}

h3 {
    margin-top: 50px;
}
</style>