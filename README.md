# netGuardian


## Description

The netGuardian website provides a user-friendly interface for analyzing configuration files and identifying potential warnings. Here's an overview of how it works:

1. **Navigation:** Begin by visiting the landing page, where you'll find intuitive navigation options to proceed to the file input page.

2. **File Input:** Once on the file input page, you have two convenient options for uploading your folder containing the configuration files. You can either drag and drop the folder into the designated area or use the file browser to select it manually.

3. **Processing:** After selecting your folder, the netGuardian system seamlessly handles the processing. The folder is transmitted to the server, where it undergoes comprehensive analysis to detect any warnings.

4. **Error Reporting:** Once the analysis is complete, any warnings found within the configuration file are presented to you in a clear and organized report formatted directly on the frontend of the website. This report highlights the type and severity of each warning detected, enabling you to address them effectively.


## Installation

To use this project, follow these steps:

1. Fork this repository from GitHub.
2. Clone the forked repository to your local machine using the `git clone` command followed by the repository URL.
3. Open the netGuardian folder in your preferred code editor.

## Usage

1. Open one terminal tab in the editor, navigate to the 'client' folder (cd client), and run npm i to install dependencies.
     ```bash
     cd client
     npm i
2. In another terminal tab, navigate to the 'server' folder (cd server) and run npm i to install dependencies.
     ```bash
     cd server
     npm i
3. If you are on **Windows**, find `python3` in the file 'server.js' in the server folder and replace it with `python`, then save the changes. If on macOS, no change is needed.
4. To start the server, run the command 'node server.js' in the terminal.
    ```bash
    node server.js
5. Run the command 'npm run dev' in the client directory in a separate terminal tab.
   ```bash
   npm run dev
6. Open your browser and go to "**localhost:3000**" to view the project.

## Docker
1. Pull the images from docker hub.
   ````
   docker pull akshayyyyy/netguardian-client akshayyyyy/netguardian-server
2. Download the docker-compose.yml file.
   ````
   curl -o docker-compose.yml https://raw.githubusercontent.com/akshayO3/netGuardian/main/docker-compose.yml
3. Create a .env file.
    **Ensure the docker images are present in the same directory.**
   ````
   mkdir .env
   sudo vi .env
   
4. Enter your mongodb database URI inside the ``.env`` file and ``:x`` to save and quit.
5. Run the following command to create a container:
   ````
   docker-compose up

## Contribution
While this project is not actively seeking contributions, we welcome clear ideas and concise methods for possible improvements.
