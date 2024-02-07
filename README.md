## General Information

This is SwiftPWA base project bootstrapped with [Next.js 14](https://nextjs.org/).

Demo: [https://pwa.getswift.asia/](https://pwa.getswift.asia/)

Latest Stable Version branch: `master` (for more version, please check tags)

Launching Checklist:
- [Full PWA mode Checklist](https://teamwork.icubeonline.com/#/projects/120618/notebooks/354196) 
- [Checkout Only / PWA Checkout mode Checklist](https://teamwork.icubeonline.com/#/projects/120618/notebooks/362538) 

## Requirements
- NodeJS v18 or higher
- Yarn
- Each Swift PWA version depends on certain SWIFT Magento version. Please see the [release notes](https://github.com/icubeus/swift-pwa/releases) for the dependency.

## Pre-Installation
### Configurations
1. Open file [swift.config.js](swift.config.js)
2. Edit the host of each environment at these lines:
```
const HOST = {
    local: 'http://localhost:3000'
    dev: '[dev url]',
    stage: '[stage url]',
    prod: '[prod url]',
};
```
3. Edit GraphQl endpoint of each environment at these lines:
```
const graphqlEndpoint = {
    local: '[gql endpoint for local]'
    dev: '[gql endpoint for dev]',
    stage: '[gql endpoint for stage]',
    prod: '[gql endpoint for prod]',
};
```
4. Setup environment variables in `.env`. See [Environment Variables](##environment-variables) section for more details.
5. Run / Restart the PWA <br />

## Installation
You can run the PWA manually run the command or using pm2.
### Manually run the command
#### Dev mode
1. Build static assets (do once only for the first time)
```
yarn assets:build
```
2. Run:
```
yarn dev
``` 
3. Open [http://localhost:3000](http://localhost:3000) (depends the setting of your swift.config.js > HOST) on browser to see the frontend.

#### Prod mode
1. Build the static assets and the project
```
yarn build
```
2. Run it (sample for local environment):
```
yarn start
```
3. Open [http://localhost:3000](http://localhost:3000) (depends the setting of your swift.config.js > HOST) on browser to see the frontend.

### Using [PM2](https://pm2.keymetrics.io/)
PM2 is usually used in dev site environment.
The steps are same with the previous one. The only different is on the step number 2. Wrap the command in step number 2 with pm2 command, example:
```
pm2 start yarn --name "[project-name]" --interpreter bash -- start
```

# Rules of the Game 🚨
**For project team**, do not ever touch files under under [core](core) folder!
Instead, please create `src` folder in the root (if not exists) then put all custom (including overriden files) in this `src` folder.
The path and file names in `src` will automatically override the same path & file names in `core` folder. Thanks for [jsconfig.json](https://github.com/icubebysirclo/swift-pwa/blob/develop_tailwind/jsconfig.json)
Otherwise, you could have problems when the time you upgrade the version / get latest from Swift PWA default repo.

# Patches
### How to apply patch file for swift pwa project

1. copy file .patch to folder `./patches`
2. edit file `patch.sh`
3. add list file patch beetweek delimiter text `"Start of line patch"` and `"END of line patch"`
4. example code patch.sh after edit like here
```
...
######################### START of line patch ############################
patch -p1 --forward < patches/fix_loadmore_plp.patch || true
######################### END of line patch ##############################

```

# Environment Variables
Environment varibales are variables that defined in the server side. The typical information of variable environment is only for sensitive informations which will no editable by the user admin, such as Magento integration key, encription key, etc. Other than that, configurations are stored in swift.config.js or Magento Backoffice.

**For local or dev site**, you can create `.env` file by duplicating `.env.example` file. This file contains the the default environment variables that are used by Swift PWA.

**For staging and production**, it requires infra's help. Please reach out the infra team to set the variables for each staging and production. Note: the values could be different between staging and production, such as the ACCESS_KEY.

Default environment variables in `.env.example`:
```
APP_ENV=local
NODE_ENV=development
ACCESS_KEY="YOUR_ACCESS_KEY"
ENCRYPTION_KEY=TXAjwm8k53PJG9NacLbyZavvQB2qBh43
ALGORITHM=aes-256-cbc
FCM_KEY_SERVER=
FCM_TOPIC=notificationspwa
SESSION_SECRET=asdasdd1212ads12!!!@**DADxx1
NEXT_PUBLIC_ENCRYPTION_KEY=TXAjwm8k53PJG9NacLbyZavvQB2qBh43
NEXT_PUBLIC_ALGORITHM=aes-256-cbc
```

Explanations:
1. APP_ENV = environtment where you run this PWA. Available values: `local`, `dev`, `stage` or `prod`.
2. NODE_ENV = Default Nextjs variable environment for running mode. Available values: `development` or `production`. development mode should be used in local for development purpose.
3. ACCESS_KEY = This is a key that is generated by Magento (Backoffice > Systems > Integration). This key is mandatory for PWA to get store configurations from Magento via graphql. GQL query storeConfig requires this key for security purpose. The generated key could be different between Magento dev, staging, and production.
4. ENCRYPTION_KEY = Encryption key to encrypt sensitive data (required)
5. ALGORITHM = Encryption algorithm (required)
6. FCM_KEY_SERVER = Firebase server key (optional)
7. FCM_TOPIC = Firebase topic (optional)
8. SESSION_SECRET = Session secret (required)
9. NEXT_PUBLIC_ENCRYPTION_KEY = Encryption key to encrypt sensitive data (required) -> This is for client side usage, consider make this different from the server side one (`ENCRYPTION_KEY`)
10. NEXT_PUBLIC_ALGORITHM = Encryption algorithm (required) -> This is for client side usage, consider make this different from the server side one (`ALGORITHM`)

# Crontab
In production, this job needs to be set to run sitemap regeneration every midnight.
Replace [pwa base url] with your real PWA base url
```
0 0 * * * curl '[pwa base url]/sitemap.xml'
```

# Highlight Releases
## Version 3.0.0
1. Upgrade to NextJs14
2. Replace Material UI(MUI) with Tailwind
3. Revamp template

## Version 2.6.3
### Support new deployment approach
In the new deployment approach, the project/custom files will be put into different repo.
Use this repo as template for project repo: https://github.com/icube-mage/swift-pwa-demo

## Version 2.6.2
### Store Configuration Setup
To optimize memory usage in swift PWA, store config will be cached in PWA server side by storing it in a JSON file (config.json). This file will only be generated when the PWA request the storeConfig query to Magento GQL. 
There are 2 ways to trigger this process (generating   config.json):
#### 1: Delete file under folder generated/* (Will be usefull for local environment & Production >1 pod) *Version 2.6.6
1. Run the project
2. You need to run CLI from rundeck to delete all the config files in each pod `rm -rf generated/*`
3. Access PWA page
#### 2: From Magento Backoffice (Support 1 pod)
1. Go to Backoffice > Systems > Cache Management
2. Click "Refresh PWA Configuration" button. 

## Version 2.6.0
### Support Multiseller feature
This feature allow customer to split their checkout into several orders by the seller. The items in cart will be grouped by same seller.

## Version 2.5.0
### Moving configurations from swift.config.js to Magento Backoffice
Many Configurations are moved from swift.config.js into Magento Backoffice. Click [here](https://docs.google.com/document/d/1DaZhkHjANgPfISH8eHS7T2njNCQhty1uORHTZ9fYIDk) for more details.

[View More >>](https://github.com/icubeus/swift-pwa/releases)
