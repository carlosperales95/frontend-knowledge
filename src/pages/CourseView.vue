<template>
    <div class="new-course-form">
        <h1> Edit course</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-control">
                <label for="title">Course or resource title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="I want to study..."
                    v-model="title.value"
                    @blur="validateTitle"
                    @focus="clearErrors"
                />
            </div>
            <p class="validation-error" v-if="!title.isValid">
                Please enter a title for the course. It can be anything!
            </p>
            <div class="form-control">
                <label for="source">Source of the course</label>
                <select
                    name="source"
                    placeholder="I found this on..."
                    v-model="source.value"
                    @change="validateSource"
                    @focus="clearErrors"
                >
                    <option value="">Please choose one</option>
                    <option value="youtube">Youtube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="udemy">Udemy</option>
                    <option value="coursera">Coursera</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <p class="validation-error" v-if="!source.isValid">
                Please select one of the available sources. If it's not one of the options, choose 'other'
            </p>
            <div class="form-control">
                <label for="title">Duration of the course</label>
                <input
                    type="number"
                    name="duration"
                    placeholder="40"
                    v-model.number="duration.value"
                    @blur="validateDuration"
                    @focus="clearErrors"
                />
            </div>
            <p class="validation-error" v-if="!duration.isValid">
                A course of 0 minutes is not possible. Please enter an approximate course duration (in minutes)
            </p>
            <button>Submit</button>
            <a @click.stop="$emit('change-mode', 'view')">Back</a>
        </form>
    </div>
</template>

<script>
import { useKnowledgeStore } from '../stores/KnowledgeStore';
import useForm from "../components/hooks/form.js";
import { toRef } from 'vue';
export default {
    props: ['course', 'id', 'mode'],
    setup(props, context) {
        const courseStore = useKnowledgeStore();
        
        const {
            title,
            source,
            duration,
            validateTitle,
            validateSource,
            validateDuration,
            clearErrors
        } = useForm();

        title.value = props.course.title;
        source.value = props.course.source;
        duration.value = props.course.duration;
        const mode = toRef(props.mode)
        
        const handleSubmit = () => {
            validateTitle();
            validateSource();
            validateDuration();
            if(!title.isValid || !source.isValid || !duration.isValid) return;

            courseStore.editCourse(props.id, {
                title: title.value,
                source: source.value,
                isFav: false,
                duration: duration.value
            });
            context.emit('change-mode', 'view');
        };

        return {
            handleSubmit,
            validateTitle,
            validateDuration,
            validateSource,
            clearErrors,
            title,
            source,
            duration,
        };
    },
}
</script>

<style scoped>
.new-course-form {
    padding: 20px 0;
    text-align: center;
}

form {
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.form-control {
    display: inline-flex;
    flex-direction: row;
    width: 40rem;
    padding: 1rem;
    text-align: left;
    align-content: flex-start;
    align-items: center;
}

form button {
    background: #ffd859;
    border: 0;
    padding: 10px;
    font-family: "Poppins";
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    width: 20rem;
    margin-top: 2rem;
    align-self: center;
}

form label {
    margin-right: 0.5rem;
    width: 15rem;
}

form input {
    border: 0;
    padding: 10px;
    border-radius: 6px;
    color: #555;
    font-size: 14px;
    width: 25rem;
}

form select {
    border: 0;
    padding: 10px;
    border-radius: 6px;
    color: #555;
    font-size: 14px;
    width: 26rem;
    padding: 0.6rem;
}

.validation-error {
    width: 48rem;
    color: #ff9659;
    text-align: left;
    font-size: 14px;
}

a {
    cursor: pointer;
}
</style>