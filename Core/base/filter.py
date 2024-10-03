from django_filters import rest_framework as filters
from base.models import User

class UserFilter(filters.FilterSet):
   email = filters.CharFilter(field_name='email', lookup_expr='iexact')
   
   class Meta:
       model = User
       fields = ['email']
