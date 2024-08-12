<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components';
import { useAutoSizeTextArea } from '@/composables/useAutoSizeTextArea';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { maskito } from '@maskito/vue';
import { ref } from 'vue';
defineOptions({
  directives: { maskito },
});

useAutoSizeTextArea('#description');

const options = ref(
  maskitoNumberOptionsGenerator({
    prefix: '$',
    thousandSeparator: ',',
    precision: 2,
    decimalSeparator: '.',
  }),
);
</script>

<template>
  <FormField v-slot="{ componentField }" name="name">
    <FormItem>
      <FormLabel> Recipe Name </FormLabel>
      <FormControl>
        <Input type="text" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ componentField }" name="description">
    <FormItem>
      <FormLabel>Recipe description</FormLabel>
      <FormControl>
        <Textarea id="description" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ componentField }" name="cost">
    <FormItem>
      <FormLabel> Cost </FormLabel>
      <FormControl>
        <Input v-maskito="options" type="text" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
