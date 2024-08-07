import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components';
import { useAutoSizeTextArea } from '@/hooks';

export const RecipeForm = () => {
  const { control, watch } = useFormContext();
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);

  const description = watch('description');
  useAutoSizeTextArea(textAreaRef, description);

  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recipe Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field: { ref, ...field } }) => (
          <FormItem>
            <FormLabel>Recipe Description</FormLabel>
            <FormControl>
              <Textarea
                ref={(area) => {
                  textAreaRef.current = area;
                  ref(area);
                }}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
