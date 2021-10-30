from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, GenericAPIView, UpdateAPIView
from rest_framework.views import APIView

from .models import Admin, Book
from .serializers import AdminLoginSerializer, AdminSignUpSerializer, AddNewBookSerializer, UpdateBookSerializer
from passlib.hash import pbkdf2_sha256


class AdminSignUpView(CreateAPIView):
    '''
        AdminSignUpView will add an admin data/info if valid, into admin table.
    '''
    serializer_class = AdminSignUpSerializer

    def post(self, request):
        try:
            data = request.data
            serializer = self.get_serializer(data = data)
        
            if serializer.is_valid():
                serializer.save()

                admin_queryset = Admin.objects.get(email=data['email'])
                request.session['loginAdminId'] = admin_queryset.id
                request.session['loginAdminName'] = admin_queryset.name
                request.session['loginAdminEmail'] = admin_queryset.email
                response_data = {
                    'id': admin_queryset.id,
                    'name': admin_queryset.name,
                    'email': admin_queryset.email,
                    'password': admin_queryset.password
                }
                return Response({'message': 'success', 'data': response_data }, status=status.HTTP_200_OK)
            return Response({'message': 'Incorrect data', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': f'{e}', 'data': {}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminLoginView(GenericAPIView):
    '''
        AdminLoginView will verify, if login email is present in Admin table, 
        If found then check the password.

        In order to verify the encrypted password with plain password
        pbkdf2_sha256.verify("Password@123", password)
    '''
    serializer_class = AdminLoginSerializer

    def post(self, request):
        try:
            data = request.data
            serializers = self.get_serializer(data=data)

            if serializers.is_valid():
                admin = Admin.objects.filter(email=data['email']).values().first()
                is_password_correct = pbkdf2_sha256.verify(data['password'], admin.get('password', '')) if admin else None

                if not all([admin, is_password_correct]):
                    raise Exception('Email/password not found!')
                name = admin.get('name')
                request.session['loginAdminId'] = admin.get('id')
                request.session['loginAdminName'] = name
                request.session['loginAdminEmail'] = admin.get('email')

                return Response({'message': f'Welcome {name}', 'data': admin, 'session': request.session}, status=status.HTTP_200_OK)
            return Response({'message': 'Expected field not found', 'data': {}, 'session': None}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': 'Server Error', 'data': {}, 'session': None}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddBookView(CreateAPIView):
    '''
        AddBookView will add the book by the login admin into book table.
    '''
    serializer_class = AddNewBookSerializer

    def post(self, request):
        try:
            data = request.data
            serializer = self.get_serializer(data=data)
            loginAdminId = request.session.get('loginAdminId', '')

            if serializer.is_valid() and loginAdminId:
                
                admin_queryset = Admin.objects.get(id=loginAdminId)
                
                if not admin_queryset:
                    raise Exception('Incorrect admin id')

                book = Book(
                    book_name = data['book_name'],
                    book_author_name=data['book_author_name'],
                    book_price=data['book_price'],
                    book_type=data['book_type'],
                    admin = admin_queryset
                )
                book.save()
                
                response_data = {
                    'bookName': book.book_name,
                    'bookAuthorName': book.book_author_name,
                    'bookPrice': book.book_price,
                    'bookType': book.book_type,
                    'AdminId': admin_queryset.id
                }

                return Response({'message': 'success', 'data': response_data}, status=status.HTTP_200_OK)
            return Response({'message': 'Incorrect data', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': f'{e}', 'data': {}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListAllBookView(ListAPIView):
    
    def get(self, request):
        try:
            login_admin = request.session.get('loginAdminId', '')
            
            if login_admin:
                book = Book.objects.filter(admin=login_admin).values(
                    'id', 'book_name', 'book_author_name', 'book_price', 'book_type', 'admin')
                
                return Response({'message': 'success', 'data': book}, status=status.HTTP_200_OK)
            return Response({'message': 'Incorrect data', 'data': []}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': f'{e}', 'data': []}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateBookView(UpdateAPIView):
    '''
        UpdateBookView will update the selected book record if found
    '''
    serializer_class = UpdateBookSerializer

    def put(self, request, *args, **kwargs):
        try:
            book_id = self.kwargs['bookId']
            data = request.data.get('data', None)
            
            if all([book_id, data]):
                book_queryset = Book.objects.get(id=book_id)
            
                # Below variable will hold updated data, if any one of field has been updated else it will be the existing.
                book_name = data['book_name'] if data['book_name'] else book_queryset.book_name
                book_author_name = data['book_author_name'] if data['book_author_name'] else book_queryset.book_author_name
                book_price = data['book_price'] if data['book_price'] else book_queryset.book_price
                book_type = data['book_type'] if data['book_type'] else book_queryset.book_type

                book = Book.objects.filter(id=book_id).update(
                    book_name=book_name, 
                    book_author_name=book_author_name, 
                    book_price=book_price, 
                    book_type=book_type
                    )
                
                if not book:
                    raise Exception('updation failed for book')
                
                return Response({'message': 'successfully updated'}, status=status.HTTP_200_OK)
            return Response({'message': 'Incorrect data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': f'{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteBookView(DestroyAPIView):
    '''
        DeleteBookView will delete the selected book
    '''
    def delete(self, request, *args, **kwargs):
        try:
            book_id = self.kwargs['bookId']
            book = Book.objects.filter(id=book_id).first()
            
            if all([book_id, book]):
                book.delete()
                return Response({'message': 'Book deleted successfully'}, status=status.HTTP_200_OK)
            return Response({'message': 'Incorrect data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': f'{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogoutView(APIView):
    '''
        LogoutView will remove data from session
    '''
    def get(self, request):
        request.session = None
        return Response({'message': 'logout successfully'}, status=status.HTTP_200_OK)
