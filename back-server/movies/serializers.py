from rest_framework import serializers
from .models import Movie, Actor, Genre, Comment
# , WishList


class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('movie', 'user',)

class ActorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Actor
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Movie
        fields = '__all__'
        read_only_fields = ('like_users',)

# class WishListSerializer(serializers.ModelSerializer):
#     like_count = serializers.IntegerField(source='like_user_set.count', read_only=True)

#     class Meta:
#         model = WishList
#         fields = '__all__'