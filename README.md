# netGuardian

![WhatsApp Image 2024-03-02 at 18 56 39_692a7a8f](https://github.com/KshirjaSahay/netGuardian/assets/145379472/f86fa106-067c-43cf-9dd4-a2e51f820728)


## Description

The netGuardian website provides a user-friendly interface for analyzing configuration files and identifying potential errors. Here's an overview of how it works:

1. **Navigation:** Begin by visiting the landing page, where you'll find intuitive navigation options to proceed to the file input page.

2. **File Input:** Once on the file input page, you have two convenient options for uploading your configuration file. You can either drag and drop the file into the designated area or use the file browser to select it manually.

3. **Processing:** After selecting your file, the netGuardian system seamlessly handles the processing. The file is transmitted to the server, where it undergoes comprehensive analysis to detect any errors.

4. **Error Reporting:** Once the analysis is complete, any errors found within the configuration file are presented to you in a clear and organized report format directly on the frontend of the website. This report highlights the type and severity of each error detected, enabling you to address them effectively.


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

## Contribution
While this project is not actively seeking contributions, we welcome clear ideas and concise methods for possible improvements.
