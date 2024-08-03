<script setup lang="ts">
import {
  Button,
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { UDEMEY_VUE_SETTINGS } from '@/lib/constants';
import { useLocalStorage } from '@vueuse/core';
import { useForm } from 'vee-validate';
import { computed } from 'vue';import { toast } from 'vue-sonner';



const settings = useLocalStorage(UDEMEY_VUE_SETTINGS, '{}');

const settingsParsed = computed(() => {
  return JSON.parse(settings.value);
});

const form = useForm({
  initialValues: settingsParsed.value?.privacy || {
    visibility: '',
    searchEngineIndexing: false,
  },
});
const setValuesToLocalStorage = (values: typeof form.values) => {
  settings.value = JSON.stringify({ ...settingsParsed.value, privacy: values });
};

const submitHandler = form.handleSubmit((values) => {
  setValuesToLocalStorage(values);
  toast.success('Settings saved successfully');
});
</script>
<template>
  <form class="space-y-4 mb-16 md:w-6/12 mx-auto" @submit.prevent="submitHandler">
    <h2 class="mt-2 text-center">Privacy</h2>
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="searchEngineIndexing">
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Search Engine Indexing</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="visibility">
      <FormItem>
        <FormLabel>Visibility</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="--Select a Visibility Level--" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <div>
      <Button class="w-full" type="submit">Save</Button>
    </div>
  </form>
</template>
