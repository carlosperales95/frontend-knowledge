import { reactive } from 'vue';

export default function useForm() {
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

    return {
        title,
        source,
        duration,
        validateTitle,
        validateSource,
        validateDuration,
        clearErrors
    };
}