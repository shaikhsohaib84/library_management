from django.conf.urls import url

from .views import AdminSignUpView, AdminLoginView, AddBookView, ListAllBookView, LogoutView, UpdateBookView, DeleteBookView

urlpatterns = [
    url('signup/', AdminSignUpView.as_view()),
    url('login/', AdminLoginView.as_view()),
    url('add-book/', AddBookView.as_view()),
    url('list-all-book/', ListAllBookView.as_view()),
    url('update-book/(?P<bookId>.+)', UpdateBookView.as_view()),
    url('delete-book/(?P<bookId>.+)', DeleteBookView.as_view()),
    url('logout/(?P<bookId>.+)', LogoutView.as_view()),
]
