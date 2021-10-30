### Library ManagementSystem

### Features

- Library management system developed using django and react
- django server and react port integration
- Compatible with all browser
- Password saved using 256_SHA encryption at backend
- Hooks used to create react component.
- session added at django and react for easy data access and to keep per site vistor.


### Dependencies

#### React

`react: 17.0.2, axios: 0.24.0, bootstrap: 5.1.3, font-awesome" 4.7.0, react: 17.0.2`

#### Django

`rest_framework, corsheaders, corsheaders.middleware.CorsMiddleware, CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000"
]`

### Django DB setting

    DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'library',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
    

### Recorded screen for reference

Screen recording:

![](https://recordit.co/bF0Oqm14Bu)


----

