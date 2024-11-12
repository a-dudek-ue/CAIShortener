from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Link, Click, MyUser
from .serializers import LinkSerializer, ClickSerializer
from .helpers import find_or_create_user_by_ip_and_user_agent,find_or_create_link,get_country,is_url_active,find_link

S = 'ip'

SHORT_LINK = 'short_link'
USER_AGENT = 'user_agent'
IP = 'ip'
FULL_LINK = "full_link"


# from rest_framework_simplejwt.authentication import JWTAuthentication

class CreateLinkView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        full_link = data[FULL_LINK]
        ip=data[IP]
        user_agent=data[USER_AGENT]
        if not is_url_active(full_link):
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        country = get_country(ip)
        user = find_or_create_user_by_ip_and_user_agent(ip, user_agent)
        link =find_or_create_link(full_link,user)
        serializer = LinkSerializer(link)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ClickLinkView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data
        short_link = data.get(SHORT_LINK)
        link = find_link(short_link)
        if(link):
            ip = data[IP]
            user_agent = data[USER_AGENT]
            click = Click.objects.create(link=link, user=find_or_create_user_by_ip_and_user_agent(ip, user_agent))
            serializer = LinkSerializer(link)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

class LinksByCreatorView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        links = Link.objects.filter(created_by=user_id)
        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LinksByCountryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, country):
        clicks = Click.objects.filter(user__country=country).values('link').distinct()
        link_ids = [click['link'] for click in clicks]
        links = Link.objects.filter(id__in=link_ids)
        serializer = LinkSerializer(links, many=True)
        # return Response({"ip":ip}, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LinksByUserAgentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_agent):
        clicks = Click.objects.filter(user__user_agent=user_agent).values('link').distinct()
        link_ids = [click['link'] for click in clicks]
        links = Link.objects.filter(id__in=link_ids)
        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
