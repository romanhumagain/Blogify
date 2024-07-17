from django.utils.text import slugify
import uuid

'''to generate slug for the blog post'''
def generate_slug(model_class, title:str)->str:
  slug = slugify(f'{title}-{uuid.uuid4()}')
  
  while model_class.objects.filter(slug = slug).exists():
    slug = slugify(f'{title}-{uuid.uuid4}')

  return slug
    
    
  