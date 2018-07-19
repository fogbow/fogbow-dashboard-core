from django.conf.urls.defaults import patterns
from django.conf.urls.defaults import url

from openstack_dashboard.dashboards.fogbow.federatednetwork import views

urlpatterns = patterns('',
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^create/$', views.CreateView.as_view(), name='create'),
    url(r'^(?P<federatednetwork_id>[^/]+)/details$', views.DetailViewInstance.as_view(), name='detail'),
)