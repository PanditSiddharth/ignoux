"use client"
import { useForm } from 'react-hook-form';
import { ZodCourseSchema } from '@/modals/zod';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/product/image-upload';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify"
// import { addOrUpdateCourse } from '@/server-functions/course';
import { MyField } from '../myField';

import MyEditor from '../editor';
import { generateSlug, getCourseDefault } from '../helpers';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddProducts } from '@/store';
import { useSession } from 'next-auth/react';
import { addOrUpdateProducts } from '@/server-functions/product';
import { addOrUpdateCourse } from '@/server-functions/course';
import { courseFilter } from '@/helpers';

// when editing intial value requires
const AddCourse = () => {
  const [tagInput, setTagInput] = useState('')
  const { data: session } = useSession()
  const form = useForm<z.infer<typeof ZodCourseSchema>>({
    resolver: zodResolver(ZodCourseSchema),
    defaultValues: getCourseDefault({})
  });

  useEffect(() => {
    console.log(form.formState.errors)
    if (Object.keys(form.formState.errors).length != 0) {
      toast.error("Error in any field data")
    }
    // eslint-disable-next-line
  }, [form.formState.errors])

  const onSubmit = async (data: z.infer<typeof ZodCourseSchema>) => {

    if (!data.slug || !/^(?!-)(?!.*--)[a-z0-9-]+(?<!-)$/.test(data.slug)) {
      return form.setError("slug", { message: "Only letters, - and numbers are allowed" });
    }
 console.log(data)
    const bg = await addOrUpdateCourse(courseFilter({...data, author: session?.user?._id}))
    if ("error" in bg)
      return toast.error(bg.error)
    toast.success("Course Added Successfully")
  }

  const addTag = () => {
    if (tagInput.trim()) {
      form.setValue('tags', [...form.getValues('tags'), tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (index: number) => {
    const newTags = form.getValues('tags').filter((_, i) => i !== index)
    form.setValue('tags', newTags)
  }


  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full p-4 max-w-4xl mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle>Add Course</CardTitle>
          </CardHeader>
          <CardContent className='flex-1 grid md:grid-cols-2 grid-cols-1 w-full  justify-center gap-2'>
            <MyField
              form={form}
              name="thumbnail"
              input={(field) => <ImageUpload onChange={field.onChange} img_src={field.value} />}
            />

            <MyField
              form={form}
              name="title"
              label="Course Title"
              placeholder="Enter Course Title"
              fields={{
                onChange: (value: { target: { value: string } }) => {
                  form.setValue("title", value.target.value);
                  form.setValue("slug", generateSlug(value.target.value))
                }
              }}
              description="Add a Title for your course" />

            <MyField
              form={form}
              name="status"
              label="Course Status"
              description="Select your course status"
              input={
                (field) => <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Publish.." />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="published">Publish</SelectItem>
                  </SelectContent>
                </Select>

              }
            />

            <MyField
              form={form}
              name="slug"
              label="Course Slug"
              placeholder="Enter Course Slug"
              description="Slug will create course link" />

           <MyField
              form={form}
              name="price"
              label="Course Price"
              placeholder="Enter Course Price"
              description="Add a price for your course"
              input={(field) => <Input type='number' onChange={(e) => field.onChange(Number(e.target.value))} placeholder='Enter Course Price' value={field.value || 0} />}
            />

            <MyField
              form={form}
              name="tags"
              label="Course Tags"
              description="Press Enter or click Add to add a tag"
              input={(field) => <div className="flex flex-wrap gap-2">
                {field.value.map((tag: string, index: number) => (
                  <div key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center">
                    {tag}
                    <button type="button" onClick={() => removeTag(index)} className="ml-2 text-primary/50 hover:text-primary">
                      &times;
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag}>Add</Button>
                </div>
              </div>}
            />

            <MyField
              form={form}
              name="description"
              label="Course Description"
              description="Describe your course"
              input={(field) => <Textarea rows={4} className='resize-none' placeholder='Enter Course Description' {...field} />}
            />

          </CardContent>
          <CardFooter className='flex justify-center items-center'>

            <Button type="submit" disabled={form.formState.isSubmitting} className='w-full md:max-w-xs'>
              {form.formState.isSubmitting ? "Adding..." : "Add Course"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default AddCourse;

