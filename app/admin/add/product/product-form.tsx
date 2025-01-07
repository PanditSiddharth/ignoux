"use client"
import { useForm } from 'react-hook-form';
import { ZodProductScema } from '@/modals/zod';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
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
import { MyField } from '../myField';
import { getProductDefault } from '../helpers';
// import { useProductIds } from '@/store';
interface IProductForm {
  initialValue?: IProduct
}
const AddProductForm = ({ initialValue }: IProductForm) => {
  const [tagInput, setTagInput] = useState('')
  // const { productIds, setProductIds } = useProductIds()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof ZodProductScema>>({
    resolver: zodResolver(ZodProductScema),
    defaultValues: getProductDefault(initialValue)
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length != 0) {
      toast({
        title: "Error !",
        description: Object.values(form.formState.errors).map(err => err.message).join(", "),
        variant: "destructive",
        duration: 2000
      })
    }
    // eslint-disable-next-line
  }, [form.formState.errors])

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





  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full p-4 max-w-4xl mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent className='flex-1 grid md:grid-cols-2 grid-cols-1 w-full  justify-center gap-2'>
            <MyField
              form={form}
              name="thumbnail"
              input={(field) => <ImageUpload onChange={field.onChange} img_src={field.value} />}
            />

            <MyField
              form={form}
              name="fileLink"
              input={(field) => <FileUpload onChange={field.onChange} value={initialValue?.fileLink + ""} />}
            />

            <MyField
              form={form}
              name="name"
              label="Product Name"
              placeholder="Enter Product Name"
              description="Add a name for your product" />

            <MyField
              form={form}
              name="price"
              label="Product Price"
              placeholder="Enter Product Price"
              description="Add a price for your product"
              input={(field) => <Input type='number' onChange={(e) => field.onChange(Number(e.target.value))} placeholder='Enter Product Price' value={field.value || 0} />}
            />

            <MyField
              form={form}
              name="slug"
              label="Product Slug"
              placeholder="Enter Product Slug"
              description="Slug will create product link" />

            <MyField
              form={form}
              name="tags"
              label="Product Tags"
              placeholder="Enter Product Tags"
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
              label="Product Description"
              placeholder="Enter Product Description"
              description="Describe your product"
              input={(field) => <Textarea rows={4} className='resize-none' placeholder='Enter Product Description' {...field} />}
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