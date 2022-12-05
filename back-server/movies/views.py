from django.shortcuts import render, redirect
from django.views.decorators.http import require_safe, require_POST
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Movie, Comment

from .models import Movie, Genre
from django.http import JsonResponse
from .serializers import MovieListSerializer, ActorSerializer, GenreSerializer, MovieSerializer, CommentSerializer
# , WishListSerializer
from django.shortcuts import get_list_or_404, get_object_or_404

# Create your views here.
@api_view(['GET','POST'])
@require_safe
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieListSerializer(movies, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'DELETE', 'PUT'])
def movie_detail(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)

    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

# @require_POST
# def like(request, movie_pk):
#     if request.user.is_authenticated:
#         movie = Movie.objects.get(pk=movie_pk)
#         genres = movie.genres.all()
#         for g in genres:
#             genre = Genre.objects.get(pk=g.pk)
#             genre.like_users.add(request.user)

#         if movie.like_users.filter(pk=request.user.pk).exists():
#             movie.like_users.remove(request.user)
#             is_liked = False

#         else:
#             movie.like_users.add(request.user)
#             is_liked = True
#         context = {
#             'is_liked':is_liked,
#             'movie_like_count': movie.like_users.count(),
#         }
#         return JsonResponse(context)
#     return redirect('accounts:login')
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def movie_like(request, movie_pk):
    
    if request.method == 'POST':
        movie = get_object_or_404(Movie, pk=movie_pk)
        if movie.like_users.filter(pk=request.user.pk).exists():
            movie.like_users.remove(request.user)
        else :
            movie.like_users.add(request.user)
        return Response(request.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_like(request, user_pk):
    if request.method == 'GET':
        user = get_object_or_404(get_user_model(),pk=user_pk)
        likemovies = user.like_movies.values()
        likemoviesdata = []
        for i in range(len(likemovies)):
            id = likemovies[i]['id']
            movie = Movie.objects.values().filter(pk=id)
            genres = Genre.objects.values().filter(movie=id)
            likemovies[i]['genres'] = genres
            likemoviesdata.append(likemovies[i])
        return Response(likemoviesdata)
    return Response(status=status.HTTP_400_BAD_REQUEST)
#   me = get_object_or_404(get_user_model(), pk=movie_pk)
#   data = []
#   movies = request.data
#   for movie_pk in movies:
#     movie = get_object_or_404(Movie, pk=movie_pk)
#     serializer = MovieSerializer(movie)
#     data.append(serializer.data)
  
#   return Response(data)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_movie_users(request,movie_pk, user_id):
  # print(request.data)
    users = []
    movies = request.data.get('movies')
    # print(movies)
    for movie in movies:
        movie = get_object_or_404(Movie, pk=movie)
        serializer = MovieSerializer(movie)
        # print(serializer.data)
        for user in serializer.data.get('like_users'):
            if user not in users:
                users.append(user)
    return Response(users)
    
  

@require_safe
def recommended(request):
    movies = request.user.like_movies.all()
    mlst = Movie.objects.all()

    dic = {}
    for movie in movies:
        genres = movie.genres.all()
        for gen in genres:
            dic[gen.pk] = dic.get(gen.pk, 0) + 1
    dic = sorted(dic.items(), key=lambda x:-x[1])
    for genre_num, likes in dic:
        genre = Genre.objects.get(pk=genre_num)
        # print(genre.name)
#        
    print('장르')
    for i in mlst:
        print(i.genres.all())
#

    context={
        'dic':dic
    }
    return render(request, 'movies/recommended.html',context)

@api_view(['GET'])
def comment_list(request):
    # movie = get_object_or_404(Movie, pk=movie_pk)
    if request.method == 'GET':
        comments = get_list_or_404(Comment)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

@api_view(['POST'])
def comment_create(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

@api_view(['GET'])
def genres_list(request):
    if request.method == 'GET':
        genres = get_list_or_404(Genre)
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)


# @api_view(['GET'])
# def wish_list(request):
#     if request.method == 'GET':
#         wishlist = get_list_or_404(Movie)
#         serializer = WishListSerializer(wishlist, many=True)
#         return Response(serializer.data)