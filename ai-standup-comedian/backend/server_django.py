# Django backend skeleton for AI Stand-up Comedian
# Typical usage:
#   django-admin startproject comedian_project
#   cd comedian_project
#   python manage.py startapp api
#
# Then add views in api/views.py like below and wire urls in urls.py.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def generate_script(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        topic = data.get("topic", "life")
        style = data.get("style", "friendly")
        length = data.get("length", "short")
        return JsonResponse({
            "script": f"Placeholder: stand-up script about {topic} in {style} style ({length})."
        })

@csrf_exempt
def tts(request):
    if request.method == "POST":
        return JsonResponse({"audioUrl": None, "note": "Integrate TTS provider here."})

@csrf_exempt
def video(request):
    if request.method == "POST":
        return JsonResponse({"videoUrl": None, "note": "Integrate avatar/video provider here."})
