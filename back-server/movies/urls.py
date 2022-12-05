from django.urls import path
from . import views, views_tmdb

app_name = 'movies'

urlpatterns = [
    path('movies/', views.movie_list, name='movie_list'),
    path('movies/<int:movie_pk>/', views.movie_detail, name='movie_detail'),
    path('movies/<int:movie_pk>/like/', views.movie_like, name="movie_like"),
    path('movies/<int:user_pk>/likeinfo/', views.user_like, name="user_like"),
    path('movies/<int:movie_pk>/like/<int:user_id>', views.like_movie_users, name="like_movie_users"),
    path('comment_list/', views.comment_list, name="comment_list"),
    path('movies/comment/<int:comment_pk>', views.comment_detail, name="comment_detail"),
    path('movies/<int:movie_pk>/comment/', views.comment_create, name="comment_create"),
    path('movies/genres_list/', views.genres_list, name="genres_list"),
    
    # path('movies/wishlist/', views.wish_list, name="wish_list"),
    path('recommended/', views.recommended, name='recommended'),
    path('tmdb/', views_tmdb.tmdb_data),
]
