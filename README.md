# DeliverUS - Project Requirements

## Introduction
DeliverUS is a made-up company whose business is focused on delivering food from 3rd parties (restaurants) to customers. To this end, we are requested to develop the needed software products which hopefully will boost the company. After interviewing the product owners and some stakeholders, the general objectives and requirements have been agreed, as described in this document.

Check https://github.com/IISSI2-IS/DeliverUS-Backend for full DeliverUS app requirements.

# Frontend deployment steps:
1. Accept the assignment of your github classroom if you have not done it before. Once you accepted it, you will have your own copy of this project template.
2. Clone your private repository at your local development environment by opening VScode and clone it by opening Command Palette (Ctrl+Shift+P or F1) and `Git clone` this repository, or using the terminal and running
```PowerShell
git clone <url>
```
It may be necessary to setup your github username by running the following commands on your terminal:
```PowerShell
git config --global user.name "FIRST_NAME LAST_NAME"
git config --global user.email "MY_NAME@example.com"
```
In case you are asked if you trust the author, please select yes.

3. Setup your environment file. As explained in labs, it is needed to create a copy of the `.env.example` file, name it `.env` and include your environment variables values, specially your API_BASE_URL (usually http://localhost:3000).

4. Install dependencies. Run `npm install` to download and install packages to the current project folder.

5. Check and run DeliverUS backend app as detailed in:
https://github.com/IISSI2-IS/DeliverUS-Backend#backend-deployment-steps

6. Run this project (Frontend for owners) by running `npm start`.

7. Metro bundler development tools should automatically open on your browser (usually at http://localhost:19002/). Once you are presented with the Metro Bundler development tools web interface, click on 'Run in web browser' or click on 'Run on Android device/emulator' or 'Run on iOS simulator' to open your web/android/ios version of the app respectively.
   * Alternatively, you can use the Expo app on your device to open this project app on your real device by scanning the QR code rendered at the bottom left of the metro bundler development tools web interface.
