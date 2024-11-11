from django.urls import path
from .views import CreateLinkView, ClickLinkView, LinksByCreatorView, LinksByCountryView, LinksByUserAgentView

urlpatterns = [
    path('create_link/', CreateLinkView.as_view(), name='create_link'),
    path('click_link/', ClickLinkView.as_view(), name='click_link'),
    path('links_by_creator/<int:user_id>/', LinksByCreatorView.as_view(), name='links_by_creator'),
    path('links_by_country/<str:country>/', LinksByCountryView.as_view(), name='links_by_country'),
    path('links_by_user_agent/<str:user_agent>/', LinksByUserAgentView.as_view(), name='links_by_user_agent'),
]
