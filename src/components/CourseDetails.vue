<template>
    <div class="course">
        <h3>{{ course.title }}</h3>
        <div class="icons">
            <i
                class="material-icons"
                @click="knowledgeStore.deleteCourse(course.id)"
            >delete</i>
            <i
                class="material-icons"
                :class="{active: course.isFav}"
                @click="knowledgeStore.toggleFav(course.id)"
            >favorite</i>
        </div>
    </div>
</template>

<script>
import { useKnowledgeStore } from '../stores/KnowledgeStore'

export default {
    props: ['course'],
    setup() {
        const knowledgeStore = useKnowledgeStore();

        return {
            knowledgeStore
        }
    },
}
</script>

<style scoped>
.course {
    padding: 6px 20px;
    background: #fff;
    margin-top: 20px;
    border-radius: 4px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.course h3,
.course .icons {
    display: inline-block;
}

.course .icons {
    text-align: right;
}

.course i {
    font-size: 1.4em;
    margin-left: 6px;
    cursor: pointer;
    color: #bbb;
}

.course i.active {
    color: #ff005d;
}
</style>