<template>
    <div class="course">
        <input
            class="course-complete"
            type="checkbox"
            v-model="course.completed"
            @change="courseStore.toggleComplete(course.id)"
        />
        <router-link
            class="course-link"
            :class="{'completed': course.completed}"
            :to="courseEditUrl"
            :course="course"
        >
            <h3>
                {{ course.title }}
            </h3>
        </router-link>
        <h5>
            {{ courseHMDuration }}
        </h5>
        <h5>
            {{ course.source }}
        </h5>
        <div class="icons">
            <i
                class="material-icons"
                @click="courseStore.deleteCourse(course.id)"
            >delete</i>
            <i
                class="material-icons"
                :class="{active: course.isFav}"
                @click="courseStore.toggleFav(course.id)"
            >favorite</i>
        </div>
    </div>
</template>

<script>
import { useKnowledgeStore } from '../stores/KnowledgeStore';
import { computed } from 'vue';

export default {
    props: ['course'],
    setup(props) {
        const courseStore = useKnowledgeStore();

        const courseEditUrl = computed(() => {
            return `/courses/${props.course.id}`;
        });

        const courseHMDuration = computed(() => {
            const hours = Math.floor(props.course.duration/60);
            const minutes = props.course.duration % 60;

            let timeHM = "";
            timeHM += hours > 0 ? `${hours} h ` : "";
            timeHM += minutes > 0 ? `${minutes} min` : "";
            return timeHM;
        });

        return {
            courseStore,
            courseEditUrl,
            courseHMDuration,
        }
    }
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

.course-complete {
    border: 1px solid #444;
}

.completed h3 {
    text-decoration: line-through;
    text-decoration-thickness: 3px;
}

.course h3,
.course .icons {
    display: inline-block;
}

.course h5 {
    color: #bbb;
    width: 20%;
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

.course:hover {
    /* background-color: #ffd859; */
    color: #ffd859;
}

.course-link {
    text-decoration: none;
    color: inherit;
    width: 40%;
}
</style>