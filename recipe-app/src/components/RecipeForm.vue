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

useAutoSizeTextArea('#description');
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
</template>
