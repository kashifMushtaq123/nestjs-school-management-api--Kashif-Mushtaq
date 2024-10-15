import requests

BASE_URL = 'http://localhost:3000/schools'  

def create_school(school_data):
    try:
        response = requests.post(BASE_URL, json=school_data)
        response.raise_for_status()
        print("School created:", response.json())
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
    except Exception as e:
        print(f"An error occurred: {e}")

def update_school(school_id, school_data):
    try:
        response = requests.put(f'{BASE_URL}/{school_id}', json=school_data)
        response.raise_for_status()
        print("School updated:", response.json())
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
    except Exception as e:
        print(f"An error occurred: {e}")

def get_school_by_id(school_id):
    try:
        response = requests.get(f'{BASE_URL}/{school_id}')
        response.raise_for_status()
        print("School details:", response.json())
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
    except Exception as e:
        print(f"An error occurred: {e}")

def get_all_schools():
    try:
        response = requests.get(BASE_URL)
        response.raise_for_status()
        print("List of all schools:", response.json())
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
    except Exception as e:
        print(f"An error occurred: {e}")

def delete_school(school_id):
    try:
        response = requests.delete(f'{BASE_URL}/{school_id}')
        response.raise_for_status()
        print("School deleted:", response.json())
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    
    school_data = {
        "name": "School-A",
        "status": "old",
        "startTime": "8:30am",
        "endTime": "1:30pm",
        "shift": "Morning",
        "address": {
            "town": "Nehar Kot",
            "tehsil": "Barkhan",
            "district": "Barkhan",
            "state": "Balochistan",
            "address": "address-1",
            "latitude": 29.79,
            "longitude": 69.47
        },
        "hasProjector": False,
        "hasLaptop": False,
        "organization": {
            "name": "publicschools"
        }
    }

    
    create_school(school_data)

    
    school_data_update = {
        "status": "new",
        "startTime": "9:00am",
        "endTime": "2:00pm",
        "shift": "Afternoon",
        "hasProjector": True,
        "hasLaptop": True,
        "address": {
            "town": "Nehar Kot",
            "tehsil": "Barkhan",
            "district": "Barkhan",
            "state": "Balochistan",
            "address": "updated-address",
            "latitude": 29.80,
            "longitude": 69.48
        },
        "organization": {
            "name": "newpublicschools"
        }
    }
    update_school(1, school_data_update)  

    
    get_school_by_id(1)  

    get_all_schools()

    delete_school(1)
