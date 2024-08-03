<script setup lang="ts">
import {
  Button,
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components';
import { UDEMEY_VUE_SETTINGS } from '@/lib/constants';
import { useLocalStorage } from '@vueuse/core';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { toast } from 'vue-sonner';

const settings = useLocalStorage(UDEMEY_VUE_SETTINGS, '{}');

const settingsParsed = computed(() => {
  return JSON.parse(settings.value);
});

const form = useForm({
  initialValues: settingsParsed.value?.notifications || {
    email: false,
    sms: false,
  },
});
const setValuesToLocalStorage = (values: typeof form.values) => {
  settings.value = JSON.stringify({ ...settingsParsed.value, notifications: values });
};

const submitHandler = form.handleSubmit((values) => {
  setValuesToLocalStorage(values);
  toast.success('Settings saved successfully');
});
</script>
<template>
  <form class="space-y-4 mb-16 md:w-6/12 mx-auto" @submit.prevent="submitHandler">
    <h2 class="mt-2 text-center">Notifications</h2>
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="email">
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Email Notifications</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="sms">
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>SMS Notifications</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <div>
      <Button class="w-full" type="submit">Save</Button>
    </div>
  </form>
</template>
