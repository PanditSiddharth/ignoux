"use client"
import { useForm } from 'react-hook-form';
import { ZodProductScema } from '@/modals/zod';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/product/image-upload';
import { FileUpload } from '@/components/product/file-upload';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { IProduct } from '@/modals/product.model';
import { addOrUpdateProduct } from '@/server-functions/product';
interface IProductForm {
  initialValue?: IProduct
}
const AddProductForm = ({ initialValue }: IProductForm) => {
  const [tagInput, setTagInput] = useState('')
  const { toast } = useToast()

  const form = useForm<z.infer<typeof ZodProductScema>>({
    resolver: zodResolver(ZodProductScema),
    defaultValues: {
      _id: initialValue?._id,
      title: initialValue?.title || "",
      description: initialValue?.description || "",
      price: initialValue?.price,
      tags: initialValue?.tags || [],
      thumbnail: initialValue?.thumbnail || "",
      fileLink: initialValue?.fileLink || "",
      createdOn: initialValue?.publishedAt || new Date(),
      slug: initialValue?.slug
    }
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length != 0) {
      toast({
        title: "Error !",
        description: JSON.stringify(form.formState.errors),
        variant: "destructive",
        duration: 2000
      })
    }
    // eslint-disable-next-line
  }, [])

  const onSubmit = async (data: z.infer<typeof ZodProductScema>) => {

    if (!data.slug || !/^(?!-)(?!.*--)[a-z0-9-]+(?<!-)$/.test(data.slug)) {
      return form.setError("slug", { message: "Only letters, - and numbers are allowed" });
    }

    const isAdded = await addOrUpdateProduct(data)

    if (isAdded?.success) {
      toast({
        title: isAdded?.productAdded ? "Product Added" : "Product Updated",
        description: `Product has been ${isAdded?.productAdded ? "added" : "updated"} successfully`,
        duration: 5000
      })

    }
    else {
      toast({
        title: "Error !",
        description: isAdded?.error,
        variant: "destructive",
        duration: 5000
      })

    }
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

  // Watch the name field
  // const nameValue = form.watch("name");

  // Update the slug field whenever the name field changes
  // useEffect(() => {
  //   const generateSlug = (value: string) => value.trim().toLowerCase().replace(/\s+/g, "-");
  //   form.resetField("slug")
  //   form.setValue("slug", generateSlug(nameValue));
  // }, [nameValue]);






  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full p-4 max-w-4xl mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent className='flex-1 grid md:grid-cols-2 grid-cols-1 w-full  justify-center gap-2'>
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <ImageUpload onChange={field.onChange} img_src={field.value} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileLink"
              render={({ field }) => (
                <FormItem >
                  <FileUpload onChange={field.onChange} value={initialValue?.fileLink + ""} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Product Name' {...field} />
                  </FormControl>
                  <FormDescription>Add a name for your product</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input type='number' onChange={(e) => field.onChange(Number(e.target.value))} placeholder='Enter Product Price' value={field.value} />
                  </FormControl>
                  <FormDescription>Add a price for your product</FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Slug</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Product url slug' {...field} />
                  </FormControl>
                  <FormDescription>Slug will create product link</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((tag, index) => (
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
                    </div>
                  </FormControl>
                  <FormDescription>Press Enter or click Add to add a tag</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} className='resize-none' placeholder='Enter Product Description' {...field} />
                  </FormControl>
                  <FormDescription>Describe your product</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          </CardContent>
          <CardFooter className='flex justify-center items-center'>

            <Button type="submit" disabled={form.formState.isSubmitting} className='w-full md:max-w-xs'>
              {form.formState.isSubmitting ? "Adding..." : "Add Product"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default AddProductForm;