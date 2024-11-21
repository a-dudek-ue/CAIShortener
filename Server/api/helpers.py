from django.conf import settings
from .models import MyUser
from django.db.models import Q
from django.contrib.gis.geoip2 import GeoIP2
from .models import Link
import string
import random
import requests

def find_or_create_user_by_ip_and_user_agent(ip: str, user_agent: str):
    user = MyUser.objects.filter(Q(ip_address=ip) & Q(user_agent=user_agent)).first()

    if not user:
        user = MyUser.objects.create(
            ip_address=ip,
            country=get_country(ip),
            user_agent=user_agent
        )
    return user


def generate_random_short_link(length):
    characters = string.ascii_letters + string.digits
    return settings.DOMAIN_NAME+random.choice(string.ascii_letters)+("".join(random.choice(characters) for _ in range(length-1)))

def find_or_create_link(full_link: str,user:MyUser) -> Link:
    link = Link.objects.filter(full_link=full_link).first()
    if link:
        return link
    short_link = generate_random_short_link(int(settings.SHORT_LINK_LENGTH))
    while Link.objects.filter(short_link=short_link).exists():
        short_link = generate_random_short_link()

    return Link.objects.create(full_link=full_link, short_link=short_link,created_by=user)

def find_link(short_link: str) -> Link:
    link = Link.objects.filter(short_link=short_link).first()
    return link

def get_country(ip:str) ->str:
    g = GeoIP2()
    if ip:
        try:
            country = g.country(ip)['name']
        except:
            country = settings.DEFAULT_COUNTRY;
    else:
        country = settings.DEFAULT_COUNTRY
    return country

def is_url_active(url: str) -> bool:
    try:
        url_not_checked_external = ["localhost", "127.0.0.1", "center"]
        if any(keyword in url for keyword in url_not_checked_external):
            return True
        response = requests.head(url, allow_redirects=True, timeout=20)
        return response.status_code // 100 == 2
    except Exception as e:
        return False