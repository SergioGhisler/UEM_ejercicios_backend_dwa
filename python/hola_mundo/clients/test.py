import requests

endpoint = 'http://localhost:8000/api_view/users/create'
response = requests.get(endpoint)

print(response.json())