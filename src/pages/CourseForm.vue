<template>
    <div class="new-course-form">
        <h1> Add new course</h1>
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
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useKnowledgeStore } from '../stores/KnowledgeStore';
import { useRouter } from "vue-router";

export default {
    setup() {
        const courseStore = useKnowledgeStore();
        const router = useRouter();
        const title = reactive({ value: '', isValid: true });
        const source = reactive({ value: '', isValid: true });
        const duration = reactive({ value: '',  isValid: true });

        const validateTitle = () => {
            title.isValid = true;
            if(title.value === '')
                title.isValid = false;
        };

        const validateDuration = () => {
            duration.isValid = true;
            if(duration.value === '' || duration.value < 1)
                duration.isValid = false;
        };

        const validateSource = () => {
            source.isValid = true;
            if(source.value === '')
                source.isValid = false;
        };

        const clearErrors = () => {
            source.isValid = true;
            duration.isValid = true;
            title.isValid = true;
        };

        const handleSubmit = () => {
            console.log(title.value, source.value, duration.value);
            validateTitle();
            validateSource();
            validateDuration();
            if(!title.isValid || !source.isValid || !duration.isValid) return;

            courseStore.addCourse({
                id: Math.floor(Math.random() * 10000),
                title: title.value,
                source: source.value,
                isFav: false,
                duration: duration.value
            });

            router.replace({ path: '/' });
        };

        return {
            handleSubmit,
            validateTitle,
            validateDuration,
            validateSource,
            clearErrors,
            title,
            source,
            duration
        };
    },
}
</script>

<style scoped>
.new-course-form {
    /* background: #e7e7e7; */
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
</style>