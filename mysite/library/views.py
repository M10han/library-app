from django.http import JsonResponse
import json
import os


# Create your views here.

def index(request):
    THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
    my_file = open(os.path.join(THIS_FOLDER, 'libraryData.json'))
    data = json.load(my_file)

    return JsonResponse(data, json_dumps_params={'indent': 2}, safe=False)
