from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from .serializers import UserSerializer

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile(request, username):
    # print(request.data)
    user = get_object_or_404(get_user_model(), pk=request.data.get('user_pk'))
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def my_profile(request):

    user = get_object_or_404(get_user_model(), pk=request.data.get('user_id'))
    serializer = UserSerializer(user)

    return Response(serializer.data)