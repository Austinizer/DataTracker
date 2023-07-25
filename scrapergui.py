import json
import tkinter as tk
from tkinter import messagebox

# Specify the file path
file_path = 'data.json'

# Function to find player data by a given player name or ID
def find_player_data(input_string):
    steamids = json_data.get('Steamid', [])
    for user_data in steamids:
        for steamid, user_info in user_data.items():
            if input_string.isdigit():
                if steamid == input_string:
                    return {
                        'User ID': steamid,
                        'Name': user_info.get('Name'),
                        'Playtime': round(user_info.get('Playtime', 0) / 3600, 1),
                        'Points': user_info.get('Points', 'N/A'),
                        'Lives': user_info.get('Lives', 'N/A'),
                        'Weight': user_info.get('Weight', 'N/A')
                    }
            else:
                if user_info.get('Name') == input_string:
                    return {
                        'User ID': steamid,
                        'Name': input_string,
                        'Playtime': round(user_info.get('Playtime', 0) / 3600, 1),
                        'Points': user_info.get('Points', 'N/A'),
                        'Lives': user_info.get('Lives', 'N/A'),
                        'Weight': user_info.get('Weight', 'N/A')
                    }
    return None

# Function to handle the search button click
def search_button_clicked():
    input_string = username_entry.get()
    if not input_string:
        messagebox.showinfo("Error", "Please enter a username or ID.")
        return

    player_data = find_player_data(input_string)
    if player_data:
        output_text.delete(1.0, tk.END)
        for key, value in player_data.items():
            output_text.insert(tk.END, f"{key}: {value}\n")
    else:
        output_text.delete(1.0, tk.END)
        output_text.insert(tk.END, "Player not found.")

# Open and read the JSON data from the file
with open(file_path, 'r') as file:
    json_data = json.load(file)

# Create the GUI
root = tk.Tk()
root.title("Player Data Finder")

# Username entry field
username_entry = tk.Entry(root)
username_entry.pack()

# Search button
search_button = tk.Button(root, text="Search", command=search_button_clicked)
search_button.pack()

# Output field
output_text = tk.Text(root, height=10, width=50)
output_text.pack()

# Run the GUI main loop
root.mainloop()
