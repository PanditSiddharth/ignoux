"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';

export const MyField = (value: {
  name: string,
  label?: string,
  className?: string,
  placeholder?: string,
  description?: string,
  fields?: any,
  form?: any,
  input?: (field: any) => ReactNode
}) => {
  return <FormField
    control={value?.form.control}
    name={value.name as any}
    render={({ field }: { field: any }) => (
      <FormItem
        className={value?.className}
      >
        {value?.label && <FormLabel>{value.label}</FormLabel>}
        <FormControl>
          {value?.input ? value.input(field) :
            <Input placeholder={value?.placeholder} {...field} {...value?.fields} />
          }
        </FormControl>
        {value?.description && <FormDescription>{value.description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
}