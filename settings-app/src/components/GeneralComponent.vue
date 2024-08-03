<script setup lang="ts">
import {
  Button,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/components';
import { useForm } from 'vee-validate';
import { useLocalStorage } from '@vueuse/core';
import { UDEMEY_VUE_SETTINGS } from '@/lib/constants';
import { computed } from 'vue';
import { toast } from 'vue-sonner';

const settings = useLocalStorage(UDEMEY_VUE_SETTINGS, '{}');

const settingsParsed = computed(() => {
  return JSON.parse(settings.value);
});

const form = useForm({
  initialValues: settingsParsed.value?.general || {
    username: '',
    email: '',
    aboutMe: '',
    gender: '',
    country: '',
  },
});
const setValuesToLocalStorage = (values: typeof form.values) => {
  settings.value = JSON.stringify({ ...settingsParsed.value, general: values });
};

const submitHandler = form.handleSubmit((values) => {
  setValuesToLocalStorage(values);
  toast.success('Settings saved successfully');
});
</script>
<template>
  <form class="space-y-4 mb-16 md:w-6/12 mx-auto" @submit.prevent="submitHandler">
    <h2 class="mt-2 text-center">General</h2>
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="aboutMe">
      <FormItem>
        <FormLabel>About Me</FormLabel>
        <FormControl>
          <Textarea v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField type="radio" v-slot="{ componentField }" name="gender">
      <FormItem>
        <FormLabel>Gender</FormLabel>
        <FormControl>
          <RadioGroup v-bind="componentField">
            <FormItem>
              <FormLabel class="font-normal">
                <FormControl>
                  <RadioGroupItem value="male" />
                </FormControl>
                Male
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <RadioGroup v-bind="componentField">
            <FormItem>
              <FormLabel class="font-normal">
                <FormControl>
                  <RadioGroupItem value="femal" />
                </FormControl>
                Female
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <RadioGroup v-bind="componentField">
            <FormItem>
              <FormLabel class="font-normal">
                <FormControl>
                  <RadioGroupItem value="other" />
                </FormControl>
                Other
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="country">
      <FormItem>
        <FormLabel>Country</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="--Select a Country--" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="US">USA</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="MX">Mexico</SelectItem>
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
